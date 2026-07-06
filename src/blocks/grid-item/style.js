/**
 * Grid Item — style builder.
 *
 * Unlike Row Column, no `!important` is needed here — Grid Layout doesn't
 * apply any generic per-child sizing rule for its items to compete with
 * (CSS Grid auto-placement already handles unset items on its own).
 */
import { backgroundHoverToCSS } from '../../controls';

export function buildGridItemCSS( uniqueId, attributes ) {
	if ( ! uniqueId ) return '';

	const { colSpan, gridColumn, rowSpan, gridRow, gridArea, justifySelf, alignSelf, background } = attributes;
	const declarations = [];

	if ( colSpan > 0 ) {
		declarations.push( `grid-column: span ${ colSpan };` );
	} else if ( gridColumn ) {
		declarations.push( `grid-column: ${ gridColumn };` );
	}
	if ( rowSpan ) {
		declarations.push( `grid-row: ${ rowSpan };` );
	} else if ( gridRow ) {
		declarations.push( `grid-row: ${ gridRow };` );
	}
	if ( gridArea ) {
		declarations.push( `grid-area: ${ gridArea };` );
	}
	if ( justifySelf ) {
		declarations.push( `justify-self: ${ justifySelf };` );
	}
	if ( alignSelf ) {
		declarations.push( `align-self: ${ alignSelf };` );
	}

	let css = '';
	if ( declarations.length ) {
		css += `[data-nexus-id="${ uniqueId }"] { ${ declarations.join( ' ' ) } }\n`;
	}
	css += backgroundHoverToCSS( uniqueId, background );

	return css;
}
