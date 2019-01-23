const path = require('path');

const sassIncludePaths = [
  path.resolve(__dirname, 'styles'),
];

module.exports = [
  {
    test: /\.jsx?$/,
    include: path.resolve(__dirname, 'src'),
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      plugins: ['react-hot-loader/babel'],
    }
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: ["file-loader"]
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {prefix: "font", limit: 5000}
      }
    ]
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          prefix: "font",
          limit: 10000,
          mimetype: "application/octet-stream"
        }
      }
    ]
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/svg+xml"
        }
      }
    ]
  },
  {
    test: /\.gif/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/gif"
        }
      }
    ]
  },
  {
    test: /\.jpg/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/jpg"
        }
      }
    ]
  },
  {
    test: /\.png/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/png",
          name: "[path][name].[ext]"
        }
      }
    ]
  },
  // ==========
  // = Styles =
  // ==========
  // Global CSS (from node_modules)
  // ==============================
  {
    test: /\.css/,
    include: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: 'css-loader'
      }
    ]
  },
  // Global SASS (from app)
  // ===============================
  // Do not modularize these imports
  // (leave them as global css styles)
  {
    test: /\.(sass|scss)$/,
    include: path.resolve(__dirname, 'styles/base'),
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          camelCase: "dashes",
          importLoaders: 1
        }
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: "inline",
        }
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          includePaths: sassIncludePaths
        }
      }
    ]
  },
  // Local SASS css-modules
  // ======================
  {
    test: /\.(sass|scss)$/,
    exclude: path.resolve(__dirname, 'styles'),
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: "inline",
        }
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          includePaths: sassIncludePaths
        }
      }
    ]
  }

];
