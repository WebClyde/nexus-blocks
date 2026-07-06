/**
 * Icon Box — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, ToggleControl, RangeControl, ButtonGroup, Button } from '@wordpress/components';
import { TypographyControl, ColorControl, BorderControl, BoxShadowControl, BackgroundControl, backgroundToStyle, backgroundHoverToCSS, SpacingControl, AnimationControl, IconControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
const TAG_OPTIONS = [ 'h2','h3','h4','h5','h6','p','div','span' ].map( ( t ) => ( { label: t.toUpperCase(), value: t } ) );
const ICON_ANIMS  = [ { label: 'None', value: '' }, { label: 'Spin', value: 'spin' }, { label: 'Bounce', value: 'bounce' }, { label: 'Shake', value: 'shake' }, { label: 'Beat', value: 'beat' } ];
const HOVER_EFFECTS = [ { label: 'None', value: '' }, { label: 'Lift', value: 'lift' }, { label: 'Card Flip', value: 'flip' }, { label: 'Border Glow', value: 'glow' }, { label: 'Underline Slide', value: 'underline-slide' } ];
const POSITIONS = [ { label: 'Icon Top', value: 'top' }, { label: 'Icon Left', value: 'left' }, { label: 'Icon Right', value: 'right' } ];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId, iconClass, iconView, iconShape, title, titleTag, description, linkUrl, linkType, buttonText, badgeText, position, numberPrefix,
		iconPrimaryColor, iconSecondaryColor, iconSize, iconPadding, iconSpacing,
		iconBorder, iconBorderRadius, iconBoxShadow, iconRotate, iconHoverAnimation,
		cardBackground, cardBorder, cardBorderRadius, cardBoxShadow, cardPadding, alignment, hoverEffect, transitionDuration,
		titleColor, titleTypography, titleSpacing, descColor, descTypography, numberColor, numberTypography,
		margin, cssId, cssClasses, animation,
	} = attributes;

	useEffect( () => { const expected = `nx-${ clientId.slice( 0, 8 ) }`; if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } ); }, [ clientId ] );

	const Tag = titleTag || 'h3';
	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined } );
	const cardHoverCss = backgroundHoverToCSS( uniqueId, cardBackground, ' .nexus-icon-box' );

	const iconWrapStyle = {
		display:        'inline-flex', alignItems: 'center', justifyContent: 'center',
		background:     iconView === 'stacked' ? ( iconSecondaryColor || 'var(--nx-color-primary,#7C3AED)' ) : undefined,
		border:         iconView === 'framed' ? `2px solid ${ iconSecondaryColor || 'var(--nx-color-primary,#7C3AED)' }` : undefined,
		borderRadius:   iconShape === 'circle' ? '50%' : iconShape === 'rounded' ? '12px' : '0',
		padding:        iconPadding ? `${ iconPadding }px` : undefined,
		transform:      iconRotate ? `rotate(${ iconRotate }deg)` : undefined,
	};

	return (
		<>
			<InspectorControls>
				<MediaAndVectorPanel initialOpen={ true }>
					<IconControl label={ __( 'Icon', 'nexus-blocks' ) } value={ iconClass ?? 'fa-solid fa-star' } onChange={ ( v ) => setAttributes( { iconClass: v } ) } />
					<SelectControl label={ __( 'Icon View', 'nexus-blocks' ) } value={ iconView ?? 'default' } options={ [ { label: 'Default', value: 'default' }, { label: 'Stacked', value: 'stacked' }, { label: 'Framed', value: 'framed' } ] } onChange={ ( v ) => setAttributes( { iconView: v } ) } />
					<SelectControl label={ __( 'Icon Shape', 'nexus-blocks' ) } value={ iconShape ?? 'circle' } options={ [ { label: 'Circle', value: 'circle' }, { label: 'Square', value: 'square' }, { label: 'Rounded', value: 'rounded' } ] } onChange={ ( v ) => setAttributes( { iconShape: v } ) } />
				</MediaAndVectorPanel>

				<TypographyPanel initialOpen={ false }>
					<TextControl label={ __( 'Title', 'nexus-blocks' ) } value={ title ?? '' } onChange={ ( v ) => setAttributes( { title: v } ) } />
					<SelectControl label={ __( 'Title Tag', 'nexus-blocks' ) } value={ titleTag ?? 'h3' } options={ TAG_OPTIONS } onChange={ ( v ) => setAttributes( { titleTag: v } ) } />
					<TextControl label={ __( 'Description', 'nexus-blocks' ) } value={ description ?? '' } onChange={ ( v ) => setAttributes( { description: v } ) } />
					<TextControl label={ __( 'Badge Text', 'nexus-blocks' ) } value={ badgeText ?? '' } onChange={ ( v ) => setAttributes( { badgeText: v } ) } />
					<TextControl label={ __( 'Number Prefix', 'nexus-blocks' ) } value={ numberPrefix ?? '' } onChange={ ( v ) => setAttributes( { numberPrefix: v } ) } />
					<ColorControl label={ __( 'Title Color', 'nexus-blocks' ) } value={ titleColor } onChange={ ( v ) => setAttributes( { titleColor: v } ) } />
					<TypographyControl label={ __( 'Title', 'nexus-blocks' ) } value={ titleTypography } onChange={ ( v ) => setAttributes( { titleTypography: v } ) } />
					<RangeControl label={ __( 'Title Spacing Below (px)', 'nexus-blocks' ) } value={ titleSpacing ?? 8 } onChange={ ( v ) => setAttributes( { titleSpacing: v } ) } min={ 0 } max={ 48 } />
					<ColorControl label={ __( 'Description Color', 'nexus-blocks' ) } value={ descColor } onChange={ ( v ) => setAttributes( { descColor: v } ) } />
					<TypographyControl label={ __( 'Description', 'nexus-blocks' ) } value={ descTypography } onChange={ ( v ) => setAttributes( { descTypography: v } ) } />
				</TypographyPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<SelectControl label={ __( 'Position', 'nexus-blocks' ) } value={ position ?? 'top' } options={ POSITIONS } onChange={ ( v ) => setAttributes( { position: v } ) } />
					<ButtonGroup style={{ marginBottom: '16px', display: 'block' }}>{ [ 'left', 'center', 'right' ].map( ( a ) => <Button key={ a } isSmall variant={ alignment === a ? 'primary' : 'secondary' } onClick={ () => setAttributes( { alignment: a } ) }>{ a.charAt(0).toUpperCase()+a.slice(1) }</Button> ) }</ButtonGroup>
					<RangeControl label={ __( 'Icon Size (px)', 'nexus-blocks' ) } value={ iconSize ?? 40 } onChange={ ( v ) => setAttributes( { iconSize: v } ) } min={ 16 } max={ 120 } />
					<RangeControl label={ __( 'Icon Padding (px)', 'nexus-blocks' ) } value={ iconPadding ?? 16 } onChange={ ( v ) => setAttributes( { iconPadding: v } ) } min={ 0 } max={ 64 } />
					<RangeControl label={ __( 'Icon Spacing (gap)', 'nexus-blocks' ) } value={ iconSpacing ?? 16 } onChange={ ( v ) => setAttributes( { iconSpacing: v } ) } min={ 0 } max={ 64 } />
					<RangeControl label={ __( 'Icon Rotate (deg)', 'nexus-blocks' ) } value={ iconRotate ?? 0 } onChange={ ( v ) => setAttributes( { iconRotate: v } ) } min={ 0 } max={ 360 } />
					<BorderControl value={ cardBorder } onChange={ ( v ) => setAttributes( { cardBorder: v } ) } />
					<TextControl label={ __( 'Border Radius', 'nexus-blocks' ) } value={ cardBorderRadius ?? '' } onChange={ ( v ) => setAttributes( { cardBorderRadius: v } ) } />
					<BoxShadowControl value={ cardBoxShadow } onChange={ ( v ) => setAttributes( { cardBoxShadow: v } ) } />
					<SpacingControl label={ __( 'Card Padding', 'nexus-blocks' ) } value={ cardPadding } onChange={ ( v ) => setAttributes( { cardPadding: v } ) } />
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Icon Color', 'nexus-blocks' ) } value={ iconPrimaryColor } onChange={ ( v ) => setAttributes( { iconPrimaryColor: v } ) } />
					<ColorControl label={ __( 'Icon Background/Border', 'nexus-blocks' ) } value={ iconSecondaryColor } onChange={ ( v ) => setAttributes( { iconSecondaryColor: v } ) } />
					<BackgroundControl value={ cardBackground } onChange={ ( v ) => setAttributes( { cardBackground: v } ) } />
				</ColorsAndBackgroundsPanel>

				<InteractionsPanel initialOpen={ false }>
					<SelectControl label={ __( 'Icon Hover Animation', 'nexus-blocks' ) } value={ iconHoverAnimation ?? '' } options={ ICON_ANIMS } onChange={ ( v ) => setAttributes( { iconHoverAnimation: v } ) } />
					<SelectControl label={ __( 'Card Hover Effect', 'nexus-blocks' ) } value={ hoverEffect ?? '' } options={ HOVER_EFFECTS } onChange={ ( v ) => setAttributes( { hoverEffect: v } ) } />
					<RangeControl label={ __( 'Transition (ms)', 'nexus-blocks' ) } value={ transitionDuration ?? 300 } onChange={ ( v ) => setAttributes( { transitionDuration: v } ) } min={ 50 } max={ 1000 } />
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl label={ __( 'Link URL', 'nexus-blocks' ) } value={ linkUrl ?? '' } onChange={ ( v ) => setAttributes( { linkUrl: v } ) } />
					<SelectControl label={ __( 'Link Type', 'nexus-blocks' ) } value={ linkType ?? 'card' } options={ [ { label: 'Whole Card', value: 'card' }, { label: 'Title Only', value: 'title' }, { label: 'Button', value: 'button' } ] } onChange={ ( v ) => setAttributes( { linkType: v } ) } />
					{ linkType === 'button' && <TextControl label={ __( 'Button Text', 'nexus-blocks' ) } value={ buttonText ?? 'Learn More' } onChange={ ( v ) => setAttributes( { buttonText: v } ) } /> }
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ `nexus-icon-box nx-pos-${ position ?? 'top' }${ hoverEffect ? ` nx-hover-${ hoverEffect }` : '' }` }
					style={ { ...backgroundToStyle( cardBackground ), textAlign: alignment ?? 'left', padding: cardPadding ? `${ cardPadding.top ?? 24 }px ${ cardPadding.right ?? 24 }px ${ cardPadding.bottom ?? 24 }px ${ cardPadding.left ?? 24 }px` : '24px', borderRadius: cardBorderRadius || undefined, transition: `all ${ transitionDuration ?? 300 }ms ease`, display: position !== 'top' ? 'flex' : undefined, gap: iconSpacing ? `${ iconSpacing }px` : '16px', flexDirection: position === 'left' ? 'row' : position === 'right' ? 'row-reverse' : 'column', alignItems: position !== 'top' ? 'flex-start' : undefined } }
				>
					{ cardHoverCss && <style>{ cardHoverCss }</style> }
					{ badgeText && <span className="nx-icon-box-badge">{ badgeText }</span> }
					{ numberPrefix && <span className="nx-number-prefix" style={ { color: numberColor || 'var(--nx-color-primary,#7C3AED)' } }>{ numberPrefix }</span> }
					{ iconClass && (
						<div className={ `nx-icon-wrap${ iconHoverAnimation ? ` nx-icon-hover-${ iconHoverAnimation }` : '' }` } style={ iconWrapStyle }>
							<i className={ iconClass } style={ { fontSize: `${ iconSize ?? 40 }px`, color: iconPrimaryColor || 'var(--nx-color-primary,#7C3AED)' } } />
						</div>
					) }
					<div className="nx-icon-box-content">
						{ title && <Tag className="nx-icon-box-title" style={ { color: titleColor || undefined, marginBottom: titleSpacing ? `${ titleSpacing }px` : undefined } }>{ title }</Tag> }
						{ description && <p className="nx-icon-box-desc" style={ { color: descColor || undefined } }>{ description }</p> }
						{ linkType === 'button' && linkUrl && <a href={ linkUrl } className="nx-icon-box-btn">{ buttonText || 'Learn More' }</a> }
					</div>
				</div>
			</div>
		</>
	);
}
