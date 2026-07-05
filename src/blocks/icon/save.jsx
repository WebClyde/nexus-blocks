import { useBlockProps } from '@wordpress/block-editor';
import { backgroundToStyle, backgroundHoverToCSS } from '../../controls';
export default function Save( { attributes } ) {
	const { uniqueId, iconClass, iconView, iconShape, linkUrl, linkTarget, alignment, tooltipText, tooltipPosition, iconColor, background, iconSize, rotate, border, hoverAnimation, transitionDuration, cssId, cssClasses, animation } = attributes;
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
		...( view === 'stacked' ? { background: 'var(--nx-color-primary,#7C3AED)', ...backgroundToStyle( background ) } : {} ),
		border:     view === 'framed' && border ? `${ border.width ?? '2px' } ${ border.style ?? 'solid' } ${ border.color ?? 'var(--nx-color-primary,#7C3AED)' }` : undefined,
		transform:  rotate ? `rotate(${ rotate }deg)` : undefined,
		transition: `all ${ transitionDuration ?? 300 }ms ease`,
	};
	const bgHoverCss = view === 'stacked' ? backgroundHoverToCSS( uniqueId, background, ' .nexus-icon' ) : '';
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
			{ bgHoverCss && <style dangerouslySetInnerHTML={ { __html: bgHoverCss } } /> }
			{ linkUrl ? ( <a href={ linkUrl } target={ linkTarget ? '_blank' : undefined } rel="noreferrer">{ iconEl }</a> ) : iconEl }
		</div>
	);
}
