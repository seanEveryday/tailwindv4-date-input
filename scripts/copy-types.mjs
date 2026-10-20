// Copies the handwritten .d.ts files into dist/ alongside the built JS.
import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const files = ["index.d.ts", "rhf.d.ts"];

await mkdir(resolve(root, "dist"), { recursive: true });
await Promise.all(files.map((f) => copyFile(resolve(root, "src", f), resolve(root, "dist", f))));

console.log(`Copied types: ${files.join(", ")}`);
