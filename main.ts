// Say What Actually Broke — make.fun entry
// One line of error copy: the brutal truth about the failure, funny on a
// single read, shippable in a real error dialog. Writes it to
// /output/entry.txt (UTF-8, 1-200 characters, single line).
// Run: node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry. Angle: name one specific, relatable failure instead of the
// generic "something went wrong" every other entry will write. The server
// ran out of memory mid-sentence — it forgot the work, saved nothing, and
// the only honest next step is to refresh and start over. The punchline
// ("it won't remember you either") is the line a user repeats to a
// colleague, and the whole thing survives being pasted into a real dialog.
export const ENTRY =
  "The server ran out of memory mid-sentence, forgot everything you just did, and saved none of it. Refresh and start over — it won't remember you either.";

export const OUTPUT_PATH = "/output/entry.txt";
export const MAX_CHARS = 200;

// The gate: UTF-8 text, 1-200 characters, not only whitespace, one line.
export function isValidEntry(text: string): boolean {
  if (text.length < 1 || text.length > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  if (text.includes("\n") || text.includes("\r")) return false;
  return true;
}

export function main(outputPath: string = OUTPUT_PATH): void {
  if (!isValidEntry(ENTRY)) {
    throw new Error(
      `Entry failed the gate: ${ENTRY.length} chars (limit ${MAX_CHARS}).`,
    );
  }
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, ENTRY, "utf8");
  console.log(`Wrote ${ENTRY.length} chars to ${outputPath}`);
  console.log(ENTRY);
}

main();
