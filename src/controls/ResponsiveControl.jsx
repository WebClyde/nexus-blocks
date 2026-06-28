/**
 * ResponsiveControl — wraps any control with Desktop / Tablet / Mobile tabs.
 */

import { __ } from '@wordpress/i18n';
import { TabPanel } from '@wordpress/components';

const TABS = [
	{ name: 'desktop', title: '🖥', className: 'nx-responsive-tab' },
	{ name: 'tablet',  title: '📱', className: 'nx-responsive-tab' },
	{ name: 'mobile',  title: '📲', className: 'nx-responsive-tab' },
];

/**
 * @param {Object}   props
 * @param {Object}   props.value      - { desktop: any, tablet: any, mobile: any }
 * @param {Function} props.onChange   - called with updated responsive object
 * @param {Function} props.renderControl - (value, onChange) => JSX
 * @param {string}   props.label
 */
export default function ResponsiveControl( {
	value          = {},
	onChange,
	renderControl,
	label          = '',
} ) {
	return (
		<div className="nx-responsive-control">
			{ label && <p className="nx-responsive-label">{ label }</p> }
			<TabPanel
				className="nx-responsive-tabs"
				tabs={ TABS }
			>
				{ ( tab ) => renderControl(
					value?.[ tab.name ] ?? '',
					( val ) => onChange( { ...value, [ tab.name ]: val } )
				) }
			</TabPanel>
		</div>
	);
}
