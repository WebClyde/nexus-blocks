/**
 * Advanced Heading — Edit Component
 */

import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	InspectorControls,
	BlockControls,
	AlignmentControl,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	SelectControl,
	TextControl,
	ToggleControl,
	RangeControl,
	BaseControl,
	Flex,
	FlexItem,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import {
	alignLeft,
	alignCenter,
	alignRight,
	alignJustify,
} from '@wordpress/icons';
import { TypographyControl, ColorControl, SpacingControl, AnimationControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
import { buildTextStyle, buildWrapperStyle } from './style-utils';

const TAG_OPTIONS = [
	{ label: 'H1', value: 'h1' },
	{ label: 'H2', value: 'h2' },
	{ label: 'H3', value: 'h3' },
	{ label: 'H4', value: 'h4' },
	{ label: 'H5', value: 'h5' },
	{ label: 'H6', value: 'h6' },
	{ label: 'Paragraph', value: 'p'  },
	{ label: 'Div',       value: 'div' },
];

const ALIGN_OPTIONS = [
	{ value: 'left',    icon: alignLeft,    label: __( 'Left', 'nexus-blocks' ) },
	{ value: 'center',  icon: alignCenter,  label: __( 'Center', 'nexus-blocks' ) },
	{ value: 'right',   icon: alignRight,   label: __( 'Right', 'nexus-blocks' ) },
	{ value: 'justify', icon: alignJustify, label: __( 'Justify', 'nexus-blocks' ) },
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

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId, content, tag, alignment, linkUrl, linkTarget, linkNofollow,
		textColor, enableGradient, gradient, typography,
		enableStroke, strokeWidth, strokeColor,
		enableHighlight, highlightText, highlightShape, highlightColor, highlightStrokeWidth, highlightAnimation,
		margin, padding, animation, cssId, cssClasses,
	} = attributes;

	// Derive the ID from clientId (unique per instance, even after duplication)
	// so cloned blocks self-correct instead of sharing the source block's ID.
	useEffect( () => {
		const expected = `nx-${ clientId.slice( 0, 8 ) }`;
		if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } );
	}, [ clientId ] );

	const Tag = tag || 'h2';

	const blockProps = useBlockProps( {
		className: `nx-heading-wrapper${ cssClasses ? ' ' + cssClasses : '' }`,
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		style: buildWrapperStyle( attributes ),
	} );

	const textStyle = buildTextStyle( attributes );

	// Gradient defaults, resolved once so the control + preview stay in sync.
	const gAngle = gradient?.angle ?? 135;
	const gStart = gradient?.start ?? '#7C3AED';
	const gEnd   = gradient?.end   ?? '#06B6D4';
	const setGradient = ( patch ) => setAttributes( { gradient: { angle: gAngle, start: gStart, end: gEnd, ...gradient, ...patch } } );

	return (
		<>
			{/* Quick-access alignment toolbar above the block. */}
			<BlockControls group="block">
				<AlignmentControl
					value={ alignment }
					onChange={ ( val ) => setAttributes( { alignment: val || 'left' } ) }
				/>
			</BlockControls>

			<InspectorControls>
				<TypographyPanel initialOpen={ true }>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'HTML Tag', 'nexus-blocks' ) }
						help={ __( 'Choose the semantic tag. Use one H1 per page for SEO.', 'nexus-blocks' ) }
						value={ tag }
						options={ TAG_OPTIONS }
						onChange={ ( val ) => setAttributes( { tag: val } ) }
					/>

					<ToggleGroupControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						isBlock
						label={ __( 'Alignment', 'nexus-blocks' ) }
						value={ alignment || 'left' }
						onChange={ ( val ) => setAttributes( { alignment: val } ) }
					>
						{ ALIGN_OPTIONS.map( ( opt ) => (
							<ToggleGroupControlOptionIcon
								key={ opt.value }
								value={ opt.value }
								icon={ opt.icon }
								label={ opt.label }
							/>
						) ) }
					</ToggleGroupControl>

					<TypographyControl
						value={ typography }
						onChange={ ( val ) => setAttributes( { typography: val } ) }
					/>

					{/* Text stroke — toggle, width and colour kept together. */}
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Text Stroke (Outline)', 'nexus-blocks' ) }
						checked={ enableStroke }
						onChange={ ( val ) => setAttributes( { enableStroke: val } ) }
					/>
					{ enableStroke && (
						<>
							<UnitControl
								__next40pxDefaultSize
								label={ __( 'Stroke Width', 'nexus-blocks' ) }
								value={ strokeWidth || '1px' }
								onChange={ ( val ) => setAttributes( { strokeWidth: val } ) }
								units={ [
									{ value: 'px', label: 'px', default: 1 },
									{ value: 'em', label: 'em', default: 0.05 },
								] }
								min={ 0 }
								max={ 20 }
							/>
							<ColorControl
								label={ __( 'Stroke Color', 'nexus-blocks' ) }
								value={ strokeColor }
								onChange={ ( val ) => setAttributes( { strokeColor: val } ) }
							/>
						</>
					) }
				</TypographyPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl
						label={ __( 'Text Color', 'nexus-blocks' ) }
						value={ textColor }
						onChange={ ( val ) => setAttributes( { textColor: val } ) }
					/>

					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Gradient Text', 'nexus-blocks' ) }
						checked={ enableGradient }
						onChange={ ( val ) => setAttributes( { enableGradient: val } ) }
					/>
					{ enableGradient && (
						<>
							<div
								className="nx-gradient-preview"
								aria-hidden="true"
								style={ {
									height: '32px',
									borderRadius: '6px',
									marginBottom: '16px',
									border: '1px solid rgba(0,0,0,0.1)',
									backgroundImage: `linear-gradient(${ gAngle }deg, ${ gStart }, ${ gEnd })`,
								} }
							/>
							<Flex gap={ 2 } align="flex-start">
								<FlexItem style={ { flex: 1 } }>
									<ColorControl
										label={ __( 'Start', 'nexus-blocks' ) }
										value={ gStart }
										onChange={ ( val ) => setGradient( { start: val } ) }
									/>
								</FlexItem>
								<FlexItem style={ { flex: 1 } }>
									<ColorControl
										label={ __( 'End', 'nexus-blocks' ) }
										value={ gEnd }
										onChange={ ( val ) => setGradient( { end: val } ) }
									/>
								</FlexItem>
							</Flex>
							<RangeControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Angle', 'nexus-blocks' ) }
								value={ gAngle }
								onChange={ ( val ) => setGradient( { angle: val } ) }
								min={ 0 } max={ 360 }
							/>
						</>
					) }
				</ColorsAndBackgroundsPanel>

				<MediaAndVectorPanel initialOpen={ false }>
					<ToggleControl
						__nextHasNoMarginBottom
						label={ __( 'Highlight Words', 'nexus-blocks' ) }
						help={ __( 'Draw an SVG shape behind or through chosen words.', 'nexus-blocks' ) }
						checked={ enableHighlight }
						onChange={ ( val ) => setAttributes( { enableHighlight: val } ) }
					/>
					{ enableHighlight && (
						<>
							<TextControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Word(s) to Highlight', 'nexus-blocks' ) }
								help={ __( 'Must match text in the heading exactly.', 'nexus-blocks' ) }
								value={ highlightText }
								onChange={ ( val ) => setAttributes( { highlightText: val } ) }
							/>
							<SelectControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
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
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={ __( 'Shape Thickness', 'nexus-blocks' ) }
								value={ highlightStrokeWidth }
								onChange={ ( val ) => setAttributes( { highlightStrokeWidth: val } ) }
								min={ 1 } max={ 10 }
							/>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ __( 'Animate shape on scroll', 'nexus-blocks' ) }
								checked={ highlightAnimation }
								onChange={ ( val ) => setAttributes( { highlightAnimation: val } ) }
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
				</InteractionsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						type="url"
						label={ __( 'Link URL', 'nexus-blocks' ) }
						placeholder="https://"
						value={ linkUrl }
						onChange={ ( val ) => setAttributes( { linkUrl: val } ) }
					/>
					{ linkUrl && (
						<Flex direction="column" gap={ 1 } style={ { marginBottom: '16px' } }>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ __( 'Open in new tab', 'nexus-blocks' ) }
								checked={ linkTarget }
								onChange={ ( val ) => setAttributes( { linkTarget: val } ) }
							/>
							<ToggleControl
								__nextHasNoMarginBottom
								label={ __( 'Add nofollow', 'nexus-blocks' ) }
								checked={ linkNofollow }
								onChange={ ( val ) => setAttributes( { linkNofollow: val } ) }
							/>
						</Flex>
					) }
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'CSS ID', 'nexus-blocks' ) }
						value={ cssId }
						onChange={ ( val ) => setAttributes( { cssId: val } ) }
					/>
					<TextControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
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
