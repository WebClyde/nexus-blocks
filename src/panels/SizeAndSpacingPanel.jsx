import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * 1. 📐 Size & Spacing Panel
 * Controls all dimensional and positional layout properties.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} props.initialOpen
 */
export default function SizeAndSpacingPanel( { children, initialOpen = false, ...props } ) {
	return (
		<PanelBody
			title={ __( '📐 Size & Spacing', 'nexus-blocks' ) }
			initialOpen={ initialOpen }
			{ ...props }
		>
			{ children }
		</PanelBody>
	);
}
