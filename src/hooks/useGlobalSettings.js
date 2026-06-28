/**
 * useGlobalSettings — hooks to access Nexus global design tokens
 * from the editor (via nexusBlocksData localized var) or store.
 */

import { useMemo } from '@wordpress/element';

/** Raw global settings object injected by PHP via wp_localize_script */
function getRaw() {
	return window.nexusBlocksData?.globalSettings ?? {};
}

/**
 * Returns a WP-format color palette from the global color tokens.
 * Compatible with ColorPalette component.
 */
export function useGlobalColors() {
	return useMemo( () => {
		const colors = getRaw().colors ?? {};
		const labels = {
			primary:   'Primary',
			secondary: 'Secondary',
			text:      'Text',
			heading:   'Heading',
			accent:    'Accent',
			bg:        'Background',
			surface:   'Surface',
			border:    'Border',
		};
		return Object.entries( colors ).map( ( [ key, value ] ) => ( {
			name:  labels[ key ] ?? key,
			color: value,
			slug:  `nx-${ key }`,
		} ) );
	}, [] );
}

/**
 * Returns the typography settings object.
 */
export function useGlobalTypography() {
	return useMemo( () => {
		return getRaw().typography ?? {};
	}, [] );
}

/**
 * Returns the spacing scale.
 */
export function useGlobalSpacing() {
	return useMemo( () => {
		return getRaw().spacing ?? {};
	}, [] );
}

/**
 * Returns breakpoint values.
 */
export function useBreakpoints() {
	return useMemo( () => ( {
		mobile:  767,
		tablet:  1024,
		desktop: 1280,
		wide:    1536,
	} ), [] );
}
