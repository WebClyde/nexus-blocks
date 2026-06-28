/**
 * TypographyControl — full typography panel control.
 * Used across all text-bearing blocks.
 */

import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	SelectControl,
	RangeControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	Flex,
	FlexItem,
	Button,
	Dropdown,
} from '@wordpress/components';
import { useGlobalTypography } from '../hooks/useGlobalSettings';

const FONT_WEIGHTS = [
	{ label: 'Default', value: '' },
	{ label: '100 — Thin', value: '100' },
	{ label: '200 — Extra Light', value: '200' },
	{ label: '300 — Light', value: '300' },
	{ label: '400 — Regular', value: '400' },
	{ label: '500 — Medium', value: '500' },
	{ label: '600 — Semi Bold', value: '600' },
	{ label: '700 — Bold', value: '700' },
	{ label: '800 — Extra Bold', value: '800' },
	{ label: '900 — Black', value: '900' },
];

const TEXT_TRANSFORMS = [
	{ label: 'Default', value: '' },
	{ label: 'None', value: 'none' },
	{ label: 'Uppercase', value: 'uppercase' },
	{ label: 'Lowercase', value: 'lowercase' },
	{ label: 'Capitalize', value: 'capitalize' },
];

const TEXT_DECORATIONS = [
	{ label: 'Default', value: '' },
	{ label: 'None', value: 'none' },
	{ label: 'Underline', value: 'underline' },
	{ label: 'Overline', value: 'overline' },
	{ label: 'Line Through', value: 'line-through' },
];

const FONT_STYLES = [
	{ label: 'Default', value: '' },
	{ label: 'Normal', value: 'normal' },
	{ label: 'Italic', value: 'italic' },
	{ label: 'Oblique', value: 'oblique' },
];

/**
 * @param {Object} props
 * @param {Object} props.value    - typography attribute object
 * @param {Function} props.onChange
 * @param {string} props.label
 */
export default function TypographyControl( { value = {}, onChange, label = __( 'Typography', 'nexus-blocks' ) } ) {
	const globalTypo = useGlobalTypography();

	const set = ( key ) => ( val ) => onChange( { ...value, [ key ]: val } );

	return (
		<BaseControl label={ label } className="nx-typography-control">
			{/* Google Font family input */}
			<BaseControl label={ __( 'Font Family', 'nexus-blocks' ) }>
				<input
					type="text"
					className="nx-font-family-input"
					value={ value.fontFamily || '' }
					onChange={ ( e ) => set( 'fontFamily' )( e.target.value ) }
					placeholder="Inter, sans-serif"
					list="nx-google-fonts"
				/>
				<datalist id="nx-google-fonts">
					<option value="Inter, sans-serif" />
					<option value="'Roboto', sans-serif" />
					<option value="'Open Sans', sans-serif" />
					<option value="'Poppins', sans-serif" />
					<option value="'Playfair Display', serif" />
					<option value="'Merriweather', serif" />
					<option value="'Lato', sans-serif" />
					<option value="'Montserrat', sans-serif" />
					<option value="'Raleway', sans-serif" />
					<option value="'Nunito', sans-serif" />
					<option value="'Source Sans Pro', sans-serif" />
					<option value="'Fira Sans', sans-serif" />
					<option value="'DM Sans', sans-serif" />
					<option value="'Space Grotesk', sans-serif" />
					<option value="'Plus Jakarta Sans', sans-serif" />
				</datalist>
			</BaseControl>

			{/* Font size */}
			<Flex gap={ 3 } align="flex-end" style={ { marginBottom: '16px' } }>
				<FlexItem style={ { flex: 1 } }>
					<UnitControl
						label={ __( 'Size', 'nexus-blocks' ) }
						value={ value.fontSize || '' }
						onChange={ set( 'fontSize' ) }
						units={ [
							{ value: 'px', label: 'px', default: 16 },
							{ value: 'em', label: 'em', default: 1 },
							{ value: 'rem', label: 'rem', default: 1 },
							{ value: 'vw', label: 'vw', default: 4 },
						] }
						min={ 0 }
						max={ 200 }
					/>
				</FlexItem>
				<FlexItem style={ { flex: 1 } }>
					<SelectControl
						label={ __( 'Weight', 'nexus-blocks' ) }
						value={ value.fontWeight || '' }
						options={ FONT_WEIGHTS }
						onChange={ set( 'fontWeight' ) }
					/>
				</FlexItem>
			</Flex>

			{/* Line height + letter spacing */}
			<Flex gap={ 3 } align="flex-end" style={ { marginBottom: '16px' } }>
				<FlexItem style={ { flex: 1 } }>
					<UnitControl
						label={ __( 'Line Height', 'nexus-blocks' ) }
						value={ value.lineHeight || '' }
						onChange={ set( 'lineHeight' ) }
						units={ [
							{ value: '', label: '—', default: 1.5 },
							{ value: 'px', label: 'px', default: 24 },
							{ value: 'em', label: 'em', default: 1.5 },
						] }
					/>
				</FlexItem>
				<FlexItem style={ { flex: 1 } }>
					<UnitControl
						label={ __( 'Letter Spacing', 'nexus-blocks' ) }
						value={ value.letterSpacing || '' }
						onChange={ set( 'letterSpacing' ) }
						units={ [
							{ value: 'px', label: 'px', default: 0 },
							{ value: 'em', label: 'em', default: 0 },
						] }
						min={ -10 }
						max={ 20 }
					/>
				</FlexItem>
			</Flex>

			{/* Transform + decoration */}
			<Flex gap={ 3 } align="flex-end" style={ { marginBottom: '16px' } }>
				<FlexItem style={ { flex: 1 } }>
					<SelectControl
						label={ __( 'Transform', 'nexus-blocks' ) }
						value={ value.textTransform || '' }
						options={ TEXT_TRANSFORMS }
						onChange={ set( 'textTransform' ) }
					/>
				</FlexItem>
				<FlexItem style={ { flex: 1 } }>
					<SelectControl
						label={ __( 'Decoration', 'nexus-blocks' ) }
						value={ value.textDecoration || '' }
						options={ TEXT_DECORATIONS }
						onChange={ set( 'textDecoration' ) }
					/>
				</FlexItem>
			</Flex>

			<SelectControl
				label={ __( 'Font Style', 'nexus-blocks' ) }
				value={ value.fontStyle || '' }
				options={ FONT_STYLES }
				onChange={ set( 'fontStyle' ) }
			/>
		</BaseControl>
	);
}

/**
 * Convert a typography value object to a CSS style object.
 */
export function typographyToStyle( typo = {} ) {
	const style = {};
	if ( typo.fontFamily ) style.fontFamily = typo.fontFamily;
	if ( typo.fontSize ) style.fontSize = typo.fontSize;
	if ( typo.fontWeight ) style.fontWeight = typo.fontWeight;
	if ( typo.lineHeight ) style.lineHeight = typo.lineHeight;
	if ( typo.letterSpacing ) style.letterSpacing = typo.letterSpacing;
	if ( typo.textTransform ) style.textTransform = typo.textTransform;
	if ( typo.textDecoration ) style.textDecoration = typo.textDecoration;
	if ( typo.fontStyle ) style.fontStyle = typo.fontStyle;
	return style;
}
