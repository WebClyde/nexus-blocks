/**
 * Star Rating — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, TextControl, ButtonGroup, Button } from '@wordpress/components';
import { TypographyControl, ColorControl, SpacingControl, AnimationControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
const ICON_TYPES = [
	{ label: '★ Star',   value: 'star' },
	{ label: '♥ Heart',  value: 'heart' },
	{ label: '● Circle', value: 'circle' },
	{ label: '◆ Diamond',value: 'diamond' },
];
const TITLE_POSITIONS = [ { label: 'Above', value: 'above' }, { label: 'Below', value: 'below' }, { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' } ];

const ICON_MAP = { star: '★', heart: '♥', circle: '●', diamond: '◆' };

function StarDisplay( { rating, scale, iconType, iconSize, filledColor, emptyColor } ) {
	const total = scale ?? 5;
	const icons = [];
	for ( let i = 1; i <= total; i++ ) {
		const filled = i <= rating;
		const halfFilled = ! filled && i <= Math.ceil( rating );
		icons.push(
			<span key={ i } style={ { color: ( filled || halfFilled ) ? ( filledColor || '#F59E0B' ) : ( emptyColor || '#D1D5DB' ), fontSize: `${ iconSize ?? 24 }px` } }>
				{ ICON_MAP[ iconType ?? 'star' ] }
			</span>
		);
	}
	return <span className="nx-star-icons">{ icons }</span>;
}

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { uniqueId, scale, rating, iconType, title, titlePosition, alignment, iconSize, iconSpacing, filledColor, emptyColor, titleColor, titleTypography, titleGap, margin, cssId, cssClasses, animation } = attributes;
	useEffect( () => { const expected = `nx-${ clientId.slice( 0, 8 ) }`; if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } ); }, [ clientId ] );
	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined } );
	const isHorizontal = [ 'left', 'right' ].includes( titlePosition ?? 'below' );
	return (
		<>
			<InspectorControls>
				<DataAndSchemaPanel initialOpen={ true }>
					<SelectControl label={ __( 'Scale', 'nexus-blocks' ) } value={ String( scale ?? 5 ) } options={ [ { label: 'Out of 5', value: '5' }, { label: 'Out of 10', value: '10' } ] } onChange={ ( v ) => setAttributes( { scale: parseInt( v ) } ) } />
					<RangeControl label={ __( 'Rating', 'nexus-blocks' ) } value={ rating ?? 4 } onChange={ ( v ) => setAttributes( { rating: v } ) } min={ 0 } max={ scale ?? 5 } step={ 0.5 } />
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>

				<MediaAndVectorPanel initialOpen={ false }>
					<SelectControl label={ __( 'Icon', 'nexus-blocks' ) } value={ iconType ?? 'star' } options={ ICON_TYPES } onChange={ ( v ) => setAttributes( { iconType: v } ) } />
					<RangeControl label={ __( 'Icon Size (px)', 'nexus-blocks' ) } value={ iconSize ?? 24 } onChange={ ( v ) => setAttributes( { iconSize: v } ) } min={ 12 } max={ 80 } />
					<RangeControl label={ __( 'Icon Spacing (px)', 'nexus-blocks' ) } value={ iconSpacing ?? 4 } onChange={ ( v ) => setAttributes( { iconSpacing: v } ) } min={ 0 } max={ 24 } />
				</MediaAndVectorPanel>

				<TypographyPanel initialOpen={ false }>
					<TextControl label={ __( 'Title / Label', 'nexus-blocks' ) } value={ title ?? '' } onChange={ ( v ) => setAttributes( { title: v } ) } />
					<SelectControl label={ __( 'Title Position', 'nexus-blocks' ) } value={ titlePosition ?? 'below' } options={ TITLE_POSITIONS } onChange={ ( v ) => setAttributes( { titlePosition: v } ) } />
					<ButtonGroup style={{ marginBottom: '16px', display: 'block' }}>{ [ 'left','center','right' ].map( ( a ) => <Button key={ a } isSmall variant={ alignment === a ? 'primary' : 'secondary' } onClick={ () => setAttributes( { alignment: a } ) }>{ a.charAt(0).toUpperCase()+a.slice(1) }</Button> ) }</ButtonGroup>
					<ColorControl label={ __( 'Title Color', 'nexus-blocks' ) } value={ titleColor } onChange={ ( v ) => setAttributes( { titleColor: v } ) } />
					<TypographyControl label={ __( 'Title', 'nexus-blocks' ) } value={ titleTypography } onChange={ ( v ) => setAttributes( { titleTypography: v } ) } />
					<RangeControl label={ __( 'Title Gap (px)', 'nexus-blocks' ) } value={ titleGap ?? 8 } onChange={ ( v ) => setAttributes( { titleGap: v } ) } min={ 0 } max={ 48 } />
				</TypographyPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Filled Color', 'nexus-blocks' ) } value={ filledColor } onChange={ ( v ) => setAttributes( { filledColor: v } ) } />
					<ColorControl label={ __( 'Empty Color', 'nexus-blocks' ) } value={ emptyColor } onChange={ ( v ) => setAttributes( { emptyColor: v } ) } />
				</ColorsAndBackgroundsPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
				</SizeAndSpacingPanel>

				<InteractionsPanel initialOpen={ false }>
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="nexus-star-rating" style={ { textAlign: alignment ?? 'left', display: isHorizontal ? 'flex' : undefined, alignItems: isHorizontal ? 'center' : undefined, gap: isHorizontal ? `${ titleGap ?? 8 }px` : undefined, flexDirection: titlePosition === 'left' ? 'row' : titlePosition === 'right' ? 'row-reverse' : undefined } }
					role="img" aria-label={ `Rating: ${ rating ?? 4 } out of ${ scale ?? 5 }` }
					data-rating={ rating ?? 4 } data-scale={ scale ?? 5 }
				>
					{ title && titlePosition === 'above' && <p className="nx-rating-title" style={ { color: titleColor || undefined, marginBottom: `${ titleGap ?? 8 }px` } }>{ title }</p> }
					{ title && isHorizontal && <span className="nx-rating-title" style={ { color: titleColor || undefined } }>{ title }</span> }
					<StarDisplay rating={ rating ?? 4 } scale={ scale ?? 5 } iconType={ iconType ?? 'star' } iconSize={ iconSize ?? 24 } filledColor={ filledColor } emptyColor={ emptyColor } />
					{ title && titlePosition === 'below' && <p className="nx-rating-title" style={ { color: titleColor || undefined, marginTop: `${ titleGap ?? 8 }px` } }>{ title }</p> }
				</div>
			</div>
		</>
	);
}
