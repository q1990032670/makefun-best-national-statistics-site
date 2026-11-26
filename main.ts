// Hand-in program for the Japan statistics portal (Node 22, standard library only).
//
// The site itself lives in app/ as plain static files (HTML, CSS and ES modules,
// no build step) and runs in a browser with no network access. This program's
// only job is to deliver it: copy app/ and screenshots/ from beside this file
// into the output directory and write dossier.json there with buildDossier
// from the vendored make.fun library, exactly as the competition requires.
// vendor/makefun-frontend.ts must stay byte-identical to the kit copy, because
// the scorer rebuilds the dossier with its own copy and compares the bytes.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });

mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
const shotsDir = join(repoRoot, 'screenshots');
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outputDir, 'screenshots'), { recursive: true });
}

// Caps mirror the gate's: at most 4 screenshots of 256 KiB each, at most 993
// files and directories in app/ totalling 16 MiB, dossier text capped at
// 163,840 bytes. Passing them here means buildDossier refuses anything the
// scorer would refuse, instead of writing a dossier that cannot match.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
