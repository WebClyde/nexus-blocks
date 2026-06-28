import { useBlockProps } from '@wordpress/block-editor';
export default function Save( { attributes } ) {
	const { uniqueId, startNumber, endNumber, prefix, suffix, duration, separator, decimalPlaces, animationType, title, titlePosition, iconClass, numberColor, numberTypography, prefixSuffixColor, titleColor, titleSpacing, iconColor, iconSize, iconSpacing, borderRadius, alignment, cssId, cssClasses, animation } = attributes;
	const end = endNumber ?? 1000;
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, ...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ) } );
	return (
		<div { ...blockProps }>
			<div className={ `nexus-counter nx-anim-${ animationType ?? 'countup' }${ cssClasses ? ' ' + cssClasses : '' }` }
				data-start={ startNumber ?? 0 } data-end={ end } data-duration={ duration ?? 2000 } data-separator={ separator ?? '' } data-decimals={ decimalPlaces ?? 0 }
				style={ { textAlign: alignment ?? 'center', padding: '24px', borderRadius: borderRadius || undefined } }
			>
				{ iconClass && <i className={ iconClass } style={ { fontSize: `${ iconSize ?? 40 }px`, color: iconColor || 'var(--nx-color-primary,#7C3AED)', display: 'block', marginBottom: `${ iconSpacing ?? 12 }px` } } /> }
				{ title && titlePosition === 'above' && <p className="nx-counter-title" style={ { color: titleColor || undefined, marginBottom: `${ titleSpacing ?? 8 }px` } }>{ title }</p> }
				<div className="nx-counter-number" style={ { color: numberColor || 'var(--nx-color-primary,#7C3AED)', fontSize: numberTypography?.fontSize || '3rem', fontWeight: numberTypography?.fontWeight || '700' } }>
					{ prefix && <span className="nx-counter-prefix" style={ { color: prefixSuffixColor || undefined } }>{ prefix }</span> }
					<span className="nx-counter-value" aria-live="polite">{ startNumber ?? 0 }</span>
					{ suffix && <span className="nx-counter-suffix" style={ { color: prefixSuffixColor || undefined } }>{ suffix }</span> }
				</div>
				{ title && titlePosition !== 'above' && <p className="nx-counter-title" style={ { color: titleColor || undefined, marginTop: `${ titleSpacing ?? 8 }px` } }>{ title }</p> }
			</div>
		</div>
	);
}
