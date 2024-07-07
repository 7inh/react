module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "@typescript-eslint", "prettier"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "react/react-in-jsx-scope": "off",
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "prettier/prettier": "error",
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
    },
};
