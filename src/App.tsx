import React, { useState } from "react";
import "./App.css";
import logger from "./logging";
import useStorage from "./chrome/useStorage";
import useDownloadItems from "./chrome/useDownloadItems";
import downloadBook from "./percipio/downloadBook";
import downloadAudioOrCourse from "./percipio/downloadAudioOrCourse";

export const App = () => {
  const [candidate, setCandidate] = useState<string>("");
  const { url: url} = useStorage(loadCandidate);

  const [downloadItems, setDownloadItems] = useDownloadItems();

  function loadCandidate(message: any) {
    const requestInit: RequestInit = {};
    if (message.body) {
      requestInit.method = message.method;
      requestInit.body = message.body;
    }
    const headers =
      message.url.indexOf(".opf") < 0 && message.headers ? message.headers : [];
    if (headers.length !== 0) {
      requestInit.headers = headers;
    }
    fetch(message.url, requestInit)
      .then(async (response) => {
        const candidateMeta = await response.text();
        setCandidate(candidateMeta);
        setDownloadItems(new Map());
      })
      .catch(logger.alertRuntimeException);
  }

  const downloadCandidate = () => {
    function callback(key: string, filename: string) {
      setDownloadItems(
        new Map(downloadItems.set(key, { name: filename, status: "created" }))
      );
    }

    try {
      downloadAudioOrCourse(candidate, callback);
    } catch (e) {
      downloadBook(url, candidate, callback);
    }
  };

  const array = Array.from(downloadItems.keys());
  return (
    <div>
      <header>
        <p>URL:</p>
        <p>{url}</p>
        <button onClick={downloadCandidate}>DOWNLOAD</button>
      </header>
      {array.length !== 0 && <p>Downloads:</p>}
      {array
        .map((key) => downloadItems.get(key))
        .map((downloadItem) => (
          <p>
            {downloadItem.name} - {downloadItem.status}
          </p>
        ))}
      {candidate && (
        <span>
          <p>Book:</p>
          <p>{candidate}</p>
        </span>
      )}
    </div>
  );
};

export default App;
