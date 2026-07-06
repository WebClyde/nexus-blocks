/**
 * Row Column — Save
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { backgroundToStyle } from '../../controls';
import { buildRowColumnCSS } from './style';

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

	const scopedCss = buildRowColumnCSS( uniqueId, attributes );

	return (
		<div { ...blockProps } className={ [ blockProps.className, cssClasses ].filter( Boolean ).join( ' ' ) }>
			{ scopedCss && <style dangerouslySetInnerHTML={ { __html: scopedCss } } /> }
			<div className="nx-row-column-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
