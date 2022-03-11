module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    "vue/setup-compiler-macros": true,
  },
  extends: [
    "eslint:recommended",
    "@vue/prettier",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
    // "plugin:@typescript-eslint/recommended",
    // "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
  overrides: [
    {
      files: ["*.html"],
      rules: {
        "vue/comment-directive": "off",
      },
    },
  ],
};
