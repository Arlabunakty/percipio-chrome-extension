import { useState, useEffect } from "react";
import logger from "./../logging";

function merge(message: { [key: string]: any }): { [key: string]: any } {
  const merged: { [key: string]: any } = {};
  logger.devVerbose("message");
  logger.devVerbose(message);
  const url: string = message.onSendHeaders.url;
  const headers = message.onSendHeaders.headers
    ? message.onSendHeaders.headers.map((e: any) => [e.name, e.value])
    : [];
  const body =
    message.onBeforeRequest &&
    message.onBeforeRequest.tabId === message.onSendHeaders.tabId &&
    message.onBeforeRequest.url === message.onSendHeaders.url &&
    message.onBeforeRequest.body
      ? message.onBeforeRequest.body
      : null;
  if (body) {
    merged.method = "POST";
    merged.body = body;
  }
  if (headers.length !== 0) {
    merged.headers = headers;
  }
  merged.url = url;
  logger.devVerbose("merged");
  logger.devVerbose(merged);

  return merged;
}

export default function (callback: (value: { [key: string]: any }) => void) {
  const [data, setData] = useState<object>({});
  const [tabId, setTabId] = useState<number | undefined>(undefined);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    chrome.storage.local
      .get(["onBeforeRequest", "onSendHeaders"])
      .then((recordedData) => {
        const queryInfo = { active: true, lastFocusedWindow: true };
        chrome.tabs &&
          chrome.tabs.query(queryInfo, (tabs) => {
            logger.devDebug(tabs);
            if (tabs.length === 0) return;
            if (tabs[0].id !== recordedData.onSendHeaders.tabId) return;
            recordedData.onSendHeaders.url && setUrl(recordedData.onSendHeaders.url);
            recordedData.onSendHeaders.tabId && setTabId(recordedData.onSendHeaders.tabId);
            const mergedData = merge(recordedData);
            setData(mergedData);
            callback(mergedData);
          });
      });
  }, []);

  return { data: data, tabId: tabId, url: url, useEffect: useEffect };
}
