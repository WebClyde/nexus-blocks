import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * 4. 🕹️ Interactions Panel
 * Controls all motion, animation, and trigger-based behaviors.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} props.initialOpen
 */
export default function InteractionsPanel( { children, initialOpen = false, ...props } ) {
	return (
		<PanelBody
			title={ __( '🕹️ Interactions', 'nexus-blocks' ) }
			initialOpen={ initialOpen }
			{ ...props }
		>
			{ children }
		</PanelBody>
	);
}
