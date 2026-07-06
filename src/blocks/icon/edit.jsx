/**
 * Icon Block — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, RangeControl, ToggleControl, ButtonGroup, Button } from '@wordpress/components';
import { ColorControl, BackgroundControl, backgroundToStyle, backgroundHoverToCSS, BorderControl, BoxShadowControl, SpacingControl, AnimationControl, IconControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
const ICON_VIEWS = [
	{ label: 'Default (No BG)', value: 'default' },
	{ label: 'Stacked (Solid BG)', value: 'stacked' },
	{ label: 'Framed (Border)', value: 'framed' },
];
const ICON_SHAPES = [
	{ label: 'Circle', value: 'circle' },
	{ label: 'Square', value: 'square' },
	{ label: 'Rounded Square', value: 'rounded' },
];
const HOVER_ANIMS = [
	{ label: 'None', value: '' }, { label: 'Grow', value: 'grow' }, { label: 'Shrink', value: 'shrink' },
	{ label: 'Pulse', value: 'pulse' }, { label: 'Bounce', value: 'bounce' },
	{ label: 'Rotate', value: 'rotate' }, { label: 'Wobble', value: 'wobble' }, { label: 'Float', value: 'float' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId, iconClass, iconView, iconShape, linkUrl, linkTarget, alignment,
		tooltipText, tooltipPosition,
		iconColor, iconHoverColor, background, iconSize, padding,
		rotate, border, borderRadius, boxShadow, hoverAnimation, transitionDuration,
		margin, cssId, cssClasses, animation,
	} = attributes;

	useEffect( () => { const expected = `nx-${ clientId.slice( 0, 8 ) }`; if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } ); }, [ clientId ] );

	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined, style: { textAlign: alignment ?? 'center' } } );

	const view    = iconView ?? 'default';
	const shape   = iconShape ?? 'circle';
	const size    = iconSize ?? 48;
	const pad     = padding?.top ? parseInt( padding.top ) : 16;
	const shapeRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? '12px' : '0';
	const bgHoverCss  = view === 'stacked' ? backgroundHoverToCSS( uniqueId, background, ' .nexus-icon' ) : '';

	const wrapStyle = {
		display:        'inline-flex',
		alignItems:     'center',
		justifyContent: 'center',
		width:          view !== 'default' ? `${ size + pad * 2 }px` : undefined,
		height:         view !== 'default' ? `${ size + pad * 2 }px` : undefined,
		borderRadius:   view !== 'default' ? shapeRadius : undefined,
		...( view === 'stacked' ? { background: 'var(--nx-color-primary,#7C3AED)', ...backgroundToStyle( background ) } : {} ),
		border:         view === 'framed' && border ? `${ border.width ?? '2px' } ${ border.style ?? 'solid' } ${ border.color ?? 'var(--nx-color-primary,#7C3AED)' }` : undefined,
		transform:      rotate ? `rotate(${ rotate }deg)` : undefined,
		transition:     `all ${ transitionDuration ?? 300 }ms ease`,
	};
	const iconStyle = { fontSize: `${ size }px`, color: iconColor || 'var(--nx-color-primary,#7C3AED)' };

	return (
		<>
			<InspectorControls>
				<MediaAndVectorPanel initialOpen={ true }>
					<IconControl label={ __( 'Icon', 'nexus-blocks' ) } value={ iconClass ?? 'fa-solid fa-star' } onChange={ ( v ) => setAttributes( { iconClass: v } ) } />
					<SelectControl label={ __( 'View', 'nexus-blocks' ) } value={ view } options={ ICON_VIEWS } onChange={ ( v ) => setAttributes( { iconView: v } ) } />
					{ view !== 'default' && <SelectControl label={ __( 'Shape', 'nexus-blocks' ) } value={ shape } options={ ICON_SHAPES } onChange={ ( v ) => setAttributes( { iconShape: v } ) } /> }
				</MediaAndVectorPanel>

				<TypographyPanel initialOpen={ false }>
					<ButtonGroup style={{ marginBottom: '16px', display: 'block' }}>
						{ [ 'left', 'center', 'right' ].map( ( a ) => (
							<Button key={ a } isSmall variant={ alignment === a ? 'primary' : 'secondary' } onClick={ () => setAttributes( { alignment: a } ) }>{ a.charAt(0).toUpperCase() + a.slice(1) }</Button>
						) ) }
					</ButtonGroup>
					<TextControl label={ __( 'Tooltip Text', 'nexus-blocks' ) } value={ tooltipText ?? '' } onChange={ ( v ) => setAttributes( { tooltipText: v } ) } />
					{ tooltipText && <SelectControl label={ __( 'Tooltip Position', 'nexus-blocks' ) } value={ tooltipPosition ?? 'top' } options={ [ { label: 'Top', value: 'top' }, { label: 'Bottom', value: 'bottom' }, { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' } ] } onChange={ ( v ) => setAttributes( { tooltipPosition: v } ) } /> }
				</TypographyPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<RangeControl label={ __( 'Icon Size (px)', 'nexus-blocks' ) } value={ size } onChange={ ( v ) => setAttributes( { iconSize: v } ) } min={ 12 } max={ 200 } />
					<RangeControl label={ __( 'Rotate (deg)', 'nexus-blocks' ) } value={ rotate ?? 0 } onChange={ ( v ) => setAttributes( { rotate: v } ) } min={ 0 } max={ 360 } />
					<SpacingControl label={ __( 'Padding', 'nexus-blocks' ) } value={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
					<BorderControl value={ border } onChange={ ( v ) => setAttributes( { border: v } ) } />
					<BoxShadowControl value={ boxShadow } onChange={ ( v ) => setAttributes( { boxShadow: v } ) } />
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Icon Color', 'nexus-blocks' ) } value={ iconColor } onChange={ ( v ) => setAttributes( { iconColor: v } ) } />
					<ColorControl label={ __( 'Icon Hover Color', 'nexus-blocks' ) } value={ iconHoverColor } onChange={ ( v ) => setAttributes( { iconHoverColor: v } ) } />
					{ view !== 'default' && (
						<BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
					) }
				</ColorsAndBackgroundsPanel>

				<InteractionsPanel initialOpen={ false }>
					<SelectControl label={ __( 'Hover Animation', 'nexus-blocks' ) } value={ hoverAnimation ?? '' } options={ HOVER_ANIMS } onChange={ ( v ) => setAttributes( { hoverAnimation: v } ) } />
					<RangeControl label={ __( 'Transition (ms)', 'nexus-blocks' ) } value={ transitionDuration ?? 300 } onChange={ ( v ) => setAttributes( { transitionDuration: v } ) } min={ 50 } max={ 1000 } />
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl label={ __( 'Link URL', 'nexus-blocks' ) } value={ linkUrl ?? '' } onChange={ ( v ) => setAttributes( { linkUrl: v } ) } />
					{ linkUrl && <ToggleControl label={ __( 'Open in new tab', 'nexus-blocks' ) } checked={ !! linkTarget } onChange={ ( v ) => setAttributes( { linkTarget: v } ) } /> }
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>
			<div { ...blockProps }>
				<div className={ `nexus-icon nx-icon-${ view }${ hoverAnimation ? ` nx-hover-${ hoverAnimation }` : '' }` }
					style={ wrapStyle }
					{ ...(tooltipText ? { 'data-tooltip': tooltipText, 'data-tooltip-pos': tooltipPosition ?? 'top' } : {} ) }
				>
					{ bgHoverCss && <style>{ bgHoverCss }</style> }
					{ iconClass
						? <i className={ iconClass } style={ iconStyle } />
						: <span style={ { ...iconStyle, fontFamily: 'monospace' } }>★</span>
					}
				</div>
			</div>
		</>
	);
}
