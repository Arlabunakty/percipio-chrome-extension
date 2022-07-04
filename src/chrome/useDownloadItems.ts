import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default (): [Map<string, any>, Dispatch<SetStateAction<Map<string, any>>>] => {
  const [downloadItems, setDownloadItems] = useState<Map<string, any>>(
    new Map()
  );

  function listenDownloadItems(downloadItem: chrome.downloads.DownloadDelta) {
    const key = `${downloadItem.id}`;
    const item = downloadItems.get(key);
    if (!item) return;

    if (downloadItem.state?.current) {
      const new1 = new Map(
        downloadItems.set(key, {
          ...item,
          status: downloadItem.state?.current,
        })
      );
      setDownloadItems(new1);
    }
  }

  useEffect(() => {
    chrome.downloads.onChanged.addListener(listenDownloadItems);
    return () => chrome.downloads.onChanged.removeListener(listenDownloadItems);
  });

  return [downloadItems, setDownloadItems];
}
