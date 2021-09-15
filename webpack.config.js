module.exports = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					...
					{
						loader: 'css-loader',
					}, {
						loader: 'resolve-url-loader',
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							sourceMapContents: false
						}
					}
				]
			}
		]
	}
};
