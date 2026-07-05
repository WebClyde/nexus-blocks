/**
 * Nexus Blocks — Editor entry point.
 * Registers the custom block category, the global settings sidebar, and the
 * layout-item hook that applies to every block.
 *
 * Individual blocks are NOT imported here — each one ships as its own
 * bundle (build/blocks/<name>/index.js) via block.json's `editorScript`,
 * auto-enqueued by Nexus_Loader::register_blocks() in PHP. Importing them
 * here too would double-bundle every block and double-register them.
 */

import { getCategories, setCategories } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { createElement } from '@wordpress/element';

// Stylesheets
import './style.css';
import './editor.css';

// Register "Nexus Blocks" category with green icon
setCategories( [
	{
		slug:  'nexus-blocks',
		title: __( 'Nexus Blocks', 'nexus-blocks' ),
		icon:  createElement( 'svg', { width: 20, height: 20, viewBox: '0 0 20 20', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' },
			createElement( 'rect', { width: 20, height: 20, rx: 4, fill: '#10B981' } ),
			createElement( 'path', { d: 'M5 10L8.5 13.5L15 7', stroke: '#fff', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } )
		),
	},
	...getCategories(),
] );

// Global panel sidebar
import './global-panel';

// Layout item controls extension
import './hooks/useLayoutItem';
