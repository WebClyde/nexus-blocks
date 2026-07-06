/**
 * Row Column — style builder.
 *
 * Width/vertical-align need `!important` because the parent Row Layout applies
 * a generic `flex: 1 1 0` to all its direct children for the equal-split
 * default (see row-layout/style.js). Without `!important`, that rule's higher
 * selector specificity (`> .nx-row-inner > *`) would always win over a plain
 * `[data-nexus-id="..."]` rule here, regardless of source order.
 */
import { backgroundHoverToCSS } from '../../controls';

const BREAKPOINTS = { tablet: 768, mobile: 480 };

export function buildRowColumnCSS( uniqueId, attributes ) {
	if ( ! uniqueId ) return '';

	const { width, verticalAlign, background } = attributes;
	let css = '';

	const baseDeclarations = [];
	if ( width?.desktop ) {
		baseDeclarations.push( `flex: 0 0 ${ width.desktop } !important;`, `max-width: ${ width.desktop } !important;` );
	}
	if ( verticalAlign ) {
		baseDeclarations.push( `align-self: ${ verticalAlign };` );
	}
	if ( baseDeclarations.length ) {
		css += `[data-nexus-id="${ uniqueId }"] { ${ baseDeclarations.join( ' ' ) } }\n`;
	}

	[ 'tablet', 'mobile' ].forEach( ( bp ) => {
		const val = width?.[ bp ];
		if ( val ) {
			css += `@media (max-width: ${ BREAKPOINTS[ bp ] }px) { [data-nexus-id="${ uniqueId }"] { flex: 0 0 ${ val } !important; max-width: ${ val } !important; } }\n`;
		}
	} );

	css += backgroundHoverToCSS( uniqueId, background );

	return css;
}
