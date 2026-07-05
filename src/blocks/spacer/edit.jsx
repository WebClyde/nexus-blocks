/**
 * Spacer — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { generateUniqueId } from '../../hooks/useStyleOutput';
import { BackgroundControl, backgroundToStyle, backgroundHoverToCSS } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	DataAndSchemaPanel
} from '../../panels';

export default function Edit( { attributes, setAttributes } ) {
	const { uniqueId, height, background, cssId, cssClasses } = attributes;
	useEffect( () => { if ( ! uniqueId ) setAttributes( { uniqueId: generateUniqueId() } ); }, [] );
	const blockProps = useBlockProps( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		style: { ...backgroundToStyle( background ), height: height ?? '60px', display: 'block', width: '100%' },
	} );
	const hoverCss = backgroundHoverToCSS( uniqueId, background );
	return (
		<>
			<InspectorControls>
				<SizeAndSpacingPanel initialOpen={ true }>
					<TextControl label={ __( 'Height', 'nexus-blocks' ) } help={ __( 'e.g. 60px, 5vh, 2em', 'nexus-blocks' ) } value={ height ?? '60px' } onChange={ ( v ) => setAttributes( { height: v } ) } />
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
				</ColorsAndBackgroundsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>
			<div { ...blockProps } className="nexus-spacer" aria-hidden="true">
				{ hoverCss && <style>{ hoverCss }</style> }
				<span className="nx-spacer-indicator">↕ { height ?? '60px' }</span>
			</div>
		</>
	);
}
