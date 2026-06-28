import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * 3. 🔤 Typography Panel
 * Controls all font, text style, and label rendering properties.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} props.initialOpen
 */
export default function TypographyPanel( { children, initialOpen = false, ...props } ) {
	return (
		<PanelBody
			title={ __( '🔤 Typography', 'nexus-blocks' ) }
			initialOpen={ initialOpen }
			{ ...props }
		>
			{ children }
		</PanelBody>
	);
}
