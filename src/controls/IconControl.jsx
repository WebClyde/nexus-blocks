/**
 * IconControl — visual icon picker for FontAwesome Free.
 */

import { __ } from '@wordpress/i18n';
import { BaseControl, CustomSelectControl, Flex, FlexItem } from '@wordpress/components';

const FA_ICONS = [
	{ key: '', name: 'None', className: '' },
	{ key: 'fa-solid fa-check', name: 'Check', className: 'fa-solid fa-check' },
	{ key: 'fa-solid fa-times', name: 'Times', className: 'fa-solid fa-times' },
	{ key: 'fa-solid fa-info-circle', name: 'Info', className: 'fa-solid fa-info-circle' },
	{ key: 'fa-solid fa-exclamation-triangle', name: 'Warning', className: 'fa-solid fa-exclamation-triangle' },
	{ key: 'fa-solid fa-exclamation-circle', name: 'Error', className: 'fa-solid fa-exclamation-circle' },
	{ key: 'fa-solid fa-arrow-right', name: 'Arrow Right', className: 'fa-solid fa-arrow-right' },
	{ key: 'fa-solid fa-arrow-left', name: 'Arrow Left', className: 'fa-solid fa-arrow-left' },
	{ key: 'fa-solid fa-arrow-up', name: 'Arrow Up', className: 'fa-solid fa-arrow-up' },
	{ key: 'fa-solid fa-arrow-down', name: 'Arrow Down', className: 'fa-solid fa-arrow-down' },
	{ key: 'fa-solid fa-chevron-right', name: 'Chevron Right', className: 'fa-solid fa-chevron-right' },
	{ key: 'fa-solid fa-chevron-left', name: 'Chevron Left', className: 'fa-solid fa-chevron-left' },
	{ key: 'fa-solid fa-chevron-up', name: 'Chevron Up', className: 'fa-solid fa-chevron-up' },
	{ key: 'fa-solid fa-chevron-down', name: 'Chevron Down', className: 'fa-solid fa-chevron-down' },
	{ key: 'fa-solid fa-plus', name: 'Plus', className: 'fa-solid fa-plus' },
	{ key: 'fa-solid fa-minus', name: 'Minus', className: 'fa-solid fa-minus' },
	{ key: 'fa-solid fa-star', name: 'Star', className: 'fa-solid fa-star' },
	{ key: 'fa-regular fa-star', name: 'Star Outline', className: 'fa-regular fa-star' },
	{ key: 'fa-solid fa-heart', name: 'Heart', className: 'fa-solid fa-heart' },
	{ key: 'fa-regular fa-heart', name: 'Heart Outline', className: 'fa-regular fa-heart' },
	{ key: 'fa-solid fa-user', name: 'User', className: 'fa-solid fa-user' },
	{ key: 'fa-solid fa-envelope', name: 'Envelope', className: 'fa-solid fa-envelope' },
	{ key: 'fa-solid fa-phone', name: 'Phone', className: 'fa-solid fa-phone' },
	{ key: 'fa-solid fa-map-marker-alt', name: 'Map Marker', className: 'fa-solid fa-map-marker-alt' },
	{ key: 'fa-solid fa-calendar', name: 'Calendar', className: 'fa-solid fa-calendar' },
	{ key: 'fa-solid fa-clock', name: 'Clock', className: 'fa-solid fa-clock' },
	{ key: 'fa-solid fa-search', name: 'Search', className: 'fa-solid fa-search' },
	{ key: 'fa-solid fa-cog', name: 'Settings', className: 'fa-solid fa-cog' },
	{ key: 'fa-solid fa-link', name: 'Link', className: 'fa-solid fa-link' },
	{ key: 'fa-solid fa-external-link-alt', name: 'External Link', className: 'fa-solid fa-external-link-alt' },
	{ key: 'fa-solid fa-download', name: 'Download', className: 'fa-solid fa-download' },
	{ key: 'fa-solid fa-upload', name: 'Upload', className: 'fa-solid fa-upload' },
	{ key: 'fa-solid fa-camera', name: 'Camera', className: 'fa-solid fa-camera' },
	{ key: 'fa-solid fa-image', name: 'Image', className: 'fa-solid fa-image' },
	{ key: 'fa-solid fa-play', name: 'Play', className: 'fa-solid fa-play' },
	{ key: 'fa-brands fa-facebook', name: 'Facebook', className: 'fa-brands fa-facebook' },
	{ key: 'fa-brands fa-twitter', name: 'Twitter', className: 'fa-brands fa-twitter' },
	{ key: 'fa-brands fa-instagram', name: 'Instagram', className: 'fa-brands fa-instagram' },
	{ key: 'fa-brands fa-linkedin', name: 'LinkedIn', className: 'fa-brands fa-linkedin' },
	{ key: 'fa-brands fa-youtube', name: 'YouTube', className: 'fa-brands fa-youtube' },
	{ key: 'fa-brands fa-github', name: 'GitHub', className: 'fa-brands fa-github' },
	{ key: 'fa-brands fa-wordpress', name: 'WordPress', className: 'fa-brands fa-wordpress' },
];

/**
 * @param {Object} props
 * @param {string} props.value    - FontAwesome class (e.g. 'fa-solid fa-check')
 * @param {Function} props.onChange
 * @param {string} props.label
 */
export default function IconControl( { value = '', onChange, label = __( 'Icon', 'nexus-blocks' ) } ) {
	const selectedItem = FA_ICONS.find( item => item.key === value ) || FA_ICONS[0];

	return (
		<BaseControl label={ label } className="nx-icon-control" style={{ marginBottom: '16px' }}>
			<CustomSelectControl
				options={ FA_ICONS.map( item => ({
					key: item.key,
					name: (
						<Flex align="center" gap={ 3 }>
							<FlexItem>
								<i className={ item.className } style={{ width: '20px', textAlign: 'center' }} />
							</FlexItem>
							<FlexItem>
								{ item.name }
							</FlexItem>
						</Flex>
					)
				}) ) }
				value={ selectedItem }
				onChange={ ( selected ) => onChange( selected.selectedItem.key ) }
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
}
