/**
 * useStyleOutput — generates a scoped <style> string from block attributes.
 * Every block gets a unique data-nexus-id attribute so styles are isolated.
 */

import { useMemo } from '@wordpress/element';

/**
 * Generates CSS custom properties and rules scoped to a unique block ID.
 *
 * @param {string} uniqueId  The block's unique ID (e.g. "nx-a1b2c3")
 * @param {Object} rules     Map of CSS selector suffix → style object
 *                           e.g. { ' .nexus-heading': { color: 'red' } }
 * @returns {string}         CSS string ready to inject into a <style> tag
 */
export function buildScopedCSS( uniqueId, rules ) {
	if ( ! uniqueId || ! rules ) return '';

	let css = '';
	for ( const [ selector, styles ] of Object.entries( rules ) ) {
		const declarations = Object.entries( styles )
			.filter( ( [ , v ] ) => v !== undefined && v !== null && v !== '' )
			.map( ( [ prop, val ] ) => `  ${ camelToKebab( prop ) }: ${ val };` )
			.join( '\n' );

		if ( declarations ) {
			css += `[data-nexus-id="${ uniqueId }"]${ selector } {\n${ declarations }\n}\n`;
		}
	}
	return css;
}

/**
 * React hook that returns a memoized CSS string.
 *
 * @param {string}   uniqueId
 * @param {Function} buildRules  Function returning a rules object from attributes
 * @param {Object}   attributes  Block attributes (dependency for memo)
 */
export function useStyleOutput( uniqueId, buildRules, attributes ) {
	return useMemo( () => {
		if ( ! uniqueId ) return '';
		try {
			const rules = buildRules( attributes );
			return buildScopedCSS( uniqueId, rules );
		} catch {
			return '';
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ uniqueId, JSON.stringify( attributes ) ] );
}

/** Convert camelCase CSS prop to kebab-case */
export function camelToKebab( str ) {
	return str.replace( /([A-Z])/g, ( m ) => `-${ m.toLowerCase() }` );
}

/**
 * Generates a short unique ID for a new block instance.
 * Called once at block creation time.
 */
export function generateUniqueId() {
	return 'nx-' + Math.random().toString( 36 ).substring( 2, 8 );
}
