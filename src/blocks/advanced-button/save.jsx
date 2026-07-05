import { useBlockProps } from '@wordpress/block-editor';
import { backgroundToStyle, backgroundHoverToCSS } from '../../controls';
const SIZE_PADDING = { xs: '6px 12px', sm: '8px 16px', md: '12px 24px', lg: '16px 32px', xl: '20px 40px' };
export default function Save( { attributes } ) {
	const { uniqueId, text, linkUrl, linkTarget, linkNofollow, buttonSize, alignment, textColor, background, typography, border, borderRadius, boxShadow, hoverAnimation, transitionDuration, iconClass, iconPosition, iconSize, iconGap, cssId, cssClasses, animation, hoverTextColor } = attributes;
	const btnSize = buttonSize ?? 'md';
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId, id: cssId || undefined, style: { textAlign: alignment ?? 'left' },
		...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ),
	} );
	const btnStyle = {
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
	const bgHoverCss = backgroundHoverToCSS( uniqueId, background, ' .nexus-button' );
	return (
		<div { ...blockProps }>
			{ bgHoverCss && <style dangerouslySetInnerHTML={ { __html: bgHoverCss } } /> }
			<a href={ linkUrl || '#' } target={ linkTarget ? '_blank' : undefined } rel={ linkNofollow ? 'nofollow noreferrer' : undefined }
				className={ `nexus-button nx-btn-${ btnSize }${ hoverAnimation ? ` nx-hover-${ hoverAnimation }` : '' }` }
				style={ btnStyle } data-hover-text-color={ hoverTextColor || undefined }
			>
				{ iconClass && iconPosition !== 'after' && <i className={ `fa ${ iconClass }` } style={ { fontSize: iconSize ? `${ iconSize }px` : undefined } } /> }
				{ text || 'Click Here' }
				{ iconClass && iconPosition === 'after' && <i className={ `fa ${ iconClass }` } style={ { fontSize: iconSize ? `${ iconSize }px` : undefined } } /> }
			</a>
		</div>
	);
}
