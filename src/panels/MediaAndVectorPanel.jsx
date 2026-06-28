import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';

/**
 * 5. 🖼️ Media & Vector Panel
 * Controls all image, SVG, 3D, and gallery rendering options.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {boolean} props.initialOpen
 */
export default function MediaAndVectorPanel( { children, initialOpen = false, ...props } ) {
	return (
		<PanelBody
			title={ __( '🖼️ Media & Vector', 'nexus-blocks' ) }
			initialOpen={ initialOpen }
			{ ...props }
		>
			{ children }
		</PanelBody>
	);
}
