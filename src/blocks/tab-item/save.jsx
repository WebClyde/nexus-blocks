/**
 * Tab Item — Save
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { tabId, label, iconClass } = attributes;
	const blockProps = useBlockProps.save( {
		className: 'nx-tab-item',
		'data-tab-id': tabId,
		'data-tab-label': label,
		'data-tab-icon': iconClass,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
