/**
 * Row Layout / Container — Save
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { buildScopedCSS } from '../../hooks/useStyleOutput';
import { buildRowLayoutRules } from './style';

export default function Save( { attributes } ) {
	const { uniqueId, cssId, cssClasses, animation } = attributes;

	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		...( animation?.animation ? {
			'data-nx-animation': animation.animation,
			'data-nx-duration':  animation.duration ?? 600,
			'data-nx-delay':     animation.delay    ?? 0,
		} : {} )
	} );

	const scopedCss = buildScopedCSS( uniqueId, buildRowLayoutRules( attributes ) );

	return (
		<div { ...blockProps } className={ [ blockProps.className, cssClasses ].filter( Boolean ).join( ' ' ) }>
			{ scopedCss && <style dangerouslySetInnerHTML={ { __html: scopedCss } } /> }
			<div className="nx-row-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
