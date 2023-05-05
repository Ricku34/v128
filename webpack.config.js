
const PROJECT = "v128";
const nodeConfig = {
	target: 'node',
	mode: 'development',
	entry: __dirname+ '/src/js/main.js',
	output: {
		path: __dirname + '/dist',
		filename: PROJECT+'-node.js',
		libraryTarget: 'umd'
	}
};

const webConfig = {
	target: 'web',
	mode: 'development',
	entry: __dirname+ '/src/js/main.js',
	output: {
		path: __dirname + '/dist',
		filename: PROJECT+'.js',
		libraryTarget: 'umd'
	}
};

const webminConfig = {
	target: 'web',
	mode: 'production',
	entry: __dirname+ '/src/js/main.js',
	output: {
		path: __dirname + '/dist',
		filename: PROJECT+'-min.js',
		libraryTarget: 'umd'
	}
};

module.exports = [nodeConfig, webConfig, webminConfig];

