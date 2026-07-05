/**
 * Advanced Button — deprecations.
 *
 * v2: background was the `background` object (BackgroundControl) but hover
 * background was a separate flat `hoverBgColor` string, applied via JS
 * mouseenter/mouseleave (see frontend.js). Migrated to `background.hover`,
 * which renders as a real CSS :hover rule (BackgroundControl's built-in
 * hover-background feature) and needs no JS.
 *
 * v1: background was three flat attributes (`bgColor`, `bgGradient` raw CSS
 * string, `enableGradient`) plus the same flat `hoverBgColor`. Migrated
 * straight to the current `background` (incl. `.hover`) shape.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { backgroundToStyle } from '../../controls';

const SIZE_PADDING = { xs: '6px 12px', sm: '8px 16px', md: '12px 24px', lg: '16px 32px', xl: '20px 40px' };

const sharedAttrs = {
	uniqueId:           { type: 'string',  default: '' },
	text:               { type: 'string',  default: 'Click Here' },
	linkUrl:            { type: 'string',  default: '' },
	linkTarget:         { type: 'boolean', default: false },
	linkNofollow:       { type: 'boolean', default: false },
	buttonSize:         { type: 'string',  default: 'md' },
	alignment:          { type: 'string',  default: 'left' },
	textColor:          { type: 'string',  default: '' },
	typography:         { type: 'object',  default: {} },
	border:             { type: 'object',  default: {} },
	borderRadius:       { type: 'string',  default: '6px' },
	boxShadow:          { type: 'object',  default: {} },
	hoverTextColor:     { type: 'string',  default: '' },
	hoverBgColor:       { type: 'string',  default: '' },
	hoverAnimation:     { type: 'string',  default: '' },
	transitionDuration: { type: 'number',  default: 300 },
	iconClass:          { type: 'string',  default: '' },
	iconPosition:       { type: 'string',  default: 'before' },
	iconSize:           { type: 'number',  default: 16 },
	iconGap:            { type: 'number',  default: 8 },
	margin:             { type: 'object',  default: {} },
	padding:            { type: 'object',  default: {} },
	animation:          { type: 'object',  default: {} },
	cssId:              { type: 'string',  default: '' },
	cssClasses:         { type: 'string',  default: '' },
};

const v2AttributeSchema = {
	...sharedAttrs,
	background: { type: 'object', default: {} },
};

const v1AttributeSchema = {
	...sharedAttrs,
	bgColor:        { type: 'string',  default: '' },
	bgGradient:     { type: 'string',  default: '' },
	enableGradient: { type: 'boolean', default: false },
};

function baseBtnStyle( { background, textColor, borderRadius, typography, border, iconGap, transitionDuration, btnSize } ) {
	return {
		background:    'var(--nx-color-primary, #7C3AED)',
		...backgroundToStyle( background ),
		color:         textColor || '#fff',
		padding:       SIZE_PADDING[ btnSize ],
		borderRadius:  borderRadius || '6px',
		display:       'inline-flex', alignItems: 'center',
		gap:           iconGap ? `${ iconGap }px` : '8px',
		transition:    `all ${ transitionDuration ?? 300 }ms ease`,
		fontWeight:    typography?.fontWeight || '600',
		fontSize:      typography?.fontSize || undefined,
		border:        border?.style && border?.style !== 'none' ? `${ border.width ?? '2px' } ${ border.style } ${ border.color ?? 'transparent' }` : 'none',
		textDecoration: 'none',
	};
}

function migrateHoverBgColor( attributes, buildBackground ) {
	const { hoverBgColor, ...rest } = attributes;
	const background = buildBackground( attributes );
	if ( hoverBgColor ) background.hover = { type: 'solid', color: hoverBgColor };
	return { ...rest, background };
}

function SaveV2( { attributes } ) {
	const { uniqueId, text, linkUrl, linkTarget, linkNofollow, buttonSize, alignment, textColor, background, typography, border, borderRadius, boxShadow, hoverAnimation, transitionDuration, iconClass, iconPosition, iconSize, iconGap, cssId, cssClasses, animation, hoverTextColor, hoverBgColor } = attributes;
	const btnSize = buttonSize ?? 'md';
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId, id: cssId || undefined, style: { textAlign: alignment ?? 'left' },
		...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ),
	} );
	const btnStyle = baseBtnStyle( { background, textColor, borderRadius, typography, border, iconGap, transitionDuration, btnSize } );
	return (
		<div { ...blockProps }>
			<a href={ linkUrl || '#' } target={ linkTarget ? '_blank' : undefined } rel={ linkNofollow ? 'nofollow noreferrer' : undefined }
				className={ `nexus-button nx-btn-${ btnSize }${ hoverAnimation ? ` nx-hover-${ hoverAnimation }` : '' }` }
				style={ btnStyle } data-hover-text-color={ hoverTextColor || undefined } data-hover-bg-color={ hoverBgColor || undefined }
			>
				{ iconClass && iconPosition !== 'after' && <i className={ `fa ${ iconClass }` } style={ { fontSize: iconSize ? `${ iconSize }px` : undefined } } /> }
				{ text || 'Click Here' }
				{ iconClass && iconPosition === 'after' && <i className={ `fa ${ iconClass }` } style={ { fontSize: iconSize ? `${ iconSize }px` : undefined } } /> }
			</a>
		</div>
	);
}

function SaveV1( { attributes } ) {
	const { uniqueId, text, linkUrl, linkTarget, linkNofollow, buttonSize, alignment, textColor, bgColor, bgGradient, enableGradient, typography, border, borderRadius, boxShadow, hoverAnimation, transitionDuration, iconClass, iconPosition, iconSize, iconGap, cssId, cssClasses, animation, hoverTextColor, hoverBgColor } = attributes;
	const btnSize = buttonSize ?? 'md';
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId, id: cssId || undefined, style: { textAlign: alignment ?? 'left' },
		...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ),
	} );
	const btnStyle = {
		background:    enableGradient ? bgGradient : ( bgColor || 'var(--nx-color-primary, #7C3AED)' ),
		color:         textColor || '#fff',
		padding:       SIZE_PADDING[ btnSize ],
		borderRadius:  borderRadius || '6px',
		display:       'inline-flex', alignItems: 'center',
		gap:           iconGap ? `${ iconGap }px` : '8px',
		transition:    `all ${ transitionDuration ?? 300 }ms ease`,
		fontWeight:    typography?.fontWeight || '600',
		fontSize:      typography?.fontSize || undefined,
		border:        border?.style && border?.style !== 'none' ? `${ border.width ?? '2px' } ${ border.style } ${ border.color ?? 'transparent' }` : 'none',
		textDecoration: 'none',
	};
	return (
		<div { ...blockProps }>
			<a href={ linkUrl || '#' } target={ linkTarget ? '_blank' : undefined } rel={ linkNofollow ? 'nofollow noreferrer' : undefined }
				className={ `nexus-button nx-btn-${ btnSize }${ hoverAnimation ? ` nx-hover-${ hoverAnimation }` : '' }` }
				style={ btnStyle } data-hover-text-color={ hoverTextColor || undefined } data-hover-bg-color={ hoverBgColor || undefined }
			>
				{ iconClass && iconPosition !== 'after' && <i className={ `fa ${ iconClass }` } style={ { fontSize: iconSize ? `${ iconSize }px` : undefined } } /> }
				{ text || 'Click Here' }
				{ iconClass && iconPosition === 'after' && <i className={ `fa ${ iconClass }` } style={ { fontSize: iconSize ? `${ iconSize }px` : undefined } } /> }
			</a>
		</div>
	);
}

export default [
	{
		attributes: v2AttributeSchema,
		save: SaveV2,
		migrate( attributes ) {
			return migrateHoverBgColor( attributes, ( attrs ) => attrs.background ?? {} );
		},
	},
	{
		attributes: v1AttributeSchema,
		save: SaveV1,
		migrate( attributes ) {
			return migrateHoverBgColor( attributes, ( { bgColor, bgGradient, enableGradient } ) => {
				if ( enableGradient && bgGradient ) {
					return { type: 'gradient', gradientType: 'linear', gradientStart: bgColor || '#7C3AED', gradientEnd: '#06B6D4' };
				}
				if ( bgColor ) return { type: 'solid', color: bgColor };
				return {};
			} );
		},
	},
];
