module.exports = {
   env: {
      es2021: true,
      node: true,
   },
   extends: ["airbnb-base", "prettier"],
   parser: "@typescript-eslint/parser",
   parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
   },
   plugins: ["@typescript-eslint", "prettier"],
   rules: {
      "prettier/prettier": "error",
      "import/extensions": [
         "error",
         "ignorePackages",
         {
            ts: "never",
         },
      ],
   },
   settings: {
      "import/resolver": {
         node: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
         },
      },
   },
};
