import { useBlockProps } from '@wordpress/block-editor';
export default function Save( { attributes } ) {
	const { uniqueId, dividerStyle, dividerWidth, alignment, element, elementText, elementIcon, dividerColor, dividerWeight, gapAbove, gapBelow, textColor, iconColor, iconSize, cssId } = attributes;
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, style: { textAlign: alignment ?? 'center', paddingTop: gapAbove ? `${ gapAbove }px` : undefined, paddingBottom: gapBelow ? `${ gapBelow }px` : undefined } } );
	const lineStyle = { borderTopStyle: dividerStyle ?? 'solid', borderTopWidth: `${ dividerWeight ?? 1 }px`, borderTopColor: dividerColor ?? '#E5E7EB', width: dividerWidth ?? '100%', display: 'inline-block', verticalAlign: 'middle' };
	return (
		<div { ...blockProps }>
			<div className="nexus-divider" style={ { display: 'flex', alignItems: 'center', gap: '12px' } }>
				<span style={ lineStyle } />
				{ element === 'text' && elementText && <span className="nx-divider-text" style={ { color: textColor, whiteSpace: 'nowrap' } }>{ elementText }</span> }
				{ element === 'icon' && elementIcon && <i className={ elementIcon } style={ { color: iconColor, fontSize: `${ iconSize ?? 20 }px` } } /> }
				{ element !== 'none' && <span style={ lineStyle } /> }
			</div>
		</div>
	);
}
