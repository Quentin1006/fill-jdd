module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        entry: {
          main: "./src/index.tsx",
          sub: "./src/services/sub.ts",
          background: "./src/services/background.ts",
          before: "./src/services/before.ts",
          after: "./src/services/after.ts",
        },
        devtool: false,
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
