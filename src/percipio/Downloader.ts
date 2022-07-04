import { randomUUID } from "crypto";
import logger from "./../logging";
import { v4 as uuidv4 } from 'uuid';

function downloadFile(
  urlString: string,
  callback: (key: string, filename: string) => void,
  link?: string,
  contentFolder?: string,
  subFolderName?: string,
  filename?: string
) {
  logger.devVerbose(
    `downoading file: '${urlString}'; link = '${link}'; contentFolder = '${contentFolder}'`
  );
  urlString = urlString + (link ? "/" + link : "");
  const finalFilename = filename || extractFilename(urlString);
  const relativeLink = link?.startsWith("../")
    ? link.substring(2, link.length)
    : contentFolder + "/" + link;

  const fileNameRelativeToDownloadFolder =
    "books/" +
    subFolderName +
    "/" +
    (link
      ? relativeLink
      : (contentFolder ? contentFolder + "/" : "") + finalFilename);
  const options: chrome.downloads.DownloadOptions = {
    saveAs: false,
    url: urlString,
    filename: fileNameRelativeToDownloadFolder,
    conflictAction: "overwrite",
  };
  logger.devVerbose("fileNameRelativeToDownloadFolder");
  logger.devVerbose(fileNameRelativeToDownloadFolder);
  chrome.downloads.download(options, (id: number): void => {
    const key = `${id}`;
    callback(key, finalFilename);
  });
}

function downloadText(
  text: string,
  callback: (key: string, filename: string) => void,
  filename: string,
  link?: string,
  contentFolder?: string,
  subFolderName?: string
) {
  const blob = new Blob([text], {
    type: "text/plain",
  });
  const urlBlob = URL.createObjectURL(blob);
  downloadFile(urlBlob, callback, link, contentFolder, subFolderName, filename);
}

const toFindDuplicates = (arry: Array<string>) =>
  arry.filter((item, index) => arry.indexOf(item) !== index);

export default {
  download: (
    urls: Array<string>,
    subFolderName: string,
    callback: (key: string, filename: string) => void
  ) => {
    const filenames = urls.map(extractFilename);
    const duplicateElementa = toFindDuplicates(filenames);
    if (duplicateElementa.length === 0) {
      for (const url of urls) {
        downloadFile(url, callback, undefined, undefined, subFolderName);
      }
    } else {
      var mappings: Map<string, string> = new Map<string, string>();
      for (const url of urls) {
        const filename = extractFilename(url);
        if (duplicateElementa.includes(filename)) {
          const uniqueFilename = uuidv4() + "-" + filename;
          mappings.set(url, uniqueFilename);
          downloadFile(
            url,
            callback,
            undefined,
            undefined,
            subFolderName,
            uniqueFilename
          );
        } else {
          downloadFile(url, callback, undefined, undefined, subFolderName);
        }
      }
      downloadText(
        JSON.stringify(Object.fromEntries(mappings)),
        callback,
        "__uniqueFilenameMapping,json",
        undefined,
        undefined,
        subFolderName
      );
    }
  },
  downloadText: downloadText,
  downloadFile: downloadFile,
};
function extractFilename(urlString: string): string {
  const downloadUrl = new URL(urlString);
  return downloadUrl.pathname.substring(
    downloadUrl.pathname.lastIndexOf("/") + 1,
    downloadUrl.pathname.length
  );
}
