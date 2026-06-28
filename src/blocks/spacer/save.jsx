import { useBlockProps } from '@wordpress/block-editor';
export default function Save( { attributes } ) {
	const { uniqueId, height, bgColor, cssId, cssClasses } = attributes;
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, style: { height: height ?? '60px', background: bgColor || 'transparent', display: 'block', width: '100%' } } );
	return <div { ...blockProps } className={ `nexus-spacer${ cssClasses ? ' ' + cssClasses : '' }` } aria-hidden="true" />;
}
