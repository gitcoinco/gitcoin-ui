import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import tailwind from "eslint-plugin-tailwindcss";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended, // .strict is a super set of recommended
  // ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  { ignores: ["dist", "node_modules", "storybook-static"] },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tailwind.configs["flat/recommended"],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-definitions": "warn",
    },
  },
  eslintConfigPrettier,
);
