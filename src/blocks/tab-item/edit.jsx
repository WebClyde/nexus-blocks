/**
 * Tab Item — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { IconControl } from '../../controls';
import {
	TypographyPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
export default function Edit( { attributes, setAttributes, clientId, context } ) {
	const { tabId, label, iconClass } = attributes;
	
	// Automatically generate a unique ID based on clientId if not set
	useEffect( () => {
		if ( ! tabId ) {
			setAttributes( { tabId: `tab-${ clientId.substring(0, 6) }` } );
		}
	}, [] );

	const blockProps = useBlockProps();
	
	// Use context to determine if this tab is the currently active one
	const isActive = context['nexusBlocks/activeTabId'] === tabId;

	return (
		<>
			<InspectorControls>
				<TypographyPanel initialOpen={ true }>
					<TextControl
						label={ __( 'Tab Label', 'nexus-blocks' ) }
						value={ label }
						onChange={ ( v ) => setAttributes( { label: v } ) }
					/>
				</TypographyPanel>
				<MediaAndVectorPanel initialOpen={ true }>
					<IconControl
						label={ __( 'Icon', 'nexus-blocks' ) }
						value={ iconClass }
						onChange={ ( v ) => setAttributes( { iconClass: v } ) }
					/>
				</MediaAndVectorPanel>
				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl
						label={ __( 'Tab ID (for anchors)', 'nexus-blocks' ) }
						value={ tabId }
						onChange={ ( v ) => setAttributes( { tabId: v } ) }
					/>
				</DataAndSchemaPanel>
			</InspectorControls>
			<div { ...blockProps } style={ { display: isActive ? 'block' : 'none', minHeight: '50px', padding: '16px', border: '1px dashed #ccc' } }>
				<InnerBlocks
					templateLock={ false }
					renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> }
				/>
			</div>
		</>
	);
}
