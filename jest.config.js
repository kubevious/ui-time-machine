module.exports = {
    preset: 'ts-jest',
    roots: ["<rootDir>"],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    setupFilesAfterEnv: [
    //   "@testing-library/react/cleanup-after-each",
      "@testing-library/jest-dom/extend-expect"
    ],
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleNameMapper: {
        "\\.(scss|sass|css)$": "identity-obj-proxy"
      },
    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
  };
