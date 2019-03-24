const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loaders: ["file-loader"],
        include: [path.resolve(__dirname, "../")]
			},
      {
        test: /\.(scss|css)$/,
        include: [
          path.resolve(__dirname, '../src/App'),
          path.resolve(__dirname, '../src/css')
        ],
        exclude: [
          path.join(__dirname, "node_modules/wix-style-react")          
        ],
				loaders: [
					"style-loader", 
					"css-loader", 					
					"sass-loader"
				]
      },			
      {
        test: /\.(scss|css)$/,
        include: [
					path.resolve(__dirname, '../'),					
          // path.join(__dirname, "node_modules/bootstrap-sass"), // only if you use Grid component
          path.join(__dirname, "node_modules/wix-style-react")
				],
				exclude: [
					path.resolve(__dirname, '../src/App')
				],
				loaders: [
					"style-loader", 
          'css-loader?modules&importLoaders=1&camelCase&localIdentName=[name]__[local]___[hash:base64:5]',
          "postcss-loader",
					"sass-loader"
				]
      },			
    ],
    loaders: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader" //'file?name=public/fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "file-loader"
      },
      {
        test: /\.(scss)$/,
        loader: "sass-loader"
      },
      {
        test: /\.(scss|css)$/,
        loader: "style-loader"
      },
      {
        test: /\.(scss|css)$/,
        loader: "css-loader"
      }
    ]
  }
};
