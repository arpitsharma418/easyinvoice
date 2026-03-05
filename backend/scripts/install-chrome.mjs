import { execSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const cacheDir = resolve(process.cwd(), ".cache", "puppeteer");

mkdirSync(cacheDir, { recursive: true });

execSync(`npx puppeteer browsers install chrome --path "${cacheDir}"`, {
  stdio: "inherit",
});
