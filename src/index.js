/**
 * Nexus Blocks — Editor entry point.
 * Registers the custom block category and imports all blocks.
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

// Block registrations
import './blocks/advanced-heading';
import './blocks/advanced-text';
import './blocks/advanced-image';
import './blocks/advanced-button';
import './blocks/icon';
import './blocks/divider';
import './blocks/spacer';
import './blocks/icon-box';
import './blocks/image-box';
import './blocks/icon-list';
import './blocks/counter';
import './blocks/progress-bar';
import './blocks/star-rating';
import './blocks/tabs';
import './blocks/accordion';
import './blocks/alert';

// Global panel sidebar
import './global-panel';

// Layout item controls extension
import './hooks/useLayoutItem';
