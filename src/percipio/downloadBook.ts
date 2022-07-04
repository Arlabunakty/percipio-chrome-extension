import downloader from "./Downloader";
import OpfParser from "./OpfParser";

export default function downloadBook(
  url: string,
  candidate: string,
  callback: (key: string, filename: string) => void
) {
  const subFolderName = Math.floor(Date.now() / 1000) + "";

  // https://cdn2.percipio.com/1656699686.510b9633fad55ab98f45b0364538b93554ac9929/eod/books/156152/OEBPS/package.opf
  const path = url.substring(0, url.lastIndexOf("/"));
  const contentFolder = path.substring(path.lastIndexOf("/") + 1, path.length);
  const result = OpfParser.parse(candidate);
  for (const link of result.links) {
    downloader.downloadFile(path, callback, link, contentFolder, subFolderName);
  }
  if (result.links.length !== 0) {
    downloader.downloadFile(
      path,
      callback,
      "../META-INF/container.xml",
      contentFolder,
      subFolderName
    );
    downloader.downloadFile(
      path,
      callback,
      "../mimetype",
      contentFolder,
      subFolderName
    );

    downloader.downloadFile(
      path,
      callback,
      `package.opf`,
      contentFolder,
      subFolderName
    );
  }
}
