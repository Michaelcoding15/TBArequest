import { readFileSync, writeFileSync } from "fs";

const file = readFileSync("./dist/index.d.mts").toString();

const lines = file.split("\n");
lines.splice(1, 2);

let text = lines.join("\n");

text = text.replaceAll(
  "arktype_internal_variants_array_ts0.ArrayType",
  "arktype0.Type",
);
text = text.replaceAll(
  "arktype_internal_variants_object_ts0.ObjectType",
  "arktype0.Type",
);

writeFileSync("./dist/index.d.mts", text);
