// Copies afrigov's stylesheet from npm into assets/, for themes that do not carry afrigov themselves.
import { cpSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const dist = join(dirname(require.resolve("afrigov/package.json")), "dist");
mkdirSync("assets/afrigov", { recursive: true });
cpSync(join(dist, "core.min.css"), "assets/afrigov/core.min.css");
console.log("assets/afrigov/core.min.css copied from afrigov", require("afrigov/package.json").version);
