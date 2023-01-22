module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        mode: "development",
        entry: {
          main: "./src/index.tsx",
          sub: "./src/background/sub.ts",
          background: "./src/background/background.ts",
          before: "./src/content_scripts/before.ts",
          after: "./src/content_scripts/after.ts",
        },
        output: {
          ...webpackConfig.output,
          filename: "static/js/[name].js",
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
      };
    },
  },
};
