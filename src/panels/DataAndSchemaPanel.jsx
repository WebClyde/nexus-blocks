import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * 6. 🗄️ Data & Schema Panel
 * Controls all database, field, query, and structured data options.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} props.initialOpen
 */
export default function DataAndSchemaPanel( { children, initialOpen = false, ...props } ) {
	return (
		<PanelBody
			title={ __( '🗄️ Data & Schema', 'nexus-blocks' ) }
			initialOpen={ initialOpen }
			{ ...props }
		>
			{ children }
		</PanelBody>
	);
}
