/**
 * Nexus CSS Generator — helpers for building CSS strings from attribute objects.
 */

/** Convert camelCase to kebab-case */
export function camelToKebab( str ) {
	return str.replace( /([A-Z])/g, ( m ) => `-${ m.toLowerCase() }` );
}

/**
 * Convert a style object to a CSS declaration block string.
 * @param {Object} styles  e.g. { color: 'red', fontSize: '16px' }
 * @returns {string}
 */
export function styleObjectToCSS( styles = {} ) {
	return Object.entries( styles )
		.filter( ( [ , v ] ) => v !== undefined && v !== null && v !== '' )
		.map( ( [ prop, val ] ) => `  ${ camelToKebab( prop ) }: ${ val };` )
		.join( '\n' );
}

/**
 * Build a full scoped CSS block.
 * @param {string} scopeSelector  e.g. '[data-nexus-id="nx-abc123"]'
 * @param {string} innerSelector  e.g. ' .nexus-heading'
 * @param {Object} styles
 */
export function buildRule( scopeSelector, innerSelector, styles ) {
	const declarations = styleObjectToCSS( styles );
	if ( ! declarations ) return '';
	return `${ scopeSelector }${ innerSelector } {\n${ declarations }\n}\n`;
}

/**
 * Convert a spacing object { top, right, bottom, left } to CSS shorthand.
 */
export function spacingShorthand( spacing = {} ) {
	if ( ! spacing ) return '';
	const t = spacing.top    ?? 0;
	const r = spacing.right  ?? t;
	const b = spacing.bottom ?? t;
	const l = spacing.left   ?? r;
	if ( t === r && r === b && b === l ) return String( t );
	return `${ t } ${ r } ${ b } ${ l }`;
}

/**
 * Build a CSS transition string.
 * @param {string} duration   e.g. "300ms"
 * @param {string} easing     e.g. "ease"
 * @param {string} property   e.g. "all"
 */
export function buildTransition( duration = '300ms', easing = 'ease', property = 'all' ) {
	return `${ property } ${ duration } ${ easing }`;
}

/**
 * Convert a box-shadow object to a CSS value string.
 */
export function boxShadowToCSS( shadow = {} ) {
	if ( ! shadow || ! shadow.enabled ) return 'none';
	const inset  = shadow.inset ? 'inset ' : '';
	const h      = shadow.horizontal ?? 0;
	const v      = shadow.vertical   ?? 0;
	const blur   = shadow.blur       ?? 0;
	const spread = shadow.spread     ?? 0;
	const color  = shadow.color      ?? 'rgba(0,0,0,0.1)';
	return `${ inset }${ h }px ${ v }px ${ blur }px ${ spread }px ${ color }`;
}

/**
 * Build a gradient CSS value.
 */
export function gradientToCSS( gradient = {} ) {
	if ( ! gradient || ! gradient.stops?.length ) return '';
	const type  = gradient.type ?? 'linear';
	const angle = gradient.angle ?? 135;
	const stops = gradient.stops
		.map( ( s ) => `${ s.color } ${ s.position ?? '' }`.trim() )
		.join( ', ' );
	if ( type === 'radial' ) {
		return `radial-gradient(circle at ${ gradient.posX ?? 'center' } ${ gradient.posY ?? 'center' }, ${ stops })`;
	}
	return `linear-gradient(${ angle }deg, ${ stops })`;
}
