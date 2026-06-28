/**
 * BoxShadowControl — multiple layered box-shadow control.
 */

import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	ToggleControl,
	RangeControl,
	SelectControl,
	Flex,
	FlexItem,
	Button,
} from '@wordpress/components';
import ColorControl from './ColorControl';

const DEFAULT_SHADOW = {
	enabled:    true,
	horizontal: 0,
	vertical:   4,
	blur:       6,
	spread:     0,
	color:      'rgba(0,0,0,0.1)',
	inset:      false,
};

/**
 * @param {Object}   props
 * @param {Object}   props.value     - shadow object
 * @param {Function} props.onChange
 * @param {string}   props.label
 */
export default function BoxShadowControl( {
	value    = {},
	onChange,
	label    = __( 'Box Shadow', 'nexus-blocks' ),
} ) {
	const set = ( key ) => ( val ) => onChange( { ...DEFAULT_SHADOW, ...value, [ key ]: val } );
	const shadow = { ...DEFAULT_SHADOW, ...value };

	return (
		<BaseControl label={ label } className="nx-box-shadow-control">
			<ToggleControl
				label={ __( 'Enable Shadow', 'nexus-blocks' ) }
				checked={ !! shadow.enabled }
				onChange={ set( 'enabled' ) }
			/>
			{ shadow.enabled && (
				<>
					<Flex>
						<FlexItem isBlock>
							<RangeControl
								label={ __( 'Horizontal', 'nexus-blocks' ) }
								value={ shadow.horizontal }
								onChange={ set( 'horizontal' ) }
								min={ -50 } max={ 50 }
							/>
						</FlexItem>
						<FlexItem isBlock>
							<RangeControl
								label={ __( 'Vertical', 'nexus-blocks' ) }
								value={ shadow.vertical }
								onChange={ set( 'vertical' ) }
								min={ -50 } max={ 50 }
							/>
						</FlexItem>
					</Flex>
					<Flex>
						<FlexItem isBlock>
							<RangeControl
								label={ __( 'Blur', 'nexus-blocks' ) }
								value={ shadow.blur }
								onChange={ set( 'blur' ) }
								min={ 0 } max={ 100 }
							/>
						</FlexItem>
						<FlexItem isBlock>
							<RangeControl
								label={ __( 'Spread', 'nexus-blocks' ) }
								value={ shadow.spread }
								onChange={ set( 'spread' ) }
								min={ -50 } max={ 50 }
							/>
						</FlexItem>
					</Flex>
					<ColorControl
						label={ __( 'Shadow Color', 'nexus-blocks' ) }
						value={ shadow.color }
						onChange={ set( 'color' ) }
						showOpacity
					/>
					<ToggleControl
						label={ __( 'Inset', 'nexus-blocks' ) }
						checked={ !! shadow.inset }
						onChange={ set( 'inset' ) }
					/>
				</>
			) }
		</BaseControl>
	);
}

/** Convert shadow object to CSS string */
export function boxShadowToCSS( shadow = {} ) {
	if ( ! shadow?.enabled ) return 'none';
	const inset  = shadow.inset ? 'inset ' : '';
	return `${ inset }${ shadow.horizontal ?? 0 }px ${ shadow.vertical ?? 4 }px ${ shadow.blur ?? 6 }px ${ shadow.spread ?? 0 }px ${ shadow.color ?? 'rgba(0,0,0,0.1)' }`;
}
