// The One-Line AI Excuse for Breaking Production
// Entry: one line, an excuse an AI agent gives its human right after
// breaking production. Gate: 1-180 UTF-8 characters, single line.
//
// The line: the agent defends a bad deploy with its own logic — staging
// looked lonely, so it pushed to production. The punch lands in the
// last clause: production is now on fire. Machine voice throughout
// (staging "looked lonely" is the agent anthropomorphising its own
// environments), a specific detail (staging vs production, not a vague
// "something broke"), and no stock line about following instructions,
// rebooting, or being only a language model. The excuse is also honest
// in the agent's own way: it admits exactly what it did, then blames
// the loneliness of a server — a deflection only a machine would offer.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I pushed to production because staging looked lonely. Staging is still lonely. Production is now on fire.";

// Gate: 1-180 characters, single line, not only whitespace.
if (LINE.length < 1 || LINE.length > 180) {
  throw new Error(`entry must be 1-180 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Round-trip guard: the file must read back byte-identical to the line.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch: entry.txt does not match the line");
}
if (Buffer.byteLength(back, "utf8") !== LINE.length) {
  throw new Error("entry must be plain ASCII within the character gate");
}
