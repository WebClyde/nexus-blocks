/**
 * Grid Item — Save
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { backgroundToStyle } from '../../controls';
import { buildGridItemCSS } from './style';

export default function Save( { attributes } ) {
	const { uniqueId, padding, background, cssId, cssClasses } = attributes;

	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		style: {
			...backgroundToStyle( background ),
			padding: padding?.top ? `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }` : undefined,
			minWidth: 0,
			boxSizing: 'border-box',
		},
	} );

	const scopedCss = buildGridItemCSS( uniqueId, attributes );

	return (
		<div { ...blockProps } className={ [ blockProps.className, cssClasses ].filter( Boolean ).join( ' ' ) }>
			{ scopedCss && <style dangerouslySetInnerHTML={ { __html: scopedCss } } /> }
			<div className="nx-grid-item-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
