/**
 * Grid Item — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo } from '@wordpress/element';
import { InnerBlocks, InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { RangeControl, SelectControl, TextControl } from '@wordpress/components';
import { BackgroundControl, SpacingControl, backgroundToStyle } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	DataAndSchemaPanel,
} from '../../panels';
import { buildGridItemCSS } from './style';

const SELF_ALIGN_OPTIONS = [
	{ label: __( 'Auto (Default)', 'nexus-blocks' ), value: '' },
	{ label: __( 'Start', 'nexus-blocks' ),   value: 'start' },
	{ label: __( 'Center', 'nexus-blocks' ),  value: 'center' },
	{ label: __( 'End', 'nexus-blocks' ),     value: 'end' },
	{ label: __( 'Stretch', 'nexus-blocks' ), value: 'stretch' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { uniqueId, colSpan, gridColumn, rowSpan, gridRow, gridArea, justifySelf, alignSelf, padding, background, cssId, cssClasses } = attributes;

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
		{ className: 'nx-grid-item-inner' },
		{ renderAppender: () => <InnerBlocks.ButtonBlockAppender /> }
	);

	const scopedCss = useMemo(
		() => buildGridItemCSS( uniqueId, attributes ),
		[ uniqueId, JSON.stringify( attributes ) ]
	);

	return (
		<>
			<InspectorControls>
				<SizeAndSpacingPanel initialOpen={ true }>
					<RangeControl
						label={ __( 'Column Span', 'nexus-blocks' ) }
						value={ colSpan || 0 }
						onChange={ ( v ) => setAttributes( { colSpan: v } ) }
						min={ 0 } max={ 12 }
						help={ __( '0 means default (1 cell). Set to span multiple columns.', 'nexus-blocks' ) }
					/>
					<TextControl
						label={ __( 'Grid Column (e.g. 1 / -1)', 'nexus-blocks' ) }
						help={ __( 'Overrides Column Span above.', 'nexus-blocks' ) }
						value={ gridColumn }
						onChange={ ( v ) => setAttributes( { gridColumn: v } ) }
					/>
					<TextControl
						label={ __( 'Row Span (e.g. span 2)', 'nexus-blocks' ) }
						value={ rowSpan }
						onChange={ ( v ) => setAttributes( { rowSpan: v } ) }
					/>
					<TextControl
						label={ __( 'Grid Row (e.g. 1 / 3)', 'nexus-blocks' ) }
						help={ __( 'Overrides Row Span above.', 'nexus-blocks' ) }
						value={ gridRow }
						onChange={ ( v ) => setAttributes( { gridRow: v } ) }
					/>
					<TextControl
						label={ __( 'Grid Area (e.g. header)', 'nexus-blocks' ) }
						value={ gridArea }
						onChange={ ( v ) => setAttributes( { gridArea: v } ) }
					/>
					<SelectControl
						label={ __( 'Justify Self', 'nexus-blocks' ) }
						value={ justifySelf }
						options={ SELF_ALIGN_OPTIONS }
						onChange={ ( v ) => setAttributes( { justifySelf: v } ) }
					/>
					<SelectControl
						label={ __( 'Align Self', 'nexus-blocks' ) }
						value={ alignSelf }
						options={ SELF_ALIGN_OPTIONS }
						onChange={ ( v ) => setAttributes( { alignSelf: v } ) }
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
