import { useBlockProps } from '@wordpress/block-editor';
export default function Save( { attributes } ) {
	const { uniqueId, imageUrl, imageAlt, title, titleTag: Tag = 'h3', description, linkUrl, linkType, buttonText, position, imageWidth, imageMaxWidth, imageHeight, objectFit, imageSpacing, imageBorderRadius, imgHoverAnimation, hoverEffect, transitionDuration, titleColor, titleSpacing, descColor, cssId, cssClasses, animation } = attributes;
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, ...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ) } );
	const inner = (
		<div className={ `nexus-image-box nx-pos-${ position ?? 'top' }${ hoverEffect ? ` nx-hover-${ hoverEffect }` : '' }` } style={ { display: position !== 'top' ? 'flex' : undefined, gap: `${ imageSpacing ?? 16 }px`, flexDirection: position === 'left' ? 'row' : position === 'right' ? 'row-reverse' : 'column', transition: `all ${ transitionDuration ?? 300 }ms ease` } }>
			<div className={ `nx-image-box-img${ imgHoverAnimation ? ` nx-img-hover-${ imgHoverAnimation }` : '' }` } style={ { flex: position !== 'top' ? '0 0 auto' : undefined, width: imageWidth || undefined, maxWidth: imageMaxWidth || undefined } }>
				{ imageUrl && <img src={ imageUrl } alt={ imageAlt ?? '' } style={ { width: '100%', height: imageHeight || undefined, objectFit: objectFit ?? 'cover', borderRadius: imageBorderRadius || undefined } } /> }
			</div>
			<div className="nx-image-box-content">
				{ title && <Tag className="nx-image-box-title" style={ { color: titleColor || undefined, marginBottom: titleSpacing ? `${ titleSpacing }px` : undefined } }>{ title }</Tag> }
				{ description && <p className="nx-image-box-desc" style={ { color: descColor || undefined } }>{ description }</p> }
				{ linkType === 'button' && linkUrl && <a href={ linkUrl } className="nx-image-box-btn">{ buttonText || 'Learn More' }</a> }
			</div>
		</div>
	);
	return (
		<div { ...blockProps }> { linkType === 'card' && linkUrl ? <a href={ linkUrl } className="nx-image-box-card-link">{ inner }</a> : inner } </div>
	);
}
