/**
 * Tab Item
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import Save from './save';

registerBlockType( metadata.name, {
	icon: 'index-card',
	edit: Edit,
	save: Save,
} );
