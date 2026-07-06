/**
 * Advanced Image — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, RangeControl, TextControl, Button } from '@wordpress/components';
import { ColorControl, BorderControl, BoxShadowControl, SpacingControl, AnimationControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
const OBJECT_FITS = [
	{ label: 'Cover',   value: 'cover' },
	{ label: 'Contain', value: 'contain' },
	{ label: 'Fill',    value: 'fill' },
	{ label: 'None',    value: 'none' },
];

const SHAPE_MASKS = [
	{ label: 'None',     value: '' },
	{ label: 'Circle',   value: 'circle(50%)' },
	{ label: 'Hexagon',  value: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' },
	{ label: 'Rhombus',  value: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
	{ label: 'Triangle', value: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
];

const OVERLAY_ANIMS = [
	{ label: 'Fade In',    value: 'fadeIn' },
	{ label: 'Slide Up',   value: 'slideUp' },
	{ label: 'Slide Down', value: 'slideDown' },
	{ label: 'Zoom In',    value: 'zoomIn' },
	{ label: 'Zoom Out',   value: 'zoomOut' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId, imageId, imageUrl, imageAlt, imageSize, alignment,
		caption, captionType, captionText, linkType, linkUrl, openLightbox,
		maxWidth, objectFit, opacity, shapeMask, border, borderRadius,
		boxShadow, enableOverlay, overlayColor, overlayText, overlayTextColor,
		overlayAnimation, cssId, cssClasses, margin, padding, animation,
	} = attributes;

	useEffect( () => { const expected = `nx-${ clientId.slice( 0, 8 ) }`; if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } ); }, [ clientId ] );

	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined, style: { textAlign: alignment } } );

	return (
		<>
			<InspectorControls>
				<MediaAndVectorPanel initialOpen={ true }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( m ) => setAttributes( { imageId: m.id, imageUrl: m.url, imageAlt: m.alt } ) }
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) => (
								<div className="nx-image-picker">
									{ imageUrl && <img src={ imageUrl } alt={ imageAlt } className="nx-image-preview-thumb" /> }
									<Button onClick={ open } variant="secondary" isSmall>
										{ imageUrl ? __( 'Change Image', 'nexus-blocks' ) : __( 'Select Image', 'nexus-blocks' ) }
									</Button>
								</div>
							) }
						/>
					</MediaUploadCheck>
					<SelectControl label={ __( 'Alignment', 'nexus-blocks' ) } value={ alignment ?? 'center' } options={ [ { label: 'Left', value: 'left' }, { label: 'Center', value: 'center' }, { label: 'Right', value: 'right' } ] } onChange={ ( v ) => setAttributes( { alignment: v } ) } />
					<SelectControl label={ __( 'Object Fit', 'nexus-blocks' ) } value={ objectFit ?? 'cover' } options={ OBJECT_FITS } onChange={ ( v ) => setAttributes( { objectFit: v } ) } />
					<SelectControl label={ __( 'Shape Mask', 'nexus-blocks' ) } value={ shapeMask ?? '' } options={ SHAPE_MASKS } onChange={ ( v ) => setAttributes( { shapeMask: v } ) } />
				</MediaAndVectorPanel>

				<TypographyPanel initialOpen={ false }>
					<TextControl label={ __( 'Caption', 'nexus-blocks' ) } value={ captionText ?? '' } onChange={ ( v ) => setAttributes( { captionText: v } ) } />
					{ enableOverlay && (
						<TextControl label={ __( 'Overlay Text', 'nexus-blocks' ) } value={ overlayText ?? '' } onChange={ ( v ) => setAttributes( { overlayText: v } ) } />
					) }
				</TypographyPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<TextControl label={ __( 'Max Width', 'nexus-blocks' ) } value={ maxWidth ?? '' } onChange={ ( v ) => setAttributes( { maxWidth: v } ) } />
					<BorderControl value={ border } onChange={ ( v ) => setAttributes( { border: v } ) } />
					<BoxShadowControl value={ boxShadow } onChange={ ( v ) => setAttributes( { boxShadow: v } ) } />
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
					<SpacingControl label={ __( 'Padding', 'nexus-blocks' ) } value={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<RangeControl label={ __( 'Opacity', 'nexus-blocks' ) } value={ opacity ?? 1 } onChange={ ( v ) => setAttributes( { opacity: v } ) } min={ 0 } max={ 1 } step={ 0.01 } />
					{ enableOverlay && (
						<>
							<ColorControl label={ __( 'Overlay Color', 'nexus-blocks' ) } value={ overlayColor } onChange={ ( v ) => setAttributes( { overlayColor: v } ) } showOpacity />
							<ColorControl label={ __( 'Overlay Text Color', 'nexus-blocks' ) } value={ overlayTextColor } onChange={ ( v ) => setAttributes( { overlayTextColor: v } ) } />
						</>
					) }
				</ColorsAndBackgroundsPanel>

				<InteractionsPanel initialOpen={ false }>
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
					<ToggleControl label={ __( 'Enable Overlay', 'nexus-blocks' ) } checked={ !! enableOverlay } onChange={ ( v ) => setAttributes( { enableOverlay: v } ) } />
					{ enableOverlay && (
						<SelectControl label={ __( 'Overlay Animation', 'nexus-blocks' ) } value={ overlayAnimation ?? 'fadeIn' } options={ OVERLAY_ANIMS } onChange={ ( v ) => setAttributes( { overlayAnimation: v } ) } />
					) }
				</InteractionsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<ToggleControl label={ __( 'Open Lightbox', 'nexus-blocks' ) } checked={ !! openLightbox } onChange={ ( v ) => setAttributes( { openLightbox: v } ) } />
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ `nx-image-block${ enableOverlay ? ' has-overlay' : '' }` } style={ { position: 'relative', display: 'inline-block', maxWidth: maxWidth || undefined } }>
					{ imageUrl ? (
						<img
							src={ imageUrl }
							alt={ imageAlt ?? '' }
							className="nexus-image"
							style={ {
								opacity:       opacity ?? 1,
								objectFit:     objectFit ?? 'cover',
								clipPath:      shapeMask || undefined,
								display:       'block',
								width:         '100%',
							} }
						/>
					) : (
						<div className="nx-image-placeholder">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( m ) => setAttributes( { imageId: m.id, imageUrl: m.url, imageAlt: m.alt } ) }
									allowedTypes={ [ 'image' ] }
									render={ ( { open } ) => (
										<Button onClick={ open } variant="secondary">{ __( 'Select Image', 'nexus-blocks' ) }</Button>
									) }
								/>
							</MediaUploadCheck>
						</div>
					) }
					{ enableOverlay && (
						<div className={ `nx-image-overlay nx-overlay-${ overlayAnimation ?? 'fadeIn' }` }
							style={ { background: overlayColor ?? 'rgba(0,0,0,0.5)', color: overlayTextColor ?? '#fff', opacity: 1, visibility: 'visible', transform: 'none' } }
						>
							{ overlayText && <span>{ overlayText }</span> }
						</div>
					) }
				</div>
				{ captionText && <p className="nexus-image-caption">{ captionText }</p> }
			</div>
		</>
	);
}
