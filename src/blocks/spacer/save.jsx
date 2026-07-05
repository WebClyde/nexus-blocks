import { useBlockProps } from '@wordpress/block-editor';
import { backgroundToStyle, backgroundHoverToCSS } from '../../controls';
export default function Save( { attributes } ) {
	const { uniqueId, height, background, cssId, cssClasses } = attributes;
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, style: { ...backgroundToStyle( background ), height: height ?? '60px', display: 'block', width: '100%' } } );
	const hoverCss = backgroundHoverToCSS( uniqueId, background );
	return (
		<div { ...blockProps } className={ `nexus-spacer${ cssClasses ? ' ' + cssClasses : '' }` } aria-hidden="true">
			{ hoverCss && <style dangerouslySetInnerHTML={ { __html: hoverCss } } /> }
		</div>
	);
}
