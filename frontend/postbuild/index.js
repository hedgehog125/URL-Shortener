import { copyFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

process.chdir(path.dirname(fileURLToPath(import.meta.url)));

copyFile("../build/index.html", "../build/404.html");
