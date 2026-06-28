/**
 * Breakpoint constants for Nexus Blocks responsive controls.
 * Values match the CSS custom properties output by class-nexus-global.php.
 */

export const BREAKPOINTS = {
	mobile:  767,
	tablet:  1024,
	desktop: 1280,
	wide:    1536,
};

export const BREAKPOINT_TABS = [
	{ label: '🖥 Desktop', value: 'desktop' },
	{ label: '📱 Tablet',  value: 'tablet' },
	{ label: '📲 Mobile',  value: 'mobile' },
];

/**
 * Get a responsive attribute value for a given breakpoint,
 * falling back to larger breakpoint values.
 *
 * @param {Object} responsiveObj  e.g. { desktop: '48px', tablet: '', mobile: '' }
 * @param {string} breakpoint     'desktop' | 'tablet' | 'mobile'
 * @returns {string}
 */
export function getResponsiveValue( responsiveObj = {}, breakpoint = 'desktop' ) {
	if ( ! responsiveObj ) return '';
	if ( breakpoint === 'mobile' ) {
		return responsiveObj.mobile || responsiveObj.tablet || responsiveObj.desktop || '';
	}
	if ( breakpoint === 'tablet' ) {
		return responsiveObj.tablet || responsiveObj.desktop || '';
	}
	return responsiveObj.desktop || '';
}
