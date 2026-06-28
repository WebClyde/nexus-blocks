import { RichText, useBlockProps } from '@wordpress/block-editor';
export default function Save( { attributes } ) {
	const { uniqueId, content, alignment, textColor, typography, dropCap, columns, columnGap, columnRule, columnRuleWidth, columnRuleColor, cssId, cssClasses, animation } = attributes;
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		style: { textAlign: alignment },
		...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ),
	} );
	const textStyle = {
		color: textColor || undefined,
		columnCount: columns > 1 ? columns : undefined,
		columnGap:   columns > 1 ? columnGap : undefined,
		columnRuleStyle: columns > 1 && columnRule !== 'none' ? columnRule : undefined,
		columnRuleWidth: columns > 1 && columnRule !== 'none' ? columnRuleWidth : undefined,
		columnRuleColor: columns > 1 && columnRule !== 'none' ? columnRuleColor : undefined,
		...( typography?.fontFamily    ? { fontFamily:    typography.fontFamily }    : {} ),
		...( typography?.fontSize      ? { fontSize:      typography.fontSize }      : {} ),
		...( typography?.fontWeight    ? { fontWeight:    typography.fontWeight }    : {} ),
		...( typography?.lineHeight    ? { lineHeight:    typography.lineHeight }    : {} ),
		...( typography?.letterSpacing ? { letterSpacing: typography.letterSpacing } : {} ),
	};
	return (
		<div { ...blockProps }>
			<RichText.Content tagName="p" className={ `nexus-text${ dropCap ? ' has-drop-cap' : '' }` } style={ textStyle } value={ content } />
		</div>
	);
}
