/**
 * Counter — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, RangeControl, ToggleControl, ButtonGroup, Button } from '@wordpress/components';
import { generateUniqueId } from '../../hooks/useStyleOutput';
import { TypographyControl, ColorControl, BackgroundControl, BorderControl, BoxShadowControl, SpacingControl, AnimationControl, IconControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
const SEPARATORS = [ { label: 'None', value: '' }, { label: 'Comma', value: ',' }, { label: 'Period', value: '.' } ];
const ANIM_TYPES = [ { label: 'Count Up', value: 'countup' }, { label: 'Odometer', value: 'odometer' } ];
const TITLE_POS  = [ { label: 'Above', value: 'above' }, { label: 'Below', value: 'below' } ];

export default function Edit( { attributes, setAttributes } ) {
	const { uniqueId, startNumber, endNumber, prefix, suffix, duration, separator, decimalPlaces, animationType, title, titlePosition, iconClass, numberColor, numberTypography, prefixSuffixColor, prefixSuffixTypography, titleColor, titleTypography, titleSpacing, iconColor, iconSize, iconSpacing, background, border, borderRadius, boxShadow, cardPadding, alignment, margin, cssId, cssClasses, animation } = attributes;
	const [ count, setCount ] = useState( startNumber ?? 0 );
	useEffect( () => { if ( ! uniqueId ) setAttributes( { uniqueId: generateUniqueId() } ); }, [] );
	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined } );
	const end = endNumber ?? 1000;
	const start = startNumber ?? 0;
	const dur = duration ?? 2000;

	useEffect( () => {
		let startTime = null;
		let animationFrame;
		const step = ( timestamp ) => {
			if ( ! startTime ) startTime = timestamp;
			const progress = Math.min( ( timestamp - startTime ) / dur, 1 );
			// ease out quart
			const easeProgress = 1 - Math.pow( 1 - progress, 4 );
			setCount( start + ( end - start ) * easeProgress );
			if ( progress < 1 ) {
				animationFrame = requestAnimationFrame( step );
			} else {
				setCount( end );
			}
		};
		animationFrame = requestAnimationFrame( step );
		return () => cancelAnimationFrame( animationFrame );
	}, [ start, end, dur ] );

	const formatNumber = ( num ) => {
		let n = Number( num ).toFixed( decimalPlaces ?? 0 );
		if ( separator === ',' ) return Number( n ).toLocaleString( 'en-US', { minimumFractionDigits: decimalPlaces ?? 0, maximumFractionDigits: decimalPlaces ?? 0 } );
		if ( separator === '.' ) return Number( n ).toLocaleString( 'de-DE', { minimumFractionDigits: decimalPlaces ?? 0, maximumFractionDigits: decimalPlaces ?? 0 } );
		return n;
	};

	return (
		<>
			<InspectorControls>
				<DataAndSchemaPanel initialOpen={ true }>
					<RangeControl label={ __( 'Starting Number', 'nexus-blocks' ) } value={ startNumber ?? 0 } onChange={ ( v ) => setAttributes( { startNumber: v } ) } min={ 0 } max={ 99999 } />
					<RangeControl label={ __( 'Ending Number', 'nexus-blocks' ) } value={ end } onChange={ ( v ) => setAttributes( { endNumber: v } ) } min={ 0 } max={ 999999 } />
					<TextControl label={ __( 'Prefix (e.g. $)', 'nexus-blocks' ) } value={ prefix ?? '' } onChange={ ( v ) => setAttributes( { prefix: v } ) } />
					<TextControl label={ __( 'Suffix (e.g. +)', 'nexus-blocks' ) } value={ suffix ?? '' } onChange={ ( v ) => setAttributes( { suffix: v } ) } />
					<SelectControl label={ __( 'Separator', 'nexus-blocks' ) } value={ separator ?? '' } options={ SEPARATORS } onChange={ ( v ) => setAttributes( { separator: v } ) } />
					<RangeControl label={ __( 'Decimal Places', 'nexus-blocks' ) } value={ decimalPlaces ?? 0 } onChange={ ( v ) => setAttributes( { decimalPlaces: v } ) } min={ 0 } max={ 4 } />
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>

				<TypographyPanel initialOpen={ false }>
					<TextControl label={ __( 'Title / Label', 'nexus-blocks' ) } value={ title ?? '' } onChange={ ( v ) => setAttributes( { title: v } ) } />
					<SelectControl label={ __( 'Title Position', 'nexus-blocks' ) } value={ titlePosition ?? 'below' } options={ TITLE_POS } onChange={ ( v ) => setAttributes( { titlePosition: v } ) } />
					<ButtonGroup style={{ marginBottom: '16px', display: 'block' }}>{ [ 'left','center','right' ].map( ( a ) => <Button key={ a } isSmall variant={ alignment === a ? 'primary' : 'secondary' } onClick={ () => setAttributes( { alignment: a } ) }>{ a.charAt(0).toUpperCase()+a.slice(1) }</Button> ) }</ButtonGroup>
					<ColorControl label={ __( 'Title Color', 'nexus-blocks' ) } value={ titleColor } onChange={ ( v ) => setAttributes( { titleColor: v } ) } />
					<TypographyControl label={ __( 'Title', 'nexus-blocks' ) } value={ titleTypography } onChange={ ( v ) => setAttributes( { titleTypography: v } ) } />
					<RangeControl label={ __( 'Title Spacing (px)', 'nexus-blocks' ) } value={ titleSpacing ?? 8 } onChange={ ( v ) => setAttributes( { titleSpacing: v } ) } min={ 0 } max={ 48 } />
					<ColorControl label={ __( 'Number Color', 'nexus-blocks' ) } value={ numberColor } onChange={ ( v ) => setAttributes( { numberColor: v } ) } />
					<TypographyControl label={ __( 'Number', 'nexus-blocks' ) } value={ numberTypography } onChange={ ( v ) => setAttributes( { numberTypography: v } ) } />
					<ColorControl label={ __( 'Prefix/Suffix Color', 'nexus-blocks' ) } value={ prefixSuffixColor } onChange={ ( v ) => setAttributes( { prefixSuffixColor: v } ) } />
				</TypographyPanel>

				<MediaAndVectorPanel initialOpen={ false }>
					<IconControl label={ __( 'Icon', 'nexus-blocks' ) } value={ iconClass ?? '' } onChange={ ( v ) => setAttributes( { iconClass: v } ) } />
					{ iconClass && (
						<>
							<ColorControl label={ __( 'Icon Color', 'nexus-blocks' ) } value={ iconColor } onChange={ ( v ) => setAttributes( { iconColor: v } ) } />
							<RangeControl label={ __( 'Icon Size (px)', 'nexus-blocks' ) } value={ iconSize ?? 40 } onChange={ ( v ) => setAttributes( { iconSize: v } ) } min={ 16 } max={ 100 } />
							<RangeControl label={ __( 'Icon Spacing (px)', 'nexus-blocks' ) } value={ iconSpacing ?? 12 } onChange={ ( v ) => setAttributes( { iconSpacing: v } ) } min={ 0 } max={ 48 } />
						</>
					) }
				</MediaAndVectorPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<BorderControl value={ border } onChange={ ( v ) => setAttributes( { border: v } ) } showRadius={ false } />
					<TextControl label={ __( 'Border Radius', 'nexus-blocks' ) } value={ borderRadius ?? '' } onChange={ ( v ) => setAttributes( { borderRadius: v } ) } />
					<BoxShadowControl value={ boxShadow } onChange={ ( v ) => setAttributes( { boxShadow: v } ) } />
					<SpacingControl label={ __( 'Padding', 'nexus-blocks' ) } value={ cardPadding } onChange={ ( v ) => setAttributes( { cardPadding: v } ) } />
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
				</ColorsAndBackgroundsPanel>

				<InteractionsPanel initialOpen={ false }>
					<RangeControl label={ __( 'Duration (ms)', 'nexus-blocks' ) } value={ duration ?? 2000 } onChange={ ( v ) => setAttributes( { duration: v } ) } min={ 500 } max={ 5000 } step={ 100 } />
					<SelectControl label={ __( 'Animation Type', 'nexus-blocks' ) } value={ animationType ?? 'countup' } options={ ANIM_TYPES } onChange={ ( v ) => setAttributes( { animationType: v } ) } />
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>
			</InspectorControls>
			<div { ...blockProps }>
				<div className={ `nexus-counter nx-anim-${ animationType ?? 'countup' }` }
					data-start={ startNumber ?? 0 }
					data-end={ end }
					data-duration={ duration ?? 2000 }
					data-separator={ separator ?? '' }
					data-decimals={ decimalPlaces ?? 0 }
					style={ { textAlign: alignment ?? 'center', padding: '24px', borderRadius: borderRadius || undefined } }
				>
					{ iconClass && titlePosition !== 'below' && <i className={ iconClass } style={ { fontSize: `${ iconSize ?? 40 }px`, color: iconColor || 'var(--nx-color-primary,#7C3AED)', display: 'block', marginBottom: `${ iconSpacing ?? 12 }px` } } /> }
					{ title && titlePosition === 'above' && <p className="nx-counter-title" style={ { color: titleColor || undefined, marginBottom: `${ titleSpacing ?? 8 }px` } }>{ title }</p> }
					<div className="nx-counter-number" style={ { color: numberColor || 'var(--nx-color-primary,#7C3AED)', fontSize: numberTypography?.fontSize || '3rem', fontWeight: numberTypography?.fontWeight || '700' } }>
						{ prefix && <span className="nx-counter-prefix" style={ { color: prefixSuffixColor || undefined } }>{ prefix }</span> }
						<span className="nx-counter-value">{ formatNumber( count ) }</span>
						{ suffix && <span className="nx-counter-suffix" style={ { color: prefixSuffixColor || undefined } }>{ suffix }</span> }
					</div>
					{ title && titlePosition !== 'above' && <p className="nx-counter-title" style={ { color: titleColor || undefined, marginTop: `${ titleSpacing ?? 8 }px` } }>{ title }</p> }
				</div>
			</div>
		</>
	);
}
