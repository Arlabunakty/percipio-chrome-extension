import downloader from "./Downloader";

function replacer(key: string, value: any) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

test("serializing map", () => {
  var mappings: Map<string, string> = new Map<string, string>();
  mappings.set("key", "value");

  expect(JSON.stringify(Object.fromEntries(mappings))).toEqual("{\"key\":\"value\"}");
  expect(mappings.get("key")).toEqual("value");
});
