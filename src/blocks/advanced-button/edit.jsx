/**
 * Advanced Button — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, ToggleControl, RangeControl, ButtonGroup, Button } from '@wordpress/components';
import { generateUniqueId } from '../../hooks/useStyleOutput';
import { TypographyControl, ColorControl, BorderControl, BoxShadowControl, BackgroundControl, backgroundToStyle, backgroundHoverToCSS, SpacingControl, AnimationControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
const BTN_SIZES = [
	{ label: 'XS', value: 'xs' }, { label: 'SM', value: 'sm' },
	{ label: 'MD', value: 'md' }, { label: 'LG', value: 'lg' }, { label: 'XL', value: 'xl' },
];
const BTN_HOVER_ANIMS = [
	{ label: 'None', value: '' }, { label: 'Grow', value: 'grow' }, { label: 'Shrink', value: 'shrink' },
	{ label: 'Pulse', value: 'pulse' }, { label: 'Bounce', value: 'bounce' }, { label: 'Float', value: 'float' },
];
const SIZE_PADDING = { xs: '6px 12px', sm: '8px 16px', md: '12px 24px', lg: '16px 32px', xl: '20px 40px' };

export default function Edit( { attributes, setAttributes } ) {
	const {
		uniqueId, text, linkUrl, linkTarget, linkNofollow, buttonSize, alignment,
		textColor, background, typography,
		border, borderRadius, boxShadow,
		hoverTextColor, hoverAnimation, transitionDuration,
		iconClass, iconPosition, iconSize, iconGap,
		margin, padding, cssId, cssClasses, animation,
	} = attributes;

	useEffect( () => { if ( ! uniqueId ) setAttributes( { uniqueId: generateUniqueId() } ); }, [] );

	const btnSize  = buttonSize ?? 'md';
	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined, style: { textAlign: alignment ?? 'left' } } );

	const btnStyle = {
		background:    'var(--nx-color-primary, #7C3AED)',
		...backgroundToStyle( background ),
		color:         textColor || '#fff',
		padding:       SIZE_PADDING[ btnSize ],
		borderRadius:  borderRadius || '6px',
		display:       'inline-flex',
		alignItems:    'center',
		gap:           iconGap ? `${ iconGap }px` : '8px',
		transition:    `all ${ transitionDuration ?? 300 }ms ease`,
		fontWeight:    typography?.fontWeight || '600',
		fontSize:      typography?.fontSize || undefined,
		border:        border?.style && border?.style !== 'none' ? `${ border.width ?? '2px' } ${ border.style } ${ border.color ?? 'transparent' }` : 'none',
		cursor:        'pointer',
		textDecoration: 'none',
	};
	const bgHoverCss = backgroundHoverToCSS( uniqueId, background, ' .nexus-button' );

	return (
		<>
			<InspectorControls>
				<TypographyPanel initialOpen={ true }>
					<TextControl label={ __( 'Button Text', 'nexus-blocks' ) } value={ text ?? 'Click Here' } onChange={ ( v ) => setAttributes( { text: v } ) } />
					<ButtonGroup style={{ marginBottom: '16px', display: 'block' }}>
						{ [ 'left', 'center', 'right' ].map( ( a ) => (
							<Button key={ a } isSmall variant={ alignment === a ? 'primary' : 'secondary' } onClick={ () => setAttributes( { alignment: a } ) }>{ a.charAt(0).toUpperCase() + a.slice(1) }</Button>
						) ) }
					</ButtonGroup>
					<TypographyControl value={ typography } onChange={ ( v ) => setAttributes( { typography: v } ) } />
				</TypographyPanel>

				<MediaAndVectorPanel initialOpen={ false }>
					<TextControl label={ __( 'Icon Class (e.g. fa-arrow-right)', 'nexus-blocks' ) } value={ iconClass ?? '' } onChange={ ( v ) => setAttributes( { iconClass: v } ) } />
					{ iconClass && (
						<>
							<SelectControl label={ __( 'Icon Position', 'nexus-blocks' ) } value={ iconPosition ?? 'before' } options={ [ { label: 'Before', value: 'before' }, { label: 'After', value: 'after' } ] } onChange={ ( v ) => setAttributes( { iconPosition: v } ) } />
							<RangeControl label={ __( 'Icon Size (px)', 'nexus-blocks' ) } value={ iconSize ?? 16 } onChange={ ( v ) => setAttributes( { iconSize: v } ) } min={ 10 } max={ 48 } />
							<RangeControl label={ __( 'Icon Gap (px)', 'nexus-blocks' ) } value={ iconGap ?? 8 } onChange={ ( v ) => setAttributes( { iconGap: v } ) } min={ 0 } max={ 32 } />
						</>
					) }
				</MediaAndVectorPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<SelectControl label={ __( 'Size', 'nexus-blocks' ) } value={ btnSize } options={ BTN_SIZES } onChange={ ( v ) => setAttributes( { buttonSize: v } ) } />
					<BorderControl value={ border } onChange={ ( v ) => setAttributes( { border: v } ) } showRadius={ false } />
					<TextControl label={ __( 'Border Radius', 'nexus-blocks' ) } value={ borderRadius ?? '6px' } onChange={ ( v ) => setAttributes( { borderRadius: v } ) } />
					<BoxShadowControl value={ boxShadow } onChange={ ( v ) => setAttributes( { boxShadow: v } ) } />
					<SpacingControl label={ __( 'Padding', 'nexus-blocks' ) } value={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Text Color', 'nexus-blocks' ) } value={ textColor } onChange={ ( v ) => setAttributes( { textColor: v } ) } />
					<BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
					<ColorControl label={ __( 'Hover Text Color', 'nexus-blocks' ) } value={ hoverTextColor } onChange={ ( v ) => setAttributes( { hoverTextColor: v } ) } />
				</ColorsAndBackgroundsPanel>

				<InteractionsPanel initialOpen={ false }>
					<SelectControl label={ __( 'Hover Animation', 'nexus-blocks' ) } value={ hoverAnimation ?? '' } options={ BTN_HOVER_ANIMS } onChange={ ( v ) => setAttributes( { hoverAnimation: v } ) } />
					<RangeControl label={ __( 'Transition (ms)', 'nexus-blocks' ) } value={ transitionDuration ?? 300 } onChange={ ( v ) => setAttributes( { transitionDuration: v } ) } min={ 50 } max={ 1000 } />
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl label={ __( 'Link URL', 'nexus-blocks' ) } value={ linkUrl ?? '' } onChange={ ( v ) => setAttributes( { linkUrl: v } ) } />
					<ToggleControl label={ __( 'Open in new tab', 'nexus-blocks' ) } checked={ !! linkTarget } onChange={ ( v ) => setAttributes( { linkTarget: v } ) } />
					<ToggleControl label={ __( 'Nofollow', 'nexus-blocks' ) } checked={ !! linkNofollow } onChange={ ( v ) => setAttributes( { linkNofollow: v } ) } />
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>

			<div { ...blockProps }>
				{ bgHoverCss && <style>{ bgHoverCss }</style> }
				<a href={ linkUrl || '#' } className={ `nexus-button nx-btn-${ btnSize }${ hoverAnimation ? ` nx-hover-${ hoverAnimation }` : '' }` }
					style={ btnStyle }
					data-hover-text-color={ hoverTextColor || undefined }
				>
					{ iconClass && iconPosition !== 'after' && <i className={ `fa ${ iconClass }` } style={ { fontSize: iconSize ? `${ iconSize }px` : undefined } } /> }
					{ text || __( 'Click Here', 'nexus-blocks' ) }
					{ iconClass && iconPosition === 'after' && <i className={ `fa ${ iconClass }` } style={ { fontSize: iconSize ? `${ iconSize }px` : undefined } } /> }
				</a>
			</div>
		</>
	);
}
