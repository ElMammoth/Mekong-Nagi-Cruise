import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  // "saas template*": a licensed reference template kept locally during the reuse audit
  // (docs/08). Delete the folder, then this entry.
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts", "saas template*/**"] },
];

export default config;
