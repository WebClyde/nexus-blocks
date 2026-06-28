/**
 * SpacingControl — margin/padding with per-side and responsive support.
 */

import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	Button,
	Flex,
	FlexItem,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';

const SIDES = [ 'top', 'right', 'bottom', 'left' ];

/**
 * @param {Object}   props
 * @param {Object}   props.value    - { top, right, bottom, left, unit }
 * @param {Function} props.onChange
 * @param {string}   props.label
 * @param {boolean}  props.allowNegative
 */
export default function SpacingControl( {
	value = {},
	onChange,
	label,
	allowNegative = false,
} ) {
	const [ linked, setLinked ] = useState( true );

	const unit = value.unit || 'px';

	const set = ( side ) => ( val ) => {
		const numVal = parseFloat( val );
		if ( linked ) {
			onChange( { top: val, right: val, bottom: val, left: val, unit } );
		} else {
			onChange( { ...value, [ side ]: val, unit } );
		}
	};

	const setUnit = ( newUnit ) => {
		onChange( { ...value, unit: newUnit } );
	};

	return (
		<BaseControl label={ label } className="nx-spacing-control">
			<Flex align="center" justify="space-between">
				<FlexItem>
					<span className="nx-spacing-unit-label">{ unit }</span>
				</FlexItem>
				<FlexItem>
					<Button
						icon={ linked ? link : linkOff }
						isSmall
						isPressed={ linked }
						onClick={ () => setLinked( ! linked ) }
						label={ linked ? __( 'Unlink sides', 'nexus-blocks' ) : __( 'Link sides', 'nexus-blocks' ) }
					/>
				</FlexItem>
			</Flex>
			<div className="nx-spacing-grid">
				{ SIDES.map( ( side ) => (
					<div key={ side } className={ `nx-spacing-side nx-spacing-${ side }` }>
						<UnitControl
							label={ side.charAt( 0 ).toUpperCase() + side.slice( 1 ) }
							value={ ( linked ? value.top : value[ side ] ) || '' }
							onChange={ set( side ) }
							units={ [
								{ value: 'px', label: 'px', default: 0 },
								{ value: 'em', label: 'em', default: 0 },
								{ value: 'rem', label: 'rem', default: 0 },
								{ value: '%', label: '%', default: 0 },
								{ value: 'vh', label: 'vh', default: 0 },
								{ value: 'vw', label: 'vw', default: 0 },
							] }
							min={ allowNegative ? -500 : 0 }
							max={ 500 }
						/>
					</div>
				) ) }
			</div>
		</BaseControl>
	);
}

/**
 * Convert a spacing value object to a CSS shorthand string.
 */
export function spacingToCSS( spacing = {} ) {
	if ( ! spacing || Object.keys( spacing ).length === 0 ) return undefined;
	const u = spacing.unit || 'px';
	const t = spacing.top ? `${ spacing.top }` : '0';
	const r = spacing.right ? `${ spacing.right }` : '0';
	const b = spacing.bottom ? `${ spacing.bottom }` : '0';
	const l = spacing.left ? `${ spacing.left }` : '0';
	// If all sides equal, return single value
	if ( t === r && r === b && b === l ) return t === '0' ? '0' : `${ t }`;
	return `${ t } ${ r } ${ b } ${ l }`;
}

/**
 * Convert spacing object to individual CSS style properties.
 */
export function spacingToStyle( spacing = {}, type = 'padding' ) {
	if ( ! spacing ) return {};
	return {
		[ `${ type }Top` ]: spacing.top || undefined,
		[ `${ type }Right` ]: spacing.right || undefined,
		[ `${ type }Bottom` ]: spacing.bottom || undefined,
		[ `${ type }Left` ]: spacing.left || undefined,
	};
}
