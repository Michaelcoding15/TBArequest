import { readFileSync, writeFileSync } from "fs";

const file = readFileSync("./dist/index.d.mts").toString();

const lines = file.split("\n");

const type = lines[0].slice(12, 20);

const object =
  lines[1][48] == " " ? lines[1].slice(12, 48) : lines[1].slice(12, 49);
const array =
  lines[2][47] == " " ? lines[2].slice(12, 47) : lines[2].slice(12, 48);

lines.splice(1, 2);

let text = lines.join("\n");

text = text.replaceAll(`${array}.ArrayType`, `${type}.Type`);
text = text.replaceAll(`${object}.ObjectType`, `${type}.Type`);

writeFileSync("./dist/index.d.mts", text);
