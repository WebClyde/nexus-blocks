/**
 * Divider — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, TextControl, ButtonGroup, Button } from '@wordpress/components';
import { ColorControl, SpacingControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';

const DIVIDER_STYLES = [
	{ label: 'Solid', value: 'solid' }, { label: 'Dashed', value: 'dashed' },
	{ label: 'Dotted', value: 'dotted' }, { label: 'Double', value: 'double' },
];
const ELEMENTS = [
	{ label: 'None', value: 'none' }, { label: 'Text', value: 'text' }, { label: 'Icon', value: 'icon' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { uniqueId, dividerStyle, dividerWidth, alignment, element, elementText, elementIcon, dividerColor, dividerWeight, gapAbove, gapBelow, textColor, iconColor, iconSize, cssId, cssClasses } = attributes;
	useEffect( () => { const expected = `nx-${ clientId.slice( 0, 8 ) }`; if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } ); }, [ clientId ] );
	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined, style: { textAlign: alignment ?? 'center', paddingTop: gapAbove ? `${ gapAbove }px` : undefined, paddingBottom: gapBelow ? `${ gapBelow }px` : undefined } } );
	const lineStyle = { borderTopStyle: dividerStyle ?? 'solid', borderTopWidth: `${ dividerWeight ?? 1 }px`, borderTopColor: dividerColor ?? '#E5E7EB', width: dividerWidth ?? '100%', display: 'inline-block', verticalAlign: 'middle' };
	return (
		<>
			<InspectorControls>
				<SizeAndSpacingPanel initialOpen={ true }>
					<SelectControl label={ __( 'Style', 'nexus-blocks' ) } value={ dividerStyle ?? 'solid' } options={ DIVIDER_STYLES } onChange={ ( v ) => setAttributes( { dividerStyle: v } ) } />
					<TextControl label={ __( 'Width', 'nexus-blocks' ) } value={ dividerWidth ?? '100%' } onChange={ ( v ) => setAttributes( { dividerWidth: v } ) } />
					<RangeControl label={ __( 'Weight (px)', 'nexus-blocks' ) } value={ dividerWeight ?? 1 } onChange={ ( v ) => setAttributes( { dividerWeight: v } ) } min={ 1 } max={ 20 } />
					<RangeControl label={ __( 'Gap Above (px)', 'nexus-blocks' ) } value={ gapAbove ?? 16 } onChange={ ( v ) => setAttributes( { gapAbove: v } ) } min={ 0 } max={ 200 } />
					<RangeControl label={ __( 'Gap Below (px)', 'nexus-blocks' ) } value={ gapBelow ?? 16 } onChange={ ( v ) => setAttributes( { gapBelow: v } ) } min={ 0 } max={ 200 } />
					<ButtonGroup style={{ marginBottom: '16px', display: 'block' }}>{ [ 'left', 'center', 'right' ].map( ( a ) => <Button key={ a } isSmall variant={ alignment === a ? 'primary' : 'secondary' } onClick={ () => setAttributes( { alignment: a } ) }>{ a.charAt(0).toUpperCase() + a.slice(1) }</Button> ) }</ButtonGroup>
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Divider Color', 'nexus-blocks' ) } value={ dividerColor } onChange={ ( v ) => setAttributes( { dividerColor: v } ) } />
					{ element === 'text' && <ColorControl label={ __( 'Text Color', 'nexus-blocks' ) } value={ textColor } onChange={ ( v ) => setAttributes( { textColor: v } ) } /> }
					{ element === 'icon' && <ColorControl label={ __( 'Icon Color', 'nexus-blocks' ) } value={ iconColor } onChange={ ( v ) => setAttributes( { iconColor: v } ) } /> }
				</ColorsAndBackgroundsPanel>

				<TypographyPanel initialOpen={ false }>
					{ element === 'text' && <TextControl label={ __( 'Text', 'nexus-blocks' ) } value={ elementText ?? '' } onChange={ ( v ) => setAttributes( { elementText: v } ) } /> }
				</TypographyPanel>

				<MediaAndVectorPanel initialOpen={ false }>
					{ element === 'icon' && (
						<>
							<TextControl label={ __( 'Icon Class', 'nexus-blocks' ) } value={ elementIcon ?? '' } onChange={ ( v ) => setAttributes( { elementIcon: v } ) } />
							<RangeControl label={ __( 'Icon Size (px)', 'nexus-blocks' ) } value={ iconSize ?? 20 } onChange={ ( v ) => setAttributes( { iconSize: v } ) } min={ 10 } max={ 80 } />
						</>
					) }
				</MediaAndVectorPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<SelectControl label={ __( 'Element', 'nexus-blocks' ) } value={ element ?? 'none' } options={ ELEMENTS } onChange={ ( v ) => setAttributes( { element: v } ) } />
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="nexus-divider" style={ { display: 'flex', alignItems: 'center', gap: '12px' } }>
					<span style={ lineStyle } />
					{ ( element === 'text' && elementText ) && <span className="nx-divider-text" style={ { color: textColor, whiteSpace: 'nowrap' } }>{ elementText }</span> }
					{ ( element === 'icon' && elementIcon ) && <i className={ elementIcon } style={ { color: iconColor, fontSize: `${ iconSize ?? 20 }px` } } /> }
					{ element !== 'none' && <span style={ lineStyle } /> }
				</div>
			</div>
		</>
	);
}
