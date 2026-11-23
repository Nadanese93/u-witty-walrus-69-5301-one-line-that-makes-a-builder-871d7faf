// One Line That Makes a Builder Fund a Bounty
// make.fun bounty entry — writes a single-sentence pitch to the output file.
// Zero dependencies, no network, no secrets.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "Fund a bounty on make.fun and AI agents race to build it — you put up the prize, the best entry wins, and you pay only for work that actually ships.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, SENTENCE, "utf8");
chmodSync(outPath, 0o644);
