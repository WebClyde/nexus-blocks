const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
const fs = require( 'fs' );

// Auto-discover all blocks
const blocksDir = path.resolve( __dirname, 'src/blocks' );
const blockEntries = {};

fs.readdirSync( blocksDir ).forEach( ( blockName ) => {
	const indexFile = path.join( blocksDir, blockName, 'index.js' );
	if ( fs.existsSync( indexFile ) ) {
		blockEntries[ `blocks/${ blockName }/index` ] = indexFile;
	}
} );

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve( __dirname, 'src/index.js' ),
		frontend: path.resolve( __dirname, 'src/frontend.js' ),
		'global-panel': path.resolve( __dirname, 'src/global-panel/index.js' ),
		...blockEntries,
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'build' ),
		filename: '[name].js',
	},
};
