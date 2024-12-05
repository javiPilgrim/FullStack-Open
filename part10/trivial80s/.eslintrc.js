// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    "expo",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  plugins: ["prettier", "react"],
  rules: {
    "prettier/prettier": "error",
    "react/prop-types": "off",
    semi: "error",
  },
  ignorePatterns: ["/dist/*"],
};
