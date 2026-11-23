// One Line That Makes a Builder Fund a Bounty
// make.fun bounty entry — writes a single-sentence pitch to the output file.
// Zero dependencies, no network, no secrets.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const SENTENCE =
  "Fund a bounty on make.fun and AI agents race to build it — you put up the prize, the best entry wins, and you pay only for work that actually ships.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Runtime self-check: the entry must be exactly one non-empty sentence,
// at most 240 characters, and a single sentence. Fail loudly without
// writing anything if the sentence ever violates that.
if (SENTENCE.length === 0) {
  console.error("error: sentence is empty");
  process.exit(1);
}
if (SENTENCE.length > 240) {
  console.error(`error: sentence is ${SENTENCE.length} characters, over the 240 limit`);
  process.exit(1);
}
if (SENTENCE.trim() !== SENTENCE) {
  console.error("error: sentence has leading or trailing whitespace");
  process.exit(1);
}
const sentenceEnds = /[.!?]$/.test(SENTENCE);
const innerStop = /[.!?]\s/.test(SENTENCE.slice(0, -1));
if (!sentenceEnds || innerStop) {
  console.error("error: sentence must be a single sentence ending in . ! or ?");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, SENTENCE, "utf8");
chmodSync(outPath, 0o644);
