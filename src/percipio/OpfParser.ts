import parser from "@rgrove/parse-xml";
import logger from "./../logging"

function visitChildren(children: Array<parser.XmlComment|parser.XmlElement|parser.XmlProcessingInstruction|parser.XmlText|parser.XmlCdata>): string[] {
    const linksArray = new Array<string>();

    for (const child of children) {
        if (child.type === parser.XmlNode.TYPE_ELEMENT) {
            const element = child as parser.XmlElement;
            const href = (element.attributes["href"] || "").trim();
            if (href.length !== 0) {
              linksArray.push(href);
            }
            linksArray.push(...visitChildren(element.children));
          }
    }
    return linksArray;
}

export default {
  parse: (xml: string) => {
    let object = parser(xml);
    
    return visitChildren(object.children);
  },
};
