/**
 * AnimationControl — entrance animation picker for block sidebar panels.
 */

import { __ } from '@wordpress/i18n';
import { SelectControl, RangeControl, Flex, FlexItem } from '@wordpress/components';

const ANIMATIONS = [
	{ label: __( 'None', 'nexus-blocks' ),            value: '' },
	{ label: __( 'Fade In', 'nexus-blocks' ),          value: 'fadeIn' },
	{ label: __( 'Fade In Up', 'nexus-blocks' ),       value: 'fadeInUp' },
	{ label: __( 'Fade In Down', 'nexus-blocks' ),     value: 'fadeInDown' },
	{ label: __( 'Fade In Left', 'nexus-blocks' ),     value: 'fadeInLeft' },
	{ label: __( 'Fade In Right', 'nexus-blocks' ),    value: 'fadeInRight' },
	{ label: __( 'Zoom In', 'nexus-blocks' ),          value: 'zoomIn' },
	{ label: __( 'Zoom In Up', 'nexus-blocks' ),       value: 'zoomInUp' },
	{ label: __( 'Slide In Up', 'nexus-blocks' ),      value: 'slideInUp' },
	{ label: __( 'Slide In Down', 'nexus-blocks' ),    value: 'slideInDown' },
	{ label: __( 'Slide In Left', 'nexus-blocks' ),    value: 'slideInLeft' },
	{ label: __( 'Slide In Right', 'nexus-blocks' ),   value: 'slideInRight' },
	{ label: __( 'Bounce In', 'nexus-blocks' ),        value: 'bounceIn' },
	{ label: __( 'Flip In X', 'nexus-blocks' ),        value: 'flipInX' },
	{ label: __( 'Flip In Y', 'nexus-blocks' ),        value: 'flipInY' },
	{ label: __( 'Roll In', 'nexus-blocks' ),          value: 'rollIn' },
	{ label: __( 'Rotate In', 'nexus-blocks' ),        value: 'rotateIn' },
];

const EASINGS = [
	{ label: 'Ease',         value: 'ease' },
	{ label: 'Linear',       value: 'linear' },
	{ label: 'Ease In',      value: 'ease-in' },
	{ label: 'Ease Out',     value: 'ease-out' },
	{ label: 'Ease In Out',  value: 'ease-in-out' },
];

/**
 * @param {Object}   props
 * @param {Object}   props.value    - { animation, duration, delay, easing, repeat }
 * @param {Function} props.onChange
 */
export default function AnimationControl( { value = {}, onChange } ) {
	const set = ( key ) => ( val ) => onChange( { ...value, [ key ]: val } );

	return (
		<div className="nx-animation-control">
			<SelectControl
				label={ __( 'Entrance Animation', 'nexus-blocks' ) }
				value={ value.animation ?? '' }
				options={ ANIMATIONS }
				onChange={ set( 'animation' ) }
			/>
			{ value.animation && (
				<>
					<RangeControl
						label={ __( 'Duration (ms)', 'nexus-blocks' ) }
						value={ value.duration ?? 600 }
						onChange={ set( 'duration' ) }
						min={ 100 } max={ 3000 } step={ 50 }
					/>
					<RangeControl
						label={ __( 'Delay (ms)', 'nexus-blocks' ) }
						value={ value.delay ?? 0 }
						onChange={ set( 'delay' ) }
						min={ 0 } max={ 2000 } step={ 50 }
					/>
					<SelectControl
						label={ __( 'Easing', 'nexus-blocks' ) }
						value={ value.easing ?? 'ease' }
						options={ EASINGS }
						onChange={ set( 'easing' ) }
					/>
				</>
			) }
		</div>
	);
}

/**
 * Convert animation value to data attributes for the frontend runner.
 */
export function animationToDataAttrs( anim = {} ) {
	if ( ! anim?.animation ) return {};
	return {
		'data-nx-animation': anim.animation,
		'data-nx-duration':  anim.duration ?? 600,
		'data-nx-delay':     anim.delay    ?? 0,
		'data-nx-easing':    anim.easing   ?? 'ease',
		'data-nx-repeat':    anim.repeat   ?? 'once',
	};
}
