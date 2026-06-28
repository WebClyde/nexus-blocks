/**
 * Row Layout / Container — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { TextControl, SelectControl, ToggleControl } from '@wordpress/components';
import { useStyleOutput } from '../../hooks/useStyleOutput';
import { buildRowLayoutRules } from './style';
import { ColorControl, SpacingControl, AnimationControl, BorderControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	ColumnLayoutControlsPanel,
	InteractionsPanel,
	DataAndSchemaPanel,
} from '../../panels';

// Editor preview: placeholder for the row
const TEMPLATE = [ [ 'core/paragraph', { placeholder: 'Add blocks inside this row…' } ] ];

export default function Edit( { attributes, setAttributes } ) {
	const {
		uniqueId, flexLayout, columnGap, rowGap, margin, padding, width, maxWidth, minHeight,
		bgColor, bgGradient, enableGradient, bgImage, bgSize, bgPosition, bgRepeat,
		borderColor, borderWidth, borderStyle, borderRadius, boxShadow,
		animation, cssId, cssClasses
	} = attributes;

	useEffect( () => {
		if ( ! uniqueId ) {
			setAttributes( { uniqueId: 'nx-' + Math.random().toString( 36 ).substring( 2, 8 ) } );
		}
	}, [] );

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
	const scopedCss = useStyleOutput( uniqueId, buildRowLayoutRules, attributes );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'nx-row-inner' },
		{ template: TEMPLATE }
	);

	return (
		<>
			<InspectorControls>
				<ColumnLayoutControlsPanel
					initialOpen={ true }
					flexLayout={ flexLayout || {} }
					onChangeFlex={ ( v ) => setAttributes( { flexLayout: v } ) }
				/>
				
				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Background Color', 'nexus-blocks' ) } value={ bgColor } onChange={ ( v ) => setAttributes( { bgColor: v } ) } />
					<ToggleControl label={ __( 'Use Gradient', 'nexus-blocks' ) } checked={ !! enableGradient } onChange={ ( v ) => setAttributes( { enableGradient: v } ) } />
					{ enableGradient && <TextControl label={ __( 'Gradient CSS', 'nexus-blocks' ) } value={ bgGradient } onChange={ ( v ) => setAttributes( { bgGradient: v } ) } /> }
					<TextControl label={ __( 'Background Image URL', 'nexus-blocks' ) } value={ bgImage } onChange={ ( v ) => setAttributes( { bgImage: v } ) } />
					{ bgImage && (
						<>
							<SelectControl
								label={ __( 'BG Size', 'nexus-blocks' ) }
								value={ bgSize || 'cover' }
								options={ [ { label: 'Cover', value: 'cover' }, { label: 'Contain', value: 'contain' }, { label: 'Auto', value: 'auto' } ] }
								onChange={ ( v ) => setAttributes( { bgSize: v } ) }
							/>
							<TextControl label={ __( 'BG Position', 'nexus-blocks' ) }   value={ bgPosition } onChange={ ( v ) => setAttributes( { bgPosition: v } ) } />
							<SelectControl
								label={ __( 'BG Repeat', 'nexus-blocks' ) }
								value={ bgRepeat || 'no-repeat' }
								options={ [ { label: 'No Repeat', value: 'no-repeat' }, { label: 'Repeat', value: 'repeat' } ] }
								onChange={ ( v ) => setAttributes( { bgRepeat: v } ) }
							/>
						</>
					) }
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
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
