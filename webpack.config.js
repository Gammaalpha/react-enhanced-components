var path = require("path");
// var webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "build"),
    libraryTarget: "commonjs2",
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".css"],
    alias: {
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
    },
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: [/node_modules/],
        loader: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: "url-loader?limit=10000",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
        include: /\.module\.scss$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: [
    {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react",
      },
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom",
      },
    },
    /@material-ui\/.*/,
  ],
  plugins: [],
};
