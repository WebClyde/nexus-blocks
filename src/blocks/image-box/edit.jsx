/**
 * Image Box — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, RangeControl, Button } from '@wordpress/components';
import { TypographyControl, ColorControl, BorderControl, BoxShadowControl, SpacingControl, AnimationControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
const TAG_OPTIONS = [ 'h2','h3','h4','h5','h6','p','div','span' ].map( ( t ) => ( { label: t.toUpperCase(), value: t } ) );
const POSITIONS = [ { label: 'Top', value: 'top' }, { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' } ];
const OBJECT_FITS = [ { label: 'Cover', value: 'cover' }, { label: 'Contain', value: 'contain' }, { label: 'Fill', value: 'fill' } ];
const IMG_HOVER_ANIMS = [ { label: 'None', value: '' }, { label: 'Grow', value: 'grow' }, { label: 'Shrink', value: 'shrink' }, { label: 'Float', value: 'float' }, { label: 'Sink', value: 'sink' } ];
const CARD_HOVER = [ { label: 'None', value: '' }, { label: 'Lift', value: 'lift' }, { label: 'Border Glow', value: 'glow' }, { label: 'Underline Slide', value: 'underline-slide' } ];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { uniqueId, imageId, imageUrl, imageAlt, title, titleTag, description, linkUrl, linkType, buttonText, position, imageWidth, imageMaxWidth, imageHeight, objectFit, imageSpacing, imageBorder, imageBorderRadius, imageBoxShadow, imgHoverAnimation, alignment, hoverEffect, transitionDuration, titleColor, titleTypography, titleSpacing, descColor, descTypography, cssId, cssClasses, margin, animation } = attributes;
	useEffect( () => { const expected = `nx-${ clientId.slice( 0, 8 ) }`; if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } ); }, [ clientId ] );
	const Tag = titleTag || 'h3';
	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined } );
	return (
		<>
			<InspectorControls>
				<MediaAndVectorPanel initialOpen={ true }>
					<MediaUploadCheck>
						<MediaUpload onSelect={ ( m ) => setAttributes( { imageId: m.id, imageUrl: m.url, imageAlt: m.alt } ) } allowedTypes={ [ 'image' ] } value={ imageId } render={ ( { open } ) => (
							<div>{ imageUrl && <img src={ imageUrl } alt={ imageAlt } style={ { maxWidth: '100%', marginBottom: 8 } } /> }
							<Button onClick={ open } variant="secondary" isSmall>{ imageUrl ? __( 'Change Image', 'nexus-blocks' ) : __( 'Select Image', 'nexus-blocks' ) }</Button></div>
						) } />
					</MediaUploadCheck>
					<SelectControl label={ __( 'Object Fit', 'nexus-blocks' ) } value={ objectFit ?? 'cover' } options={ OBJECT_FITS } onChange={ ( v ) => setAttributes( { objectFit: v } ) } />
				</MediaAndVectorPanel>

				<TypographyPanel initialOpen={ false }>
					<TextControl label={ __( 'Title', 'nexus-blocks' ) } value={ title ?? '' } onChange={ ( v ) => setAttributes( { title: v } ) } />
					<SelectControl label={ __( 'Title Tag', 'nexus-blocks' ) } value={ titleTag ?? 'h3' } options={ TAG_OPTIONS } onChange={ ( v ) => setAttributes( { titleTag: v } ) } />
					<TextControl label={ __( 'Description', 'nexus-blocks' ) } value={ description ?? '' } onChange={ ( v ) => setAttributes( { description: v } ) } />
					<ColorControl label={ __( 'Title Color', 'nexus-blocks' ) } value={ titleColor } onChange={ ( v ) => setAttributes( { titleColor: v } ) } />
					<TypographyControl label={ __( 'Title', 'nexus-blocks' ) } value={ titleTypography } onChange={ ( v ) => setAttributes( { titleTypography: v } ) } />
					<RangeControl label={ __( 'Title Spacing (px)', 'nexus-blocks' ) } value={ titleSpacing ?? 8 } onChange={ ( v ) => setAttributes( { titleSpacing: v } ) } min={ 0 } max={ 48 } />
					<ColorControl label={ __( 'Description Color', 'nexus-blocks' ) } value={ descColor } onChange={ ( v ) => setAttributes( { descColor: v } ) } />
					<TypographyControl label={ __( 'Description', 'nexus-blocks' ) } value={ descTypography } onChange={ ( v ) => setAttributes( { descTypography: v } ) } />
				</TypographyPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<SelectControl label={ __( 'Position', 'nexus-blocks' ) } value={ position ?? 'top' } options={ POSITIONS } onChange={ ( v ) => setAttributes( { position: v } ) } />
					<TextControl label={ __( 'Image Width', 'nexus-blocks' ) } value={ imageWidth ?? '' } onChange={ ( v ) => setAttributes( { imageWidth: v } ) } />
					<TextControl label={ __( 'Image Max Width', 'nexus-blocks' ) } value={ imageMaxWidth ?? '' } onChange={ ( v ) => setAttributes( { imageMaxWidth: v } ) } />
					<TextControl label={ __( 'Image Height', 'nexus-blocks' ) } value={ imageHeight ?? '' } onChange={ ( v ) => setAttributes( { imageHeight: v } ) } />
					<RangeControl label={ __( 'Spacing (gap)', 'nexus-blocks' ) } value={ imageSpacing ?? 16 } onChange={ ( v ) => setAttributes( { imageSpacing: v } ) } min={ 0 } max={ 64 } />
					<BorderControl value={ imageBorder } onChange={ ( v ) => setAttributes( { imageBorder: v } ) } />
					<TextControl label={ __( 'Border Radius', 'nexus-blocks' ) } value={ imageBorderRadius ?? '' } onChange={ ( v ) => setAttributes( { imageBorderRadius: v } ) } />
					<BoxShadowControl value={ imageBoxShadow } onChange={ ( v ) => setAttributes( { imageBoxShadow: v } ) } />
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
				</SizeAndSpacingPanel>

				<InteractionsPanel initialOpen={ false }>
					<SelectControl label={ __( 'Image Hover Animation', 'nexus-blocks' ) } value={ imgHoverAnimation ?? '' } options={ IMG_HOVER_ANIMS } onChange={ ( v ) => setAttributes( { imgHoverAnimation: v } ) } />
					<SelectControl label={ __( 'Card Hover Effect', 'nexus-blocks' ) } value={ hoverEffect ?? '' } options={ CARD_HOVER } onChange={ ( v ) => setAttributes( { hoverEffect: v } ) } />
					<RangeControl label={ __( 'Transition (ms)', 'nexus-blocks' ) } value={ transitionDuration ?? 300 } onChange={ ( v ) => setAttributes( { transitionDuration: v } ) } min={ 50 } max={ 1000 } />
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl label={ __( 'Link URL', 'nexus-blocks' ) } value={ linkUrl ?? '' } onChange={ ( v ) => setAttributes( { linkUrl: v } ) } />
					<SelectControl label={ __( 'Link Type', 'nexus-blocks' ) } value={ linkType ?? 'card' } options={ [ { label: 'Whole Card', value: 'card' }, { label: 'Title', value: 'title' }, { label: 'Button', value: 'button' } ] } onChange={ ( v ) => setAttributes( { linkType: v } ) } />
					{ linkType === 'button' && <TextControl label={ __( 'Button Text', 'nexus-blocks' ) } value={ buttonText ?? 'Learn More' } onChange={ ( v ) => setAttributes( { buttonText: v } ) } /> }
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>
			<div { ...blockProps }>
				<div className={ `nexus-image-box nx-pos-${ position ?? 'top' }${ hoverEffect ? ` nx-hover-${ hoverEffect }` : '' }` } style={ { display: position !== 'top' ? 'flex' : undefined, gap: `${ imageSpacing ?? 16 }px`, flexDirection: position === 'left' ? 'row' : position === 'right' ? 'row-reverse' : 'column', transition: `all ${ transitionDuration ?? 300 }ms ease` } }>
					<div className={ `nx-image-box-img${ imgHoverAnimation ? ` nx-img-hover-${ imgHoverAnimation }` : '' }` } style={ { flex: position !== 'top' ? '0 0 auto' : undefined, width: imageWidth || undefined, maxWidth: imageMaxWidth || undefined } }>
						{ imageUrl ? <img src={ imageUrl } alt={ imageAlt ?? '' } style={ { width: '100%', height: imageHeight || undefined, objectFit: objectFit ?? 'cover', borderRadius: imageBorderRadius || undefined } } /> : <div className="nx-image-placeholder" style={ { background: '#f0f0f0', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' } }>{ __( 'Select an image', 'nexus-blocks' ) }</div> }
					</div>
					<div className="nx-image-box-content">
						{ title && <Tag className="nx-image-box-title" style={ { color: titleColor || undefined, marginBottom: titleSpacing ? `${ titleSpacing }px` : undefined } }>{ title }</Tag> }
						{ description && <p className="nx-image-box-desc" style={ { color: descColor || undefined } }>{ description }</p> }
						{ linkType === 'button' && linkUrl && <a href={ linkUrl } className="nx-image-box-btn">{ buttonText || 'Learn More' }</a> }
					</div>
				</div>
			</div>
		</>
	);
}
