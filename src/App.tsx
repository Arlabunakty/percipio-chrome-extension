import React, { useEffect, useState } from "react";
import "./App.css";
import logger from "./logging";
import OpfParser from "./percipio/OpfParser";

export const App = () => {
  const [tabId, setTabId] = useState<number | undefined>(undefined);
  const [url, setUrl] = useState<string>("");
  const [book, setBook] = useState<string>("");
  const [downloadItems, setDownloadItems] = useState<Map<string, any>>(
    new Map()
  );

  function loadBook(message: any) {
    fetch(message.url)
      .then(async (data) => {
        const body = await data.text();
        logger.devVerbose(body);
        const links = OpfParser.parse(body);
        logger.devVerbose(links);
        setBook(body);
      })
      .catch(logger.alertRuntimeException);
  }

  function listener(
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void
  ) {
    logger.devVerbose("Trace runtime.onMessage");
    logger.devVerbose("runtime.onMessage =", message);
    logger.devVerbose("Sender =" + sender);

    loadBook(message.message);

    sendResponse(true);

    return true;
  }

  function listenDownloadItems(downloadItem: chrome.downloads.DownloadDelta) {
    const key = `${downloadItem.id}`;
    const item = downloadItems.get(key);
    if (!item) return;

    if (downloadItem.state?.current) {
      const new1 =new Map(
        downloadItems.set(key, {
          ...item,
          status: downloadItem.state?.current,
        })
      );
      setDownloadItems(new1);
    }
  }

  useEffect(() => {
    chrome.storage.local.get(["url", "tabId"]).then((data) => {
      logger.devVerbose(data);

      const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        logger.devDebug(tabs);
        if (tabs.length === 0) return;
        if (tabs[0].id !== data.tabId) return;
        data.url && loadBook(data);
        data.url && setUrl(data.url);
        data.tabId && setTabId(data.tabId);
      });
    });

    chrome.downloads.onChanged.addListener(listenDownloadItems);
    // chrome.runtime.onMessage.addListener(listener);
    return () => {
      // chrome.runtime.onMessage.removeListener(listener);
      chrome.downloads.onChanged.removeListener(listenDownloadItems);
    };
  }, []);

  function downloadFile(urlString: string) {
    logger.devVerbose(`downoading file: ${urlString}`);
    const url1 = new URL(urlString);
    const filename = url1.pathname.substring(
      url1.pathname.lastIndexOf("/"),
      url1.pathname.length
    );
    const options: chrome.downloads.DownloadOptions = {
      saveAs: false,
      url: urlString,
      filename: `book/${filename}`,
      conflictAction: "overwrite",
    };
    chrome.downloads.download(options, (id: number): void => {
      const key = `${id}`;
      setDownloadItems(
        new Map(downloadItems.set(key, { name: filename, status: "created" }))
      );
    });
  }

  const downloadBook = () => {
    downloadFile(url);
    const path = url.substring(0, url.lastIndexOf("/"));
    const links = OpfParser.parse(book);
    for (const link of links) {
      downloadFile(path + "/" + link);
    }
  };

  return (
    <div>
      <header>
        <p>URL:</p>
        <p>{url}</p>
        <button onClick={downloadBook}>DOWNLOAD BOOK</button>
      </header>
      <p>Found book:</p>
      {Array.from(downloadItems.keys())
        .map((key) => downloadItems.get(key))
        .map((downloadItem) => (
          <p>
            {downloadItem.name} - {downloadItem.status}
          </p>
        ))}
    </div>
  );
};

export default App;
