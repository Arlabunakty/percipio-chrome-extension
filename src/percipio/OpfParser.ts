import parser from "@rgrove/parse-xml";

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
    const object = parser(xml);
    var isbn = "";
    for (const child of (object.children[0] as parser.XmlElement).children) {
      if (child.type === parser.XmlNode.TYPE_ELEMENT) {
        const element = child as parser.XmlElement;
          if (element.name === "metadata") {
            for (const childMetadata of element.children) {
              if (childMetadata.type === parser.XmlNode.TYPE_ELEMENT) {
                const elementMetadata = childMetadata as parser.XmlElement;
                if (elementMetadata.attributes["id"] === 'pub-identifier') {
                  isbn = elementMetadata.text.replaceAll("urn:isbn:ISBN:", "").trim();
                }
              }
            }
          }
      }
    }
    if (isbn.length === 0) {
      throw new Error("Couldn't find ISBN");
    }
    return {
      isbn: isbn,
      links: Array.from(new Set<string>(visitChildren(object.children)))
    };
  },
};
