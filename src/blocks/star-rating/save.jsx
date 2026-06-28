import { useBlockProps } from '@wordpress/block-editor';
const ICON_MAP = { star: '★', heart: '♥', circle: '●', diamond: '◆' };
function Stars( { rating, scale, iconType, iconSize, filledColor, emptyColor } ) {
	const icons = [];
	for ( let i = 1; i <= ( scale ?? 5 ); i++ ) {
		const filled = i <= ( rating ?? 4 );
		icons.push( <span key={ i } style={ { color: filled ? ( filledColor || '#F59E0B' ) : ( emptyColor || '#D1D5DB' ), fontSize: `${ iconSize ?? 24 }px` } }>{ ICON_MAP[ iconType ?? 'star' ] }</span> );
	}
	return <span className="nx-star-icons">{ icons }</span>;
}
export default function Save( { attributes } ) {
	const { uniqueId, scale, rating, iconType, title, titlePosition, alignment, iconSize, iconSpacing, filledColor, emptyColor, titleColor, titleGap, cssId, cssClasses, animation } = attributes;
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, ...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ) } );
	const isHorizontal = [ 'left', 'right' ].includes( titlePosition ?? 'below' );
	return (
		<div { ...blockProps }>
			<div className={ `nexus-star-rating${ cssClasses ? ' ' + cssClasses : '' }` }
				style={ { textAlign: alignment ?? 'left', display: isHorizontal ? 'flex' : undefined, alignItems: isHorizontal ? 'center' : undefined, gap: isHorizontal ? `${ titleGap ?? 8 }px` : undefined } }
				role="img" aria-label={ `Rating: ${ rating ?? 4 } out of ${ scale ?? 5 }` }
			>
				{ title && titlePosition === 'above' && <p className="nx-rating-title" style={ { color: titleColor || undefined, marginBottom: `${ titleGap ?? 8 }px` } }>{ title }</p> }
				{ title && isHorizontal && <span className="nx-rating-title" style={ { color: titleColor || undefined } }>{ title }</span> }
				<Stars rating={ rating ?? 4 } scale={ scale ?? 5 } iconType={ iconType ?? 'star' } iconSize={ iconSize ?? 24 } filledColor={ filledColor } emptyColor={ emptyColor } />
				{ title && titlePosition === 'below' && <p className="nx-rating-title" style={ { color: titleColor || undefined, marginTop: `${ titleGap ?? 8 }px` } }>{ title }</p> }
			</div>
		</div>
	);
}
