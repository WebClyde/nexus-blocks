/**
 * Icon Box — deprecations.
 *
 * v1: cardBackground and cardPadding were selectable in the sidebar but never
 * applied to the rendered card (padding was hardcoded to 24px, background was
 * dropped entirely). Kept here so previously published posts don't get flagged
 * as invalid once the save output starts honoring those attributes.
 */
import { useBlockProps } from '@wordpress/block-editor';
import metadata from './block.json';

function SaveV1( { attributes } ) {
	const { uniqueId, iconClass, iconView, iconShape, title, titleTag: Tag = 'h3', description, linkUrl, linkType, buttonText, badgeText, numberPrefix, iconPrimaryColor, iconSecondaryColor, iconSize, iconPadding, iconSpacing, iconRotate, iconHoverAnimation, cardBorderRadius, hoverEffect, transitionDuration, titleColor, titleSpacing, descColor, alignment, position, cssId, cssClasses, animation } = attributes;
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, ...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ) } );
	const iconWrapStyle = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: iconView === 'stacked' ? ( iconSecondaryColor || 'var(--nx-color-primary,#7C3AED)' ) : undefined, border: iconView === 'framed' ? `2px solid ${ iconSecondaryColor || 'var(--nx-color-primary,#7C3AED)' }` : undefined, borderRadius: iconShape === 'circle' ? '50%' : iconShape === 'rounded' ? '12px' : '0', padding: iconPadding ? `${ iconPadding }px` : undefined, transform: iconRotate ? `rotate(${ iconRotate }deg)` : undefined };
	const boxStyle = { textAlign: alignment ?? 'left', padding: '24px', borderRadius: cardBorderRadius || undefined, transition: `all ${ transitionDuration ?? 300 }ms ease`, display: position !== 'top' ? 'flex' : undefined, gap: iconSpacing ? `${ iconSpacing }px` : '16px', flexDirection: position === 'left' ? 'row' : position === 'right' ? 'row-reverse' : 'column', alignItems: position !== 'top' ? 'flex-start' : undefined };
	const inner = (
		<div className={ `nexus-icon-box nx-pos-${ position ?? 'top' }${ hoverEffect ? ` nx-hover-${ hoverEffect }` : '' }` } style={ boxStyle }>
			{ badgeText && <span className="nx-icon-box-badge">{ badgeText }</span> }
			{ numberPrefix && <span className="nx-number-prefix">{ numberPrefix }</span> }
			{ iconClass && <div className={ `nx-icon-wrap${ iconHoverAnimation ? ` nx-icon-hover-${ iconHoverAnimation }` : '' }` } style={ iconWrapStyle }><i className={ iconClass } style={ { fontSize: `${ iconSize ?? 40 }px`, color: iconPrimaryColor || 'var(--nx-color-primary,#7C3AED)' } } /></div> }
			<div className="nx-icon-box-content">
				{ title && <Tag className="nx-icon-box-title" style={ { color: titleColor || undefined, marginBottom: titleSpacing ? `${ titleSpacing }px` : undefined } }>{ title }</Tag> }
				{ description && <p className="nx-icon-box-desc" style={ { color: descColor || undefined } }>{ description }</p> }
				{ linkType === 'button' && linkUrl && <a href={ linkUrl } className="nx-icon-box-btn">{ buttonText || 'Learn More' }</a> }
			</div>
		</div>
	);
	return (
		<div { ...blockProps }>
			{ linkType === 'card' && linkUrl ? <a href={ linkUrl } className="nx-icon-box-card-link">{ inner }</a> : inner }
		</div>
	);
}

export default [
	{
		attributes: metadata.attributes,
		save: SaveV1,
	},
];
