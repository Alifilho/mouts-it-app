import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  sonarjs.configs["recommended"],
  unicorn.configs["recommended"],
  {
    files: ["**/*.{js,jsx}"],
    plugins: { "react-hooks": reactHooks },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...react.configs.flat.recommended,
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
  prettier,
  {
    rules: {
      "sonarjs/todo-tag": "off",
      "func-style": ["error", "declaration", { allowArrowFunctions: false }],
      "unicorn/prevent-abbreviations": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
