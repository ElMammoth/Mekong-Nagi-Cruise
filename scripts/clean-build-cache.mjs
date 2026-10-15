#!/usr/bin/env node
/**
 * Runs before `next build` (npm "prebuild"). Deletes Turbopack's on-disk cache.
 *
 * CI hosts such as Cloudflare restore `.next/cache` between builds, sometimes only in part.
 * A partly restored Turbopack cache makes `next build` panic before compiling ("Unable to
 * open static sorted file … .sst: No such file or directory"). A full build takes well under
 * a minute, so every production build starts from a clean Turbopack cache. `npm run dev`
 * keeps its cache.
 */
import { rmSync } from "node:fs";
import { join } from "node:path";

rmSync(join(process.cwd(), ".next", "cache", "turbopack"), { recursive: true, force: true });
console.log("build cache: cleared .next/cache/turbopack");
