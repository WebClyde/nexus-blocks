/**
 * BackgroundControl — None / Solid / Gradient / Image background picker.
 */

import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	SelectControl,
	RangeControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import ColorControl from './ColorControl';

const BG_TYPES = [
	{ label: __( 'None', 'nexus-blocks' ),     value: 'none' },
	{ label: __( 'Solid', 'nexus-blocks' ),    value: 'solid' },
	{ label: __( 'Gradient', 'nexus-blocks' ), value: 'gradient' },
	{ label: __( 'Image', 'nexus-blocks' ),    value: 'image' },
];

const GRADIENT_TYPES = [
	{ label: __( 'Linear', 'nexus-blocks' ), value: 'linear' },
	{ label: __( 'Radial', 'nexus-blocks' ), value: 'radial' },
];

const BG_SIZES = [
	{ label: 'Cover',   value: 'cover' },
	{ label: 'Contain', value: 'contain' },
	{ label: 'Auto',    value: 'auto' },
];

const BG_REPEATS = [
	{ label: 'No Repeat', value: 'no-repeat' },
	{ label: 'Repeat',    value: 'repeat' },
	{ label: 'Repeat X',  value: 'repeat-x' },
	{ label: 'Repeat Y',  value: 'repeat-y' },
];

const BLEND_MODES = [
	{ label: 'Normal',      value: 'normal' },
	{ label: 'Multiply',    value: 'multiply' },
	{ label: 'Screen',      value: 'screen' },
	{ label: 'Overlay',     value: 'overlay' },
	{ label: 'Darken',      value: 'darken' },
	{ label: 'Lighten',     value: 'lighten' },
	{ label: 'Color Dodge', value: 'color-dodge' },
	{ label: 'Color Burn',  value: 'color-burn' },
	{ label: 'Soft Light',  value: 'soft-light' },
];

/**
 * @param {Object}   props
 * @param {Object}   props.value    - background attribute object
 * @param {Function} props.onChange
 */
export default function BackgroundControl( { value = {}, onChange } ) {
	const set = ( key ) => ( val ) => onChange( { ...value, [ key ]: val } );
	const bgType = value.type ?? 'none';

	return (
		<BaseControl className="nx-background-control">
			<SelectControl
				label={ __( 'Background Type', 'nexus-blocks' ) }
				value={ bgType }
				options={ BG_TYPES }
				onChange={ set( 'type' ) }
			/>

			{ bgType === 'solid' && (
				<ColorControl
					label={ __( 'Color', 'nexus-blocks' ) }
					value={ value.color ?? '' }
					onChange={ set( 'color' ) }
					showOpacity
				/>
			) }

			{ bgType === 'gradient' && (
				<>
					<SelectControl
						label={ __( 'Gradient Type', 'nexus-blocks' ) }
						value={ value.gradientType ?? 'linear' }
						options={ GRADIENT_TYPES }
						onChange={ set( 'gradientType' ) }
					/>
					<RangeControl
						label={ __( 'Angle', 'nexus-blocks' ) }
						value={ value.gradientAngle ?? 135 }
						onChange={ set( 'gradientAngle' ) }
						min={ 0 } max={ 360 }
					/>
					<ColorControl
						label={ __( 'Start Color', 'nexus-blocks' ) }
						value={ value.gradientStart ?? '#7C3AED' }
						onChange={ set( 'gradientStart' ) }
						showOpacity
					/>
					<ColorControl
						label={ __( 'End Color', 'nexus-blocks' ) }
						value={ value.gradientEnd ?? '#06B6D4' }
						onChange={ set( 'gradientEnd' ) }
						showOpacity
					/>
				</>
			) }

			{ bgType === 'image' && (
				<>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => onChange( { ...value, imageUrl: media.url, imageId: media.id } ) }
							allowedTypes={ [ 'image' ] }
							value={ value.imageId }
							render={ ( { open } ) => (
								<div className="nx-bg-image-picker">
									{ value.imageUrl && (
										<img src={ value.imageUrl } alt="" className="nx-bg-preview" />
									) }
									<Button onClick={ open } variant="secondary" isSmall>
										{ value.imageUrl
											? __( 'Change Image', 'nexus-blocks' )
											: __( 'Select Image', 'nexus-blocks' ) }
									</Button>
									{ value.imageUrl && (
										<Button
											onClick={ () => onChange( { ...value, imageUrl: '', imageId: undefined } ) }
											variant="tertiary" isSmall isDestructive
										>
											{ __( 'Remove', 'nexus-blocks' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
					<SelectControl
						label={ __( 'Size', 'nexus-blocks' ) }
						value={ value.imageSize ?? 'cover' }
						options={ BG_SIZES }
						onChange={ set( 'imageSize' ) }
					/>
					<SelectControl
						label={ __( 'Repeat', 'nexus-blocks' ) }
						value={ value.imageRepeat ?? 'no-repeat' }
						options={ BG_REPEATS }
						onChange={ set( 'imageRepeat' ) }
					/>
					<ToggleControl
						label={ __( 'Fixed (Parallax)', 'nexus-blocks' ) }
						checked={ !! value.imageFixed }
						onChange={ set( 'imageFixed' ) }
					/>
					<SelectControl
						label={ __( 'Blend Mode', 'nexus-blocks' ) }
						value={ value.blendMode ?? 'normal' }
						options={ BLEND_MODES }
						onChange={ set( 'blendMode' ) }
					/>
				</>
			) }
		</BaseControl>
	);
}

/** Convert background value object to CSS style properties. */
export function backgroundToStyle( bg = {} ) {
	if ( ! bg || bg.type === 'none' || ! bg.type ) return {};

	if ( bg.type === 'solid' ) {
		return { background: bg.color || 'transparent' };
	}

	if ( bg.type === 'gradient' ) {
		const type  = bg.gradientType === 'radial' ? 'radial-gradient(circle, ' : `linear-gradient(${ bg.gradientAngle ?? 135 }deg, `;
		return { background: `${ type }${ bg.gradientStart ?? '#7C3AED' }, ${ bg.gradientEnd ?? '#06B6D4' })` };
	}

	if ( bg.type === 'image' && bg.imageUrl ) {
		return {
			backgroundImage:      `url(${ bg.imageUrl })`,
			backgroundSize:       bg.imageSize   ?? 'cover',
			backgroundRepeat:     bg.imageRepeat ?? 'no-repeat',
			backgroundAttachment: bg.imageFixed  ? 'fixed' : 'scroll',
			backgroundPosition:   'center center',
			mixBlendMode:         bg.blendMode   ?? 'normal',
		};
	}

	return {};
}
