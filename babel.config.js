module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@src": "./src",
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@helper": "./src/helper/",
          "@hooks": "./src/hooks/",
          "@languages": "./src/languages",
          "@models": "./src/models",
          "@navigation": "./src/navigation",
          "@globalState": "./src/globalState",
          "@screens": "./src/screens",
          "@services": "./src/services",
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: [["transform-remove-console", { exclude: ["error", "warn"] }]],
    },
  },
};
