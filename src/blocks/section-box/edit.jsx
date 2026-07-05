/**
 * Section / Box — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { TextControl, SelectControl, RangeControl } from '@wordpress/components';
import { useStyleOutput } from '../../hooks/useStyleOutput';
import { buildSectionBoxRules } from './style';
import { ColorControl, BackgroundControl, SpacingControl, AnimationControl, BorderControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	ColumnLayoutControlsPanel,
	InteractionsPanel,
	DataAndSchemaPanel,
} from '../../panels';

const HTML_TAGS = [
	{ label: '<section>',  value: 'section'  },
	{ label: '<div>',      value: 'div'      },
	{ label: '<article>',  value: 'article'  },
	{ label: '<aside>',    value: 'aside'    },
	{ label: '<header>',   value: 'header'   },
	{ label: '<footer>',   value: 'footer'   },
	{ label: '<main>',     value: 'main'     },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		uniqueId, htmlTag, flexLayout, margin, padding, width, maxWidth, minHeight, overflow,
		background,
		overlayColor, overlayOpacity, borderColor, borderWidth, borderStyle, borderRadius, boxShadow,
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
		}
	} );
	const scopedCss  = useStyleOutput( uniqueId, buildSectionBoxRules, attributes );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'nx-section-inner' }
	);

	return (
		<>
			<InspectorControls>
				<DataAndSchemaPanel initialOpen={ true }>
					<SelectControl
						label={ __( 'HTML Tag', 'nexus-blocks' ) }
						value={ htmlTag || 'section' }
						options={ HTML_TAGS }
						onChange={ ( v ) => setAttributes( { htmlTag: v } ) }
					/>
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) }     value={ cssId }      onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<TextControl label={ __( 'Width (e.g. 100%)',    'nexus-blocks' ) } value={ width      } onChange={ ( v ) => setAttributes( { width: v } ) } />
					<TextControl label={ __( 'Max Width (e.g. 1200px)', 'nexus-blocks' ) } value={ maxWidth   } onChange={ ( v ) => setAttributes( { maxWidth: v } ) } />
					<TextControl label={ __( 'Min Height (e.g. 400px)', 'nexus-blocks' ) } value={ minHeight  } onChange={ ( v ) => setAttributes( { minHeight: v } ) } />
					<SelectControl
						label={ __( 'Overflow', 'nexus-blocks' ) }
						value={ overflow || 'visible' }
						options={ [
							{ label: 'Visible', value: 'visible' },
							{ label: 'Hidden',  value: 'hidden'  },
							{ label: 'Auto',    value: 'auto'    },
							{ label: 'Scroll',  value: 'scroll'  },
						] }
						onChange={ ( v ) => setAttributes( { overflow: v } ) }
					/>
					<SpacingControl label={ __( 'Padding', 'nexus-blocks' ) } value={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
					<SpacingControl label={ __( 'Margin',  'nexus-blocks' ) } value={ margin  } onChange={ ( v ) => setAttributes( { margin: v  } ) } allowNegative />
					<TextControl label={ __( 'Border Radius (e.g. 12px)', 'nexus-blocks' ) } value={ borderRadius } onChange={ ( v ) => setAttributes( { borderRadius: v } ) } />
					<TextControl label={ __( 'Box Shadow',  'nexus-blocks' ) } value={ boxShadow } onChange={ ( v ) => setAttributes( { boxShadow: v } ) } />
					<BorderControl
						label={ __( 'Border', 'nexus-blocks' ) }
						value={ { color: borderColor, width: borderWidth, style: borderStyle } }
						onChange={ ( v ) => setAttributes( { borderColor: v.color, borderWidth: v.width, borderStyle: v.style } ) }
					/>
				</SizeAndSpacingPanel>

				<ColumnLayoutControlsPanel
					initialOpen={ false }
					flexLayout={ flexLayout || {} }
					onChangeFlex={ ( v ) => setAttributes( { flexLayout: v } ) }
				/>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
					<ColorControl label={ __( 'Overlay Color', 'nexus-blocks' ) } value={ overlayColor } onChange={ ( v ) => setAttributes( { overlayColor: v } ) } />
					{ overlayColor && (
						<RangeControl
							label={ __( 'Overlay Opacity (%)', 'nexus-blocks' ) }
							value={ overlayOpacity ?? 50 }
							onChange={ ( v ) => setAttributes( { overlayOpacity: v } ) }
							min={ 0 } max={ 100 }
						/>
					) }
				</ColorsAndBackgroundsPanel>

				<InteractionsPanel initialOpen={ false }>
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				{ scopedCss && <style>{ scopedCss }</style> }
				{ overlayColor && <div className="nx-overlay" /> }
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
