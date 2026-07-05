/**
 * Spacer — deprecations.
 *
 * v1: background was a plain solid-color string (`bgColor`). Migrated to the
 * shared `background` object (BackgroundControl) so Spacer supports gradients
 * and images like every other block with a background control.
 */
import { useBlockProps } from '@wordpress/block-editor';

const v1AttributeSchema = {
	uniqueId:   { type: 'string',  default: '' },
	height:     { type: 'string',  default: '60px' },
	bgColor:    { type: 'string',  default: '' },
	cssId:      { type: 'string',  default: '' },
	cssClasses: { type: 'string',  default: '' },
	margin:     { type: 'object',  default: {} },
	padding:    { type: 'object',  default: {} },
	animation:  { type: 'object',  default: {} },
};

function SaveV1( { attributes } ) {
	const { uniqueId, height, bgColor, cssId, cssClasses } = attributes;
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, style: { height: height ?? '60px', background: bgColor || 'transparent', display: 'block', width: '100%' } } );
	return <div { ...blockProps } className={ `nexus-spacer${ cssClasses ? ' ' + cssClasses : '' }` } aria-hidden="true" />;
}

export default [
	{
		attributes: v1AttributeSchema,
		save: SaveV1,
		migrate( attributes ) {
			const { bgColor, ...rest } = attributes;
			return {
				...rest,
				background: bgColor ? { type: 'solid', color: bgColor } : {},
			};
		},
	},
];
