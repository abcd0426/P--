import { globalIgnores } from "eslint/config";

export default [
  globalIgnores([".next/**", "out/**", "dist/**", "build/**", "node_modules/**"]),
];
