/**
 * Grid Layout / Container — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { useStyleOutput } from '../../hooks/useStyleOutput';
import { buildGridLayoutRules } from './style';
import { BackgroundControl, SpacingControl, AnimationControl, BorderControl } from '../../controls';
import ColumnCountPicker from '../../components/ColumnCountPicker';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	ColumnLayoutControlsPanel,
	InteractionsPanel,
	DataAndSchemaPanel,
} from '../../panels';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId, gridLayout, columnGap, rowGap, margin, padding, width, maxWidth, minHeight,
		background,
		borderColor, borderWidth, borderStyle, borderRadius, boxShadow,
		animation, cssId, cssClasses
	} = attributes;

	useEffect( () => {
		const expected = `nx-${ clientId.slice( 0, 8 ) }`;
		if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } );
	}, [ clientId ] );

	const blockProps = useBlockProps( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		style: {
			width: width || undefined,
			maxWidth: maxWidth || undefined,
			// Editor visual hint
			outline: '2px dashed rgba(79,70,229,0.2)',
			outlineOffset: '2px',
		}
	} );
	const scopedCss = useStyleOutput( uniqueId, buildGridLayoutRules, attributes );

	const hasItems = useSelect(
		( select ) => select( 'core/block-editor' ).getBlockOrder( clientId ).length > 0,
		[ clientId ]
	);
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'nx-grid-inner' },
		{
			allowedBlocks: [ 'nexus-blocks/grid-item' ],
			renderAppender: () => <InnerBlocks.ButtonBlockAppender />,
		}
	);

	const insertColumns = ( count ) => {
		const items = Array.from( { length: count }, () => createBlock( 'nexus-blocks/grid-item', {} ) );
		replaceInnerBlocks( clientId, items, false );
		setAttributes( { gridLayout: { ...gridLayout, display: 'grid', columns: count } } );
	};

	return (
		<>
			<InspectorControls>
				<ColumnLayoutControlsPanel
					initialOpen={ true }
					gridOnly
					flexLayout={ gridLayout || {} }
					onChangeFlex={ ( v ) => setAttributes( { gridLayout: v } ) }
				/>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
				</ColorsAndBackgroundsPanel>

				<SizeAndSpacingPanel initialOpen={ true }>
					<TextControl label={ __( 'Width (e.g. 100%)',       'nexus-blocks' ) } value={ width      } onChange={ ( v ) => setAttributes( { width: v } ) } />
					<TextControl label={ __( 'Max Width (e.g. 1200px)', 'nexus-blocks' ) } value={ maxWidth   } onChange={ ( v ) => setAttributes( { maxWidth: v } ) } />
					<TextControl label={ __( 'Min Height (e.g. 300px)', 'nexus-blocks' ) } value={ minHeight  } onChange={ ( v ) => setAttributes( { minHeight: v } ) } />
					<TextControl label={ __( 'Column Gap (e.g. 20px, 2rem)', 'nexus-blocks' ) } value={ columnGap } onChange={ ( v ) => setAttributes( { columnGap: v } ) } />
					<TextControl label={ __( 'Row Gap (e.g. 20px)',          'nexus-blocks' ) } value={ rowGap    } onChange={ ( v ) => setAttributes( { rowGap: v    } ) } />
					<SpacingControl label={ __( 'Padding', 'nexus-blocks' ) } value={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
					<SpacingControl label={ __( 'Margin',  'nexus-blocks' ) } value={ margin  } onChange={ ( v ) => setAttributes( { margin: v  } ) } allowNegative />
					<TextControl label={ __( 'Border Radius', 'nexus-blocks' ) } value={ borderRadius } onChange={ ( v ) => setAttributes( { borderRadius: v } ) } />
					<TextControl label={ __( 'Box Shadow', 'nexus-blocks' ) }   value={ boxShadow    } onChange={ ( v ) => setAttributes( { boxShadow: v } ) } />
					<BorderControl
						label={ __( 'Border', 'nexus-blocks' ) }
						value={ { color: borderColor, width: borderWidth, style: borderStyle } }
						onChange={ ( v ) => setAttributes( { borderColor: v.color, borderWidth: v.width, borderStyle: v.style } ) }
					/>
				</SizeAndSpacingPanel>

				<DataAndSchemaPanel initialOpen={ true }>
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) }     value={ cssId }      onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>

				<InteractionsPanel initialOpen={ false }>
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				{ scopedCss && <style>{ scopedCss }</style> }
				{ hasItems
					? <div { ...innerBlocksProps } />
					: (
						<ColumnCountPicker
							icon="grid-view"
							label={ __( 'Grid Layout', 'nexus-blocks' ) }
							instructions={ __( 'Choose how many grid columns to start with. You can add, remove, or resize items afterwards.', 'nexus-blocks' ) }
							onPick={ insertColumns }
						/>
					)
				}
			</div>
		</>
	);
}
