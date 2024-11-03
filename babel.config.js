module.exports = (api) => {
  api.cache(true);

  return {
    plugins: ["babel-plugin-root-import"],
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: true,
          },
        },
      ],
      "@babel/preset-react",
    ],
  };
};
