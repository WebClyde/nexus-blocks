import { useBlockProps } from '@wordpress/block-editor';
export default function Save( { attributes } ) {
	const { uniqueId, items, layout, alignment, itemSpacing, showDivider, dividerStyle, dividerWeight, dividerColor, defaultIconColor, iconSize, iconBgColor, iconBorderRadius, iconPadding, iconTextGap, textColor, cssId, cssClasses, animation } = attributes;
	const listItems = items ?? [];
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, ...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ) } );
	return (
		<div { ...blockProps }>
			<ul className={ `nexus-icon-list nx-list-${ layout ?? 'vertical' }${ cssClasses ? ' ' + cssClasses : '' }` }
				style={ { listStyle: 'none', padding: 0, margin: 0, display: layout === 'horizontal' ? 'flex' : undefined, flexWrap: 'wrap', gap: layout === 'horizontal' ? `${ itemSpacing ?? 12 }px` : undefined, textAlign: alignment ?? 'left' } }
			>
				{ listItems.map( ( item, idx ) => (
					<li key={ idx } className="nx-icon-list-item" style={ { marginBottom: layout !== 'horizontal' ? `${ itemSpacing ?? 12 }px` : undefined, borderBottom: showDivider && layout !== 'horizontal' ? `${ dividerWeight ?? 1 }px ${ dividerStyle ?? 'solid' } ${ dividerColor ?? '#E5E7EB' }` : undefined, paddingBottom: showDivider && layout !== 'horizontal' ? `${ itemSpacing ?? 12 }px` : undefined, display: 'flex', alignItems: 'center', gap: `${ iconTextGap ?? 10 }px` } }>
						{ item.iconClass && (
							<span className="nx-icon-list-icon" style={ { fontSize: `${ iconSize ?? 18 }px`, color: item.iconColor || defaultIconColor || 'var(--nx-color-primary,#7C3AED)', background: iconBgColor || undefined, borderRadius: iconBorderRadius || undefined, padding: iconPadding ? `${ iconPadding }px` : undefined, flexShrink: 0 } }>
								<i className={ item.iconClass } />
							</span>
						) }
						<span className="nx-icon-list-text" style={ { color: textColor || undefined } }>
							{ item.link ? <a href={ item.link } style={ { color: 'inherit', textDecoration: 'none' } }>{ item.text }</a> : item.text }
						</span>
					</li>
				) ) }
			</ul>
		</div>
	);
}
