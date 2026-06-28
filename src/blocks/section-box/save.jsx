/**
 * Section / Box — Save
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { buildScopedCSS } from '../../hooks/useStyleOutput';
import { buildSectionBoxRules } from './style';

export default function Save( { attributes } ) {
	const { uniqueId, htmlTag, cssId, cssClasses, overlayColor, animation } = attributes;

	const Tag = htmlTag || 'section';
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		...( animation?.animation ? {
			'data-nx-animation': animation.animation,
			'data-nx-duration':  animation.duration ?? 600,
			'data-nx-delay':     animation.delay    ?? 0,
		} : {} )
	} );

	const scopedCss = buildScopedCSS( uniqueId, buildSectionBoxRules( attributes ) );

	return (
		<Tag { ...blockProps } className={ [ blockProps.className, cssClasses ].filter( Boolean ).join( ' ' ) }>
			{ scopedCss && <style dangerouslySetInnerHTML={ { __html: scopedCss } } /> }
			{ overlayColor && <div className="nx-overlay" aria-hidden="true" /> }
			<div className="nx-section-inner">
				<InnerBlocks.Content />
			</div>
		</Tag>
	);
}
