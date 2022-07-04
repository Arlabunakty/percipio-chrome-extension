import downloader from "./Downloader";
import JsonParser from "./JsonParser";

export default function downloadAudioOrCourse(candidate: string,
    callback: (key: string, filename: string) => void) {
        const subFolderName = Math.floor(Date.now() / 1000) + "";
        const links = JsonParser.parse(candidate);
      downloader.download(links, subFolderName, callback);
      downloader.downloadText(
        candidate,
        callback,
        "___metadata.json",
        undefined,
        undefined,
        subFolderName
      );
}