export default   {
    moduleDirectories: [
      'node_modules',
    ],
    transform: {
      "\\.[jt]sx?$": "babel-jest",
      "^.+\\.css$": ["jest-transform-css", { modules: true }]
    },
    testEnvironment: "jsdom",
  }