module.exports = {
    moduleDirectories: ["node_modules", "<rootDir>/"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^components(.*)$": "<rootDir>/components$1",
        "^react($|/.+)": "<rootDir>/node_modules/react$1",
    },
    testMatch: ["<rootDir>/__tests__/*.test.js"],
    verbose: true,
};
