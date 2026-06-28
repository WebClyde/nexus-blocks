/**
 * Flex & Grid Item Layout Extension
 *
 * This injects layout item controls (col-span, align-self, etc.) into ALL blocks
 * and applies the necessary inline CSS variables/styles in both the editor and frontend.
 */

import { assign } from 'lodash';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl } from '@wordpress/components';
import { hasBlockSupport } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * 1. Add `nexusLayoutItem` attribute to all blocks
 */
function addLayoutItemAttribute( settings, name ) {
	// Only add to blocks that support customClassName (which is most blocks)
	if ( hasBlockSupport( settings, 'customClassName', true ) ) {
		settings.attributes = assign( settings.attributes || {}, {
			nexusLayoutItem: {
				type: 'object',
				default: {},
			},
		} );
	}
	return settings;
}
addFilter( 'blocks.registerBlockType', 'nexus/layout-item-attr', addLayoutItemAttribute );

/**
 * 2. Add Inspector Controls Panel to Editor
 */
const withLayoutItemControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, setAttributes, isSelected } = props;
		const { nexusLayoutItem } = attributes;

		// Find parent block to check if it's a grid or flex container
		const parentBlock = useSelect( ( select ) => {
			const { getBlockParents, getBlock } = select( 'core/block-editor' );
			const parents = getBlockParents( props.clientId );
			if ( parents && parents.length > 0 ) {
				return getBlock( parents[ parents.length - 1 ] );
			}
			return null;
		}, [ props.clientId ] );

		const parentDisplay = parentBlock?.attributes?.flexLayout?.display;
		let isFlex = false;
		let isGrid = false;
		
		if ( parentBlock?.name === 'nexus-blocks/row-layout' ) {
			isFlex = !parentDisplay || parentDisplay === 'flex' || parentDisplay === 'inline-flex';
			isGrid = parentDisplay === 'grid';
		} else if ( parentBlock?.name === 'nexus-blocks/section-box' ) {
			isFlex = parentDisplay === 'flex' || parentDisplay === 'inline-flex';
			isGrid = parentDisplay === 'grid';
		} else if ( parentBlock?.name === 'nexus-blocks/progress-bar' ) {
			isFlex = !parentDisplay || parentDisplay === 'flex'; // Progress bar defaults to flex for some layouts, but let's just check attribute
			isGrid = parentDisplay === 'grid';
		} else if ( parentDisplay ) {
			isFlex = parentDisplay === 'flex' || parentDisplay === 'inline-flex';
			isGrid = parentDisplay === 'grid';
		}

		// Only show controls if the block has our attribute AND is inside a flex/grid container
		if ( ! isSelected || ! attributes.hasOwnProperty( 'nexusLayoutItem' ) || ( ! isFlex && ! isGrid ) ) {
			return <BlockEdit { ...props } />;
		}

		const set = ( key, val ) => setAttributes( {
			nexusLayoutItem: { ...nexusLayoutItem, [ key ]: val }
		} );

		// Generate inline CSS for the editor wrapper
		let cssString = '';
		if ( Object.keys( nexusLayoutItem || {} ).length > 0 ) {
			const styles = buildLayoutStyles( nexusLayoutItem );
			if ( Object.keys( styles ).length > 0 ) {
				const cssRules = Object.entries( styles ).map( ( [ k, v ] ) => {
					const kebab = k.replace( /([A-Z])/g, '-$1' ).toLowerCase();
					return `${ kebab }: ${ v } !important;`;
				} ).join( ' ' );
				cssString = `#block-${ props.clientId } { ${ cssRules } }`;
			}
		}

		return (
			<>
				<BlockEdit { ...props } />
				{ cssString && <style>{ cssString }</style> }
				<InspectorControls>
					<PanelBody title={ __( '🔲 Flex & Grid Item', 'nexus-blocks' ) } initialOpen={ false }>
						
						{/* Grid-specific Controls */}
						{ isGrid && (
							<>
								<RangeControl
									label={ __( 'Grid Column Span', 'nexus-blocks' ) }
									value={ nexusLayoutItem?.colSpan || 0 }
									onChange={ ( v ) => set( 'colSpan', v ) }
									min={ 0 } max={ 12 }
									help={ __( '0 means default. Set to span multiple columns.', 'nexus-blocks' ) }
								/>
								<TextControl
									label={ __( 'Grid Column (e.g. 1 / -1)', 'nexus-blocks' ) }
									value={ nexusLayoutItem?.gridColumn || '' }
									onChange={ ( v ) => set( 'gridColumn', v ) }
								/>
								<TextControl
									label={ __( 'Grid Row Span (e.g. span 2)', 'nexus-blocks' ) }
									value={ nexusLayoutItem?.rowSpan || '' }
									onChange={ ( v ) => set( 'rowSpan', v ) }
								/>
								<TextControl
									label={ __( 'Grid Row (e.g. 1 / 3)', 'nexus-blocks' ) }
									value={ nexusLayoutItem?.gridRow || '' }
									onChange={ ( v ) => set( 'gridRow', v ) }
								/>
								<TextControl
									label={ __( 'Grid Area (e.g. header)', 'nexus-blocks' ) }
									value={ nexusLayoutItem?.gridArea || '' }
									onChange={ ( v ) => set( 'gridArea', v ) }
								/>
								<SelectControl
									label={ __( 'Justify Self', 'nexus-blocks' ) }
									value={ nexusLayoutItem?.justifySelf || '' }
									options={ [
										{ label: 'Auto (Default)', value: '' },
										{ label: 'Start', value: 'start' },
										{ label: 'Center', value: 'center' },
										{ label: 'End', value: 'end' },
										{ label: 'Stretch', value: 'stretch' },
									] }
									onChange={ ( v ) => set( 'justifySelf', v ) }
								/>
							</>
						) }

						{/* Flex-specific Controls */}
						{ isFlex && (
							<>
								<TextControl
									label={ __( 'Flex Grow (e.g. 1)', 'nexus-blocks' ) }
									value={ nexusLayoutItem?.flexGrow || '' }
									onChange={ ( v ) => set( 'flexGrow', v ) }
								/>
								<TextControl
									label={ __( 'Flex Shrink (e.g. 0)', 'nexus-blocks' ) }
									value={ nexusLayoutItem?.flexShrink || '' }
									onChange={ ( v ) => set( 'flexShrink', v ) }
								/>
								<TextControl
									label={ __( 'Flex Basis (e.g. 50%)', 'nexus-blocks' ) }
									value={ nexusLayoutItem?.flexBasis || '' }
									onChange={ ( v ) => set( 'flexBasis', v ) }
								/>
							</>
						) }
						
						{/* Shared Controls (Both Flex & Grid support align-self and order) */}
						<SelectControl
							label={ __( 'Align Self', 'nexus-blocks' ) }
							value={ nexusLayoutItem?.alignSelf || '' }
							options={ [
								{ label: 'Auto (Default)', value: '' },
								{ label: 'Start', value: ( isGrid ? 'start' : 'flex-start' ) },
								{ label: 'Center', value: 'center' },
								{ label: 'End', value: ( isGrid ? 'end' : 'flex-end' ) },
								{ label: 'Stretch', value: 'stretch' },
							] }
							onChange={ ( v ) => set( 'alignSelf', v ) }
						/>
						<TextControl
							label={ __( 'Order (e.g. 1)', 'nexus-blocks' ) }
							value={ nexusLayoutItem?.order || '' }
							onChange={ ( v ) => set( 'order', v ) }
							type="number"
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withLayoutItemControls' );
addFilter( 'editor.BlockEdit', 'nexus/layout-item-controls', withLayoutItemControls );

/**
 * 3. Helper to build styles from the attribute object
 */
function buildLayoutStyles( item = {} ) {
	const styles = {};
	
	if ( item.colSpan && item.colSpan > 0 ) {
		styles.gridColumn = `span ${ item.colSpan }`;
	} else if ( item.gridColumn ) {
		styles.gridColumn = item.gridColumn;
	}
	if ( item.rowSpan ) {
		styles.gridRow = item.rowSpan;
	} else if ( item.gridRow ) {
		styles.gridRow = item.gridRow;
	}
	if ( item.gridArea ) {
		styles.gridArea = item.gridArea;
	}
	if ( item.alignSelf ) {
		styles.alignSelf = item.alignSelf;
	}
	if ( item.justifySelf ) {
		styles.justifySelf = item.justifySelf;
	}
	if ( item.flexGrow ) {
		styles.flexGrow = item.flexGrow;
	}
	if ( item.flexShrink ) {
		styles.flexShrink = item.flexShrink;
	}
	if ( item.flexBasis ) {
		styles.flexBasis = item.flexBasis;
	}
	if ( item.order !== undefined && item.order !== '' ) {
		styles.order = item.order;
	}
	
	return styles;
}

// Removed BlockListBlock hook as it does not reliably apply inline styles to blocks using Block API v2.
// The styles are now injected via a <style> tag in the BlockEdit hook above.
/**
 * 5. Apply styles to the block wrapper on the frontend
 */
function applyLayoutItemSaveProps( extraProps, blockType, attributes ) {
	const { nexusLayoutItem } = attributes;
	
	if ( nexusLayoutItem && hasBlockSupport( blockType, 'customClassName', true ) ) {
		const styles = buildLayoutStyles( nexusLayoutItem );
		if ( Object.keys( styles ).length > 0 ) {
			extraProps.style = {
				...extraProps.style,
				...styles
			};
		}
	}
	
	return extraProps;
}
addFilter( 'blocks.getSaveContent.extraProps', 'nexus/layout-item-save-props', applyLayoutItemSaveProps );
