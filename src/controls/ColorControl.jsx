/**
 * ColorControl — extended color picker with opacity + global token swatches.
 */

import { __ } from '@wordpress/i18n';
import { BaseControl, ColorPicker, ColorPalette, Popover, Button, RangeControl, Flex, FlexItem } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useGlobalColors } from '../hooks/useGlobalSettings';

/**
 * @param {Object}   props
 * @param {string}   props.value       - CSS color string (hex, rgba, etc.)
 * @param {Function} props.onChange
 * @param {string}   props.label
 * @param {boolean}  props.showOpacity
 */
export default function ColorControl( {
	value    = '',
	onChange,
	label    = __( 'Color', 'nexus-blocks' ),
	showOpacity = false,
} ) {
	const globalColors = useGlobalColors();
	const [ open, setOpen ] = useState( false );

	return (
		<BaseControl label={ label } className="nx-color-control">
			<Flex align="center" gap={ 2 }>
				<FlexItem>
					<button
						type="button"
						className="nx-color-swatch"
						style={ { background: value || 'transparent' } }
						onClick={ () => setOpen( ! open ) }
						aria-label={ __( 'Pick color', 'nexus-blocks' ) }
					/>
				</FlexItem>
				<FlexItem>
					<span className="nx-color-value">{ value || __( 'None', 'nexus-blocks' ) }</span>
				</FlexItem>
				{ value && (
					<FlexItem>
						<Button
							isSmall
							isDestructive
							variant="tertiary"
							onClick={ () => onChange( '' ) }
						>
							{ __( 'Clear', 'nexus-blocks' ) }
						</Button>
					</FlexItem>
				) }
			</Flex>

			{ open && (
				<Popover position="bottom left" onClose={ () => setOpen( false ) }>
					<div className="nx-color-popover">
						{ globalColors.length > 0 && (
							<div className="nx-color-tokens">
								<p className="nx-color-tokens-label">{ __( 'Global Tokens', 'nexus-blocks' ) }</p>
								<ColorPalette
									colors={ globalColors }
									value={ value }
									onChange={ ( c ) => { onChange( c ); } }
									disableCustomColors
									clearable={ false }
								/>
							</div>
						) }
						<ColorPicker
							color={ value }
							onChange={ onChange }
							enableAlpha={ showOpacity }
						/>
					</div>
				</Popover>
			) }
		</BaseControl>
	);
}
