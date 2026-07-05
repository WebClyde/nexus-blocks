/**
 * Tabs — deprecations.
 *
 * v1: `contentBackground` was a plain solid-color string. Migrated to the
 * shared `background` object (BackgroundControl) for gradient/image support.
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const v1AttributeSchema = {
	uniqueId:          { type: 'string', default: '' },
	activeTabId:       { type: 'string', default: '' },
	defaultOpen:       { type: 'number', default: 0 },
	tabLayout:         { type: 'string', default: 'top' },
	tabActivation:     { type: 'string', default: 'click' },
	labelBgActive:     { type: 'string', default: '' },
	labelTextActive:   { type: 'string', default: '' },
	labelTypography:   { type: 'object', default: {} },
	activeIndicator:   { type: 'string', default: 'bottom' },
	indicatorColor:    { type: 'string', default: '' },
	tabBorder:         { type: 'object', default: {} },
	tabPadding:        { type: 'object', default: {} },
	tabSpacing:        { type: 'number', default: 4 },
	contentBackground: { type: 'string', default: '' },
	contentBorder:     { type: 'object', default: {} },
	contentPadding:    { type: 'object', default: {} },
	margin:            { type: 'object', default: {} },
	padding:           { type: 'object', default: {} },
	animation:         { type: 'object', default: {} },
	cssId:             { type: 'string', default: '' },
	cssClasses:        { type: 'string', default: '' },
};

function SaveV1( { attributes } ) {
	const { uniqueId, defaultOpen, tabLayout, tabActivation, cssId, cssClasses, animation, contentBackground, contentBorder } = attributes;
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ),
	} );
	return (
		<div { ...blockProps }>
			<div className={ `nexus-tabs nx-tabs-${ tabLayout ?? 'top' }${ cssClasses ? ' ' + cssClasses : '' }` } data-activation={ tabActivation ?? 'click' } data-default-open={ defaultOpen ?? 0 }>
				<div className="nx-tabs-nav" role="tablist"></div>
				<div className="nx-tabs-content-wrapper" style={ { background: contentBackground || undefined, border: contentBorder?.style && contentBorder?.style !== 'none' ? `${ contentBorder.width ?? '1px' } ${ contentBorder.style } ${ contentBorder.color ?? '#E5E7EB' }` : undefined } }>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}

export default [
	{
		attributes: v1AttributeSchema,
		save: SaveV1,
		migrate( attributes ) {
			const { contentBackground, ...rest } = attributes;
			return {
				...rest,
				contentBackground: contentBackground ? { type: 'solid', color: contentBackground } : {},
			};
		},
	},
];
