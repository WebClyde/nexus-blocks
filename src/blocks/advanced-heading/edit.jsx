/**
 * Advanced Heading — Edit Component
 */

import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	SelectControl,
	TextControl,
	ToggleControl,
	RangeControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import { generateUniqueId } from '../../hooks/useStyleOutput';
import { TypographyControl, ColorControl, SpacingControl, AnimationControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';

const TAG_OPTIONS = [
	{ label: 'H1', value: 'h1' },
	{ label: 'H2', value: 'h2' },
	{ label: 'H3', value: 'h3' },
	{ label: 'H4', value: 'h4' },
	{ label: 'H5', value: 'h5' },
	{ label: 'H6', value: 'h6' },
	{ label: 'P',  value: 'p'  },
	{ label: 'DIV', value: 'div' },
];

const HIGHLIGHT_SHAPES = [
	{ label: 'Underline',        value: 'underline' },
	{ label: 'Double Underline', value: 'double-underline' },
	{ label: 'Circle',           value: 'circle' },
	{ label: 'Curly',            value: 'curly' },
	{ label: 'Diagonal',         value: 'diagonal' },
	{ label: 'Strikethrough',    value: 'strikethrough' },
	{ label: 'Zigzag',           value: 'zigzag' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		uniqueId, content, tag, alignment, linkUrl, linkTarget, linkNofollow,
		textColor, enableGradient, gradient, typography,
		enableStroke, strokeWidth, strokeColor,
		enableHighlight, highlightText, highlightShape, highlightColor, highlightStrokeWidth, highlightAnimation,
		margin, padding, animation, cssId, cssClasses, customCSS,
	} = attributes;

	useEffect( () => {
		if ( ! uniqueId ) setAttributes( { uniqueId: generateUniqueId() } );
	}, [] );

	const Tag = tag || 'h2';

	const blockProps = useBlockProps( {
		className: `nx-heading-wrapper${ cssClasses ? ' ' + cssClasses : '' }`,
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		style: { textAlign: alignment },
	} );

	const textStyle = {
		color: textColor || undefined,
		...(enableGradient ? {
			backgroundImage: `linear-gradient(${ gradient?.angle ?? 135 }deg, ${ gradient?.start ?? '#7C3AED' }, ${ gradient?.end ?? '#06B6D4' })`,
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor:  'transparent',
			backgroundClip:       'text',
		} : {}),
		...(enableStroke ? {
			WebkitTextStroke: `${ strokeWidth } ${ strokeColor }`,
		} : {}),
		...( typography?.fontFamily    ? { fontFamily:    typography.fontFamily }    : {} ),
		...( typography?.fontSize      ? { fontSize:      typography.fontSize }      : {} ),
		...( typography?.fontWeight    ? { fontWeight:    typography.fontWeight }    : {} ),
		...( typography?.lineHeight    ? { lineHeight:    typography.lineHeight }    : {} ),
		...( typography?.letterSpacing ? { letterSpacing: typography.letterSpacing } : {} ),
		...( typography?.textTransform ? { textTransform: typography.textTransform } : {} ),
	};

	return (
		<>
			<InspectorControls>
				<TypographyPanel initialOpen={ true }>
					<SelectControl
						label={ __( 'HTML Tag', 'nexus-blocks' ) }
						value={ tag }
						options={ TAG_OPTIONS }
						onChange={ ( val ) => setAttributes( { tag: val } ) }
					/>
					<ButtonGroup style={{ marginBottom: '16px', display: 'block' }}>
						{ [ 'left', 'center', 'right' ].map( ( align ) => (
							<Button
								key={ align }
								isSmall
								variant={ alignment === align ? 'primary' : 'secondary' }
								onClick={ () => setAttributes( { alignment: align } ) }
							>
								{ align.charAt( 0 ).toUpperCase() + align.slice( 1 ) }
							</Button>
						) ) }
					</ButtonGroup>
					<TypographyControl
						value={ typography }
						onChange={ ( val ) => setAttributes( { typography: val } ) }
					/>
					<ToggleControl
						label={ __( 'Text Stroke', 'nexus-blocks' ) }
						checked={ enableStroke }
						onChange={ ( val ) => setAttributes( { enableStroke: val } ) }
					/>
					{ enableStroke && (
						<TextControl
							label={ __( 'Stroke Width', 'nexus-blocks' ) }
							value={ strokeWidth }
							onChange={ ( val ) => setAttributes( { strokeWidth: val } ) }
						/>
					) }
				</TypographyPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl
						label={ __( 'Text Color', 'nexus-blocks' ) }
						value={ textColor }
						onChange={ ( val ) => setAttributes( { textColor: val } ) }
					/>
					{ enableStroke && (
						<ColorControl
							label={ __( 'Stroke Color', 'nexus-blocks' ) }
							value={ strokeColor }
							onChange={ ( val ) => setAttributes( { strokeColor: val } ) }
						/>
					) }
					<ToggleControl
						label={ __( 'Gradient Text', 'nexus-blocks' ) }
						checked={ enableGradient }
						onChange={ ( val ) => setAttributes( { enableGradient: val } ) }
					/>
					{ enableGradient && (
						<>
							<RangeControl
								label={ __( 'Angle', 'nexus-blocks' ) }
								value={ gradient?.angle ?? 135 }
								onChange={ ( val ) => setAttributes( { gradient: { ...gradient, angle: val } } ) }
								min={ 0 } max={ 360 }
							/>
							<ColorControl
								label={ __( 'Gradient Start', 'nexus-blocks' ) }
								value={ gradient?.start ?? '#7C3AED' }
								onChange={ ( val ) => setAttributes( { gradient: { ...gradient, start: val } } ) }
							/>
							<ColorControl
								label={ __( 'Gradient End', 'nexus-blocks' ) }
								value={ gradient?.end ?? '#06B6D4' }
								onChange={ ( val ) => setAttributes( { gradient: { ...gradient, end: val } } ) }
							/>
						</>
					) }
				</ColorsAndBackgroundsPanel>
				<MediaAndVectorPanel initialOpen={ false }>
					<ToggleControl
						label={ __( 'Enable Highlight', 'nexus-blocks' ) }
						checked={ enableHighlight }
						onChange={ ( val ) => setAttributes( { enableHighlight: val } ) }
					/>
					{ enableHighlight && (
						<>
							<TextControl
								label={ __( 'Word(s) to Highlight', 'nexus-blocks' ) }
								value={ highlightText }
								onChange={ ( val ) => setAttributes( { highlightText: val } ) }
							/>
							<SelectControl
								label={ __( 'Shape', 'nexus-blocks' ) }
								value={ highlightShape }
								options={ HIGHLIGHT_SHAPES }
								onChange={ ( val ) => setAttributes( { highlightShape: val } ) }
							/>
							<ColorControl
								label={ __( 'Shape Color', 'nexus-blocks' ) }
								value={ highlightColor }
								onChange={ ( val ) => setAttributes( { highlightColor: val } ) }
							/>
							<RangeControl
								label={ __( 'Stroke Width', 'nexus-blocks' ) }
								value={ highlightStrokeWidth }
								onChange={ ( val ) => setAttributes( { highlightStrokeWidth: val } ) }
								min={ 1 } max={ 10 }
							/>
						</>
					) }
				</MediaAndVectorPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<SpacingControl
						label={ __( 'Margin', 'nexus-blocks' ) }
						value={ margin }
						onChange={ ( val ) => setAttributes( { margin: val } ) }
						allowNegative
					/>
					<SpacingControl
						label={ __( 'Padding', 'nexus-blocks' ) }
						value={ padding }
						onChange={ ( val ) => setAttributes( { padding: val } ) }
					/>
				</SizeAndSpacingPanel>

				<InteractionsPanel initialOpen={ false }>
					<AnimationControl
						value={ animation }
						onChange={ ( val ) => setAttributes( { animation: val } ) }
					/>
					{ enableHighlight && (
						<ToggleControl
							label={ __( 'Animate shape on scroll', 'nexus-blocks' ) }
							checked={ highlightAnimation }
							onChange={ ( val ) => setAttributes( { highlightAnimation: val } ) }
						/>
					) }
				</InteractionsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl
						label={ __( 'Link URL', 'nexus-blocks' ) }
						value={ linkUrl }
						onChange={ ( val ) => setAttributes( { linkUrl: val } ) }
					/>
					{ linkUrl && (
						<>
							<ToggleControl
								label={ __( 'Open in new tab', 'nexus-blocks' ) }
								checked={ linkTarget }
								onChange={ ( val ) => setAttributes( { linkTarget: val } ) }
							/>
							<ToggleControl
								label={ __( 'Nofollow', 'nexus-blocks' ) }
								checked={ linkNofollow }
								onChange={ ( val ) => setAttributes( { linkNofollow: val } ) }
							/>
						</>
					) }
					<TextControl
						label={ __( 'CSS ID', 'nexus-blocks' ) }
						value={ cssId }
						onChange={ ( val ) => setAttributes( { cssId: val } ) }
					/>
					<TextControl
						label={ __( 'CSS Classes', 'nexus-blocks' ) }
						value={ cssClasses }
						onChange={ ( val ) => setAttributes( { cssClasses: val } ) }
					/>
				</DataAndSchemaPanel>
			</InspectorControls>

			<div { ...blockProps }>
				{ linkUrl ? (
					<Tag className="nexus-heading" style={ textStyle }>
						<a href={ linkUrl } target={ linkTarget ? '_blank' : undefined } rel={ linkNofollow ? 'nofollow' : undefined }>
							<RichText
								value={ content }
								onChange={ ( val ) => setAttributes( { content: val } ) }
								placeholder={ __( 'Write heading…', 'nexus-blocks' ) }
								allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
							/>
						</a>
					</Tag>
				) : (
					<Tag className="nexus-heading" style={ textStyle }>
						<RichText
							value={ content }
							onChange={ ( val ) => setAttributes( { content: val } ) }
							placeholder={ __( 'Write heading…', 'nexus-blocks' ) }
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
						/>
					</Tag>
				) }
			</div>
		</>
	);
}
