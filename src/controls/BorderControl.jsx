/**
 * BorderControl — full border type, width, color, radius control.
 */

import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	SelectControl,
	ColorPalette,
	Flex,
	FlexItem,
	__experimentalUnitControl as UnitControl,
	__experimentalBorderBoxControl as BorderBoxControl,
} from '@wordpress/components';
import { useGlobalColors } from '../hooks/useGlobalSettings';

const BORDER_STYLES = [
	{ label: __( 'None', 'nexus-blocks' ), value: 'none' },
	{ label: __( 'Solid', 'nexus-blocks' ), value: 'solid' },
	{ label: __( 'Dashed', 'nexus-blocks' ), value: 'dashed' },
	{ label: __( 'Dotted', 'nexus-blocks' ), value: 'dotted' },
	{ label: __( 'Double', 'nexus-blocks' ), value: 'double' },
	{ label: __( 'Groove', 'nexus-blocks' ), value: 'groove' },
	{ label: __( 'Ridge', 'nexus-blocks' ), value: 'ridge' },
];

/**
 * @param {Object}   props
 * @param {Object}   props.value    - { style, width, color, radius }
 * @param {Function} props.onChange
 * @param {boolean}  props.showRadius
 */
export default function BorderControl( { value = {}, onChange, showRadius = true } ) {
	const colors = useGlobalColors();
	const set = ( key ) => ( val ) => onChange( { ...value, [ key ]: val } );

	return (
		<div className="nx-border-control">
			<Flex gap={ 3 } align="flex-end" style={ { marginBottom: '16px' } }>
				<FlexItem isBlock style={ { flex: 1 } }>
					<SelectControl
						label={ __( 'Border Type', 'nexus-blocks' ) }
						value={ value.style || 'none' }
						options={ BORDER_STYLES }
						onChange={ set( 'style' ) }
					/>
				</FlexItem>
				{ value.style && value.style !== 'none' && (
					<FlexItem isBlock style={ { flex: 1 } }>
						<UnitControl
							label={ __( 'Width', 'nexus-blocks' ) }
							value={ value.width || '1px' }
							onChange={ set( 'width' ) }
							units={ [ { value: 'px', label: 'px', default: 1 } ] }
							min={ 0 }
							max={ 20 }
						/>
					</FlexItem>
				) }
			</Flex>

			{ value.style && value.style !== 'none' && (
				<BaseControl label={ __( 'Color', 'nexus-blocks' ) }>
					<ColorPalette
						colors={ colors }
						value={ value.color || '' }
						onChange={ set( 'color' ) }
					/>
				</BaseControl>
			) }

			{ showRadius && (
				<UnitControl
					label={ __( 'Border Radius', 'nexus-blocks' ) }
					value={ value.radius || '' }
					onChange={ set( 'radius' ) }
					units={ [
						{ value: 'px', label: 'px', default: 0 },
						{ value: '%', label: '%', default: 0 },
					] }
					min={ 0 }
					max={ 500 }
				/>
			) }
		</div>
	);
}

/** Convert border value object to CSS style properties. */
export function borderToStyle( border = {} ) {
	const style = {};
	if ( border.style && border.style !== 'none' ) {
		style.borderStyle = border.style;
		style.borderWidth = border.width || '1px';
		style.borderColor = border.color || 'currentColor';
	} else {
		style.border = 'none';
	}
	if ( border.radius ) style.borderRadius = border.radius;
	return style;
}
