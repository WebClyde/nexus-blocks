import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * 2. 🎨 Colors & Backgrounds Panel
 * Controls all visual fill, overlay, and filter properties.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} props.initialOpen
 */
export default function ColorsAndBackgroundsPanel( { children, initialOpen = false, ...props } ) {
	return (
		<PanelBody
			title={ __( '🎨 Colors & Backgrounds', 'nexus-blocks' ) }
			initialOpen={ initialOpen }
			{ ...props }
		>
			{ children }
		</PanelBody>
	);
}
