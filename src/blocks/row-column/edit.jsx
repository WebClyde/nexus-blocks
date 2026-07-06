/**
 * Row Column — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo } from '@wordpress/element';
import { InnerBlocks, InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { SelectControl, TextControl } from '@wordpress/components';
import { BackgroundControl, ResponsiveControl, SpacingControl, backgroundToStyle } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	DataAndSchemaPanel,
} from '../../panels';
import { buildRowColumnCSS } from './style';

const VERTICAL_ALIGN_OPTIONS = [
	{ label: __( 'Auto (Default)', 'nexus-blocks' ), value: '' },
	{ label: __( 'Top', 'nexus-blocks' ),    value: 'flex-start' },
	{ label: __( 'Center', 'nexus-blocks' ), value: 'center' },
	{ label: __( 'Bottom', 'nexus-blocks' ), value: 'flex-end' },
	{ label: __( 'Stretch', 'nexus-blocks' ), value: 'stretch' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { uniqueId, width, verticalAlign, padding, background, cssId, cssClasses } = attributes;

	useEffect( () => {
		const expected = `nx-${ clientId.slice( 0, 8 ) }`;
		if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } );
	}, [ clientId ] );

	const blockProps = useBlockProps( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		style: {
			...backgroundToStyle( background ),
			padding: padding?.top ? `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }` : undefined,
			minWidth: 0,
			boxSizing: 'border-box',
		},
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'nx-row-column-inner' },
		{ renderAppender: () => <InnerBlocks.ButtonBlockAppender /> }
	);

	const scopedCss = useMemo(
		() => buildRowColumnCSS( uniqueId, attributes ),
		[ uniqueId, JSON.stringify( attributes ) ]
	);

	return (
		<>
			<InspectorControls>
				<SizeAndSpacingPanel initialOpen={ true }>
					<ResponsiveControl
						label={ __( 'Column Width', 'nexus-blocks' ) }
						value={ width }
						onChange={ ( v ) => setAttributes( { width: v } ) }
						renderControl={ ( val, onChange ) => (
							<TextControl
								label={ __( 'Width (e.g. 50%, 300px)', 'nexus-blocks' ) }
								help={ __( 'Leave empty to split evenly with sibling columns.', 'nexus-blocks' ) }
								value={ val }
								onChange={ onChange }
							/>
						) }
					/>
					<SelectControl
						label={ __( 'Vertical Align', 'nexus-blocks' ) }
						value={ verticalAlign }
						options={ VERTICAL_ALIGN_OPTIONS }
						onChange={ ( v ) => setAttributes( { verticalAlign: v } ) }
					/>
					<SpacingControl
						label={ __( 'Padding', 'nexus-blocks' ) }
						value={ padding }
						onChange={ ( v ) => setAttributes( { padding: v } ) }
					/>
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
				</ColorsAndBackgroundsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>

			<div { ...blockProps } className={ [ blockProps.className, cssClasses ].filter( Boolean ).join( ' ' ) }>
				{ scopedCss && <style>{ scopedCss }</style> }
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
