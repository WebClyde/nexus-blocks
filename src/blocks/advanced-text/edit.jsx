/**
 * Advanced Text — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, ToggleControl, TextControl, ButtonGroup, Button } from '@wordpress/components';
import { TypographyControl, ColorControl, SpacingControl, AnimationControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	DataAndSchemaPanel
} from '../../panels';
const COLUMN_RULES = [
	{ label: 'None',   value: 'none' },
	{ label: 'Solid',  value: 'solid' },
	{ label: 'Dashed', value: 'dashed' },
	{ label: 'Dotted', value: 'dotted' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId, content, alignment, textColor, typography, dropCap,
		columns, columnGap, columnRule, columnRuleWidth, columnRuleColor,
		linkColor, linkHoverColor, cssId, cssClasses, margin, padding, animation,
	} = attributes;

	useEffect( () => { const expected = `nx-${ clientId.slice( 0, 8 ) }`; if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } ); }, [ clientId ] );

	const blockProps = useBlockProps( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		style: { textAlign: alignment },
	} );

	const textStyle = {
		color:            textColor || undefined,
		columnCount:      columns > 1 ? columns : undefined,
		columnGap:        columns > 1 ? columnGap : undefined,
		columnRuleStyle:  columns > 1 && columnRule !== 'none' ? columnRule : undefined,
		columnRuleWidth:  columns > 1 && columnRule !== 'none' ? columnRuleWidth : undefined,
		columnRuleColor:  columns > 1 && columnRule !== 'none' ? columnRuleColor : undefined,
		...( typography?.fontFamily    ? { fontFamily:    typography.fontFamily }    : {} ),
		...( typography?.fontSize      ? { fontSize:      typography.fontSize }      : {} ),
		...( typography?.fontWeight    ? { fontWeight:    typography.fontWeight }    : {} ),
		...( typography?.lineHeight    ? { lineHeight:    typography.lineHeight }    : {} ),
		...( typography?.letterSpacing ? { letterSpacing: typography.letterSpacing } : {} ),
	};

	return (
		<>
			<InspectorControls>
				<TypographyPanel initialOpen={ true }>
					<ToggleControl label={ __( 'Drop Cap', 'nexus-blocks' ) } checked={ !! dropCap } onChange={ ( v ) => setAttributes( { dropCap: v } ) } />
					<ButtonGroup style={ { marginBottom: '16px' } }>
						{ [ 'left', 'center', 'right', 'justify' ].map( ( a ) => (
							<Button key={ a } isSmall variant={ alignment === a ? 'primary' : 'secondary' } onClick={ () => setAttributes( { alignment: a } ) }>
								{ a.charAt( 0 ).toUpperCase() + a.slice( 1 ) }
							</Button>
						) ) }
					</ButtonGroup>
					<TypographyControl value={ typography } onChange={ ( v ) => setAttributes( { typography: v } ) } />
				</TypographyPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<RangeControl label={ __( 'Columns', 'nexus-blocks' ) } value={ columns ?? 1 } onChange={ ( v ) => setAttributes( { columns: v } ) } min={ 1 } max={ 6 } />
					{ columns > 1 && (
						<>
							<TextControl label={ __( 'Column Gap', 'nexus-blocks' ) } value={ columnGap ?? '24px' } onChange={ ( v ) => setAttributes( { columnGap: v } ) } />
							<SelectControl label={ __( 'Column Rule', 'nexus-blocks' ) } value={ columnRule ?? 'none' } options={ COLUMN_RULES } onChange={ ( v ) => setAttributes( { columnRule: v } ) } />
							{ columnRule !== 'none' && (
								<TextControl label={ __( 'Rule Width', 'nexus-blocks' ) } value={ columnRuleWidth ?? '1px' } onChange={ ( v ) => setAttributes( { columnRuleWidth: v } ) } />
							) }
						</>
					) }
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
					<SpacingControl label={ __( 'Padding', 'nexus-blocks' ) } value={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Text Color', 'nexus-blocks' ) } value={ textColor } onChange={ ( v ) => setAttributes( { textColor: v } ) } />
					<ColorControl label={ __( 'Link Color', 'nexus-blocks' ) } value={ linkColor } onChange={ ( v ) => setAttributes( { linkColor: v } ) } />
					{ columns > 1 && columnRule !== 'none' && (
						<ColorControl label={ __( 'Rule Color', 'nexus-blocks' ) } value={ columnRuleColor } onChange={ ( v ) => setAttributes( { columnRuleColor: v } ) } />
					) }
				</ColorsAndBackgroundsPanel>

				<InteractionsPanel initialOpen={ false }>
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName="p"
					className={ `nexus-text${ dropCap ? ' has-drop-cap' : '' }` }
					style={ textStyle }
					value={ content }
					onChange={ ( v ) => setAttributes( { content: v } ) }
					placeholder={ __( 'Write text…', 'nexus-blocks' ) }
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/link', 'core/strikethrough', 'core/subscript', 'core/superscript' ] }
				/>
			</div>
		</>
	);
}
