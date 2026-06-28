/**
 * Tabs — Save
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { uniqueId, defaultOpen, tabLayout, tabActivation, cssId, cssClasses, animation, contentBackground, contentBorder } = attributes;
	
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ),
	} );

	return (
		<div { ...blockProps }>
			<div className={ `nexus-tabs nx-tabs-${ tabLayout ?? 'top' }${ cssClasses ? ' ' + cssClasses : '' }` } data-activation={ tabActivation ?? 'click' } data-default-open={ defaultOpen ?? 0 }>
				{/* Navigation placeholder - will be populated by frontend.js */}
				<div className="nx-tabs-nav" role="tablist"></div>
				
				<div className="nx-tabs-content-wrapper" style={ { background: contentBackground || undefined, border: contentBorder?.style && contentBorder?.style !== 'none' ? `${ contentBorder.width ?? '1px' } ${ contentBorder.style } ${ contentBorder.color ?? '#E5E7EB' }` : undefined } }>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
