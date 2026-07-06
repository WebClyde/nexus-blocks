/**
 * Grid Layout / Container — Save
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { buildScopedCSS } from '../../hooks/useStyleOutput';
import { buildGridLayoutRules } from './style';

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

	const scopedCss = buildScopedCSS( uniqueId, buildGridLayoutRules( attributes ) );

	return (
		<div { ...blockProps } className={ [ blockProps.className, cssClasses ].filter( Boolean ).join( ' ' ) }>
			{ scopedCss && <style dangerouslySetInnerHTML={ { __html: scopedCss } } /> }
			<div className="nx-grid-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
