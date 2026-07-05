/**
 * Icon — deprecations.
 *
 * v1: background was two flat, largely-dead attributes — `bgColor` (only
 * applied for the "stacked" view) and `bgHoverColor` (set in the sidebar but
 * never actually rendered anywhere). Migrated to the shared `background`
 * object (BackgroundControl), including a working hover background this
 * time via `background.hover`.
 */
import { useBlockProps } from '@wordpress/block-editor';

const v1AttributeSchema = {
	uniqueId:           { type: 'string',  default: '' },
	iconClass:          { type: 'string',  default: 'fa-solid fa-star' },
	iconView:           { type: 'string',  default: 'default' },
	iconShape:          { type: 'string',  default: 'circle' },
	linkUrl:            { type: 'string',  default: '' },
	linkTarget:         { type: 'boolean', default: false },
	alignment:          { type: 'string',  default: 'center' },
	tooltipText:        { type: 'string',  default: '' },
	tooltipPosition:    { type: 'string',  default: 'top' },
	iconColor:          { type: 'string',  default: '' },
	iconHoverColor:     { type: 'string',  default: '' },
	bgColor:            { type: 'string',  default: '' },
	bgHoverColor:       { type: 'string',  default: '' },
	iconSize:           { type: 'number',  default: 48 },
	padding:            { type: 'object',  default: {} },
	rotate:             { type: 'number',  default: 0 },
	border:             { type: 'object',  default: {} },
	borderRadius:       { type: 'string',  default: '' },
	boxShadow:          { type: 'object',  default: {} },
	hoverAnimation:     { type: 'string',  default: '' },
	transitionDuration: { type: 'number',  default: 300 },
	margin:             { type: 'object',  default: {} },
	animation:          { type: 'object',  default: {} },
	cssId:              { type: 'string',  default: '' },
	cssClasses:         { type: 'string',  default: '' },
};

function SaveV1( { attributes } ) {
	const { uniqueId, iconClass, iconView, iconShape, linkUrl, linkTarget, alignment, tooltipText, tooltipPosition, iconColor, bgColor, iconSize, rotate, border, hoverAnimation, transitionDuration, cssId, cssClasses, animation } = attributes;
	const view = iconView ?? 'default'; const shape = iconShape ?? 'circle'; const size = iconSize ?? 48;
	const shapeRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? '12px' : '0';
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId, id: cssId || undefined, style: { textAlign: alignment ?? 'center' },
		...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ),
	} );
	const wrapStyle = {
		display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
		width:  view !== 'default' ? `${ size + 32 }px` : undefined,
		height: view !== 'default' ? `${ size + 32 }px` : undefined,
		borderRadius: view !== 'default' ? shapeRadius : undefined,
		background: view === 'stacked' ? ( bgColor || 'var(--nx-color-primary,#7C3AED)' ) : undefined,
		border:     view === 'framed' && border ? `${ border.width ?? '2px' } ${ border.style ?? 'solid' } ${ border.color ?? 'var(--nx-color-primary,#7C3AED)' }` : undefined,
		transform:  rotate ? `rotate(${ rotate }deg)` : undefined,
		transition: `all ${ transitionDuration ?? 300 }ms ease`,
	};
	const iconEl = (
		<div className={ `nexus-icon nx-icon-${ view }${ hoverAnimation ? ` nx-hover-${ hoverAnimation }` : '' }` }
			style={ wrapStyle }
			{ ...(tooltipText ? { 'data-tooltip': tooltipText, 'data-tooltip-pos': tooltipPosition ?? 'top' } : {} ) }
		>
			{ iconClass ? <i className={ iconClass } style={ { fontSize: `${ size }px`, color: iconColor || 'var(--nx-color-primary,#7C3AED)' } } /> : <span>★</span> }
		</div>
	);
	return (
		<div { ...blockProps }>
			{ linkUrl ? ( <a href={ linkUrl } target={ linkTarget ? '_blank' : undefined } rel="noreferrer">{ iconEl }</a> ) : iconEl }
		</div>
	);
}

export default [
	{
		attributes: v1AttributeSchema,
		save: SaveV1,
		migrate( attributes ) {
			const { bgColor, bgHoverColor, ...rest } = attributes;
			const background = bgColor ? { type: 'solid', color: bgColor } : {};
			if ( bgHoverColor ) background.hover = { type: 'solid', color: bgHoverColor };
			return { ...rest, background };
		},
	},
];
