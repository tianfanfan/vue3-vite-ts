module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 80,
  endOfLine: "auto",
  quoteProps: "as-needed",
  trailingComma: "all",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  arrowParens: "always",
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "html",
      },
    },
  ],
  // "vueIndentScriptAndStyle": true
};
