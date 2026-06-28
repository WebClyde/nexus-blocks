import { useBlockProps } from '@wordpress/block-editor';
export default function Save( { attributes } ) {
	const { uniqueId, imageUrl, imageAlt, captionText, maxWidth, objectFit, opacity, shapeMask, enableOverlay, overlayColor, overlayText, overlayTextColor, overlayAnimation, openLightbox, linkUrl, linkTarget, cssId, cssClasses, animation } = attributes;
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ),
	} );
	const imgEl = imageUrl ? (
		<img src={ imageUrl } alt={ imageAlt ?? '' } className="nexus-image"
			style={ { opacity: opacity ?? 1, objectFit: objectFit ?? 'cover', clipPath: shapeMask || undefined, display: 'block', width: '100%' } }
		/>
	) : null;
	return (
		<div { ...blockProps }>
			<div className={ `nx-image-block${ enableOverlay ? ' has-overlay' : '' }` } style={ { position: 'relative', display: 'inline-block', maxWidth: maxWidth || undefined } }>
				{ openLightbox && imageUrl ? ( <a href={ imageUrl } className="nx-lightbox" data-type="image">{ imgEl }</a> ) : imgEl }
				{ enableOverlay && (
					<div className={ `nx-image-overlay nx-overlay-${ overlayAnimation ?? 'fadeIn' }` }
						style={ { background: overlayColor ?? 'rgba(0,0,0,0.5)', color: overlayTextColor ?? '#fff' } }
					>
						{ overlayText && <span>{ overlayText }</span> }
					</div>
				) }
			</div>
			{ captionText && <p className="nexus-image-caption">{ captionText }</p> }
		</div>
	);
}
