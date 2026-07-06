/**
 * Icon List — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, RangeControl, ToggleControl, ButtonGroup, Button } from '@wordpress/components';
import { TypographyControl, ColorControl, SpacingControl, AnimationControl, IconControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
const DEFAULT_ITEM = { iconClass: 'fa-solid fa-check', text: 'List item', link: '', iconColor: '' };

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { uniqueId, items, layout, alignment, itemSpacing, showDivider, dividerStyle, dividerWeight, dividerColor, dividerGap, defaultIconColor, iconSize, iconBgColor, iconBorderRadius, iconPadding, iconTextGap, textColor, textHoverColor, typography, cssId, cssClasses, margin, padding, animation } = attributes;
	useEffect( () => { const expected = `nx-${ clientId.slice( 0, 8 ) }`; if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } ); }, [ clientId ] );
	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined } );
	const listItems = items ?? [ DEFAULT_ITEM ];

	const updateItem = ( idx, key, val ) => {
		const next = listItems.map( ( it, i ) => i === idx ? { ...it, [ key ]: val } : it );
		setAttributes( { items: next } );
	};
	const addItem    = () => setAttributes( { items: [ ...listItems, { ...DEFAULT_ITEM } ] } );
	const removeItem = ( idx ) => setAttributes( { items: listItems.filter( ( _, i ) => i !== idx ) } );

	return (
		<>
			<InspectorControls>
				<DataAndSchemaPanel initialOpen={ true }>
					{ listItems.map( ( item, idx ) => (
						<div key={ idx } className="nx-repeater-item" style={ { border: '1px solid #ddd', padding: 8, marginBottom: 8, borderRadius: 4 } }>
							<IconControl label={ `${ __( 'Icon', 'nexus-blocks' ) } ${ idx + 1 }` } value={ item.iconClass ?? '' } onChange={ ( v ) => updateItem( idx, 'iconClass', v ) } />
							<TextControl label={ __( 'Text', 'nexus-blocks' ) } value={ item.text ?? '' } onChange={ ( v ) => updateItem( idx, 'text', v ) } />
							<TextControl label={ __( 'Link URL', 'nexus-blocks' ) } value={ item.link ?? '' } onChange={ ( v ) => updateItem( idx, 'link', v ) } />
							<ColorControl label={ __( 'Icon Color Override', 'nexus-blocks' ) } value={ item.iconColor ?? '' } onChange={ ( v ) => updateItem( idx, 'iconColor', v ) } />
							<Button isSmall isDestructive variant="tertiary" onClick={ () => removeItem( idx ) }>{ __( 'Remove', 'nexus-blocks' ) }</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addItem } style={ { marginBottom: 16 } }>{ __( '+ Add Item', 'nexus-blocks' ) }</Button>
					<SelectControl label={ __( 'Layout', 'nexus-blocks' ) } value={ layout ?? 'vertical' } options={ [ { label: 'Vertical', value: 'vertical' }, { label: 'Horizontal', value: 'horizontal' } ] } onChange={ ( v ) => setAttributes( { layout: v } ) } />
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>

				<TypographyPanel initialOpen={ false }>
					<ButtonGroup style={{ marginBottom: '16px', display: 'block' }}>{ [ 'left','center','right' ].map( ( a ) => <Button key={ a } isSmall variant={ alignment === a ? 'primary' : 'secondary' } onClick={ () => setAttributes( { alignment: a } ) }>{ a.charAt(0).toUpperCase()+a.slice(1) }</Button> ) }</ButtonGroup>
					<ColorControl label={ __( 'Text Color', 'nexus-blocks' ) } value={ textColor } onChange={ ( v ) => setAttributes( { textColor: v } ) } />
					<TypographyControl value={ typography } onChange={ ( v ) => setAttributes( { typography: v } ) } />
				</TypographyPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<RangeControl label={ __( 'Icon Size (px)', 'nexus-blocks' ) } value={ iconSize ?? 18 } onChange={ ( v ) => setAttributes( { iconSize: v } ) } min={ 10 } max={ 80 } />
					<TextControl label={ __( 'Icon Border Radius', 'nexus-blocks' ) } value={ iconBorderRadius ?? '' } onChange={ ( v ) => setAttributes( { iconBorderRadius: v } ) } />
					<RangeControl label={ __( 'Icon Padding (px)', 'nexus-blocks' ) } value={ iconPadding ?? 0 } onChange={ ( v ) => setAttributes( { iconPadding: v } ) } min={ 0 } max={ 24 } />
					<RangeControl label={ __( 'Icon-to-Text Gap (px)', 'nexus-blocks' ) } value={ iconTextGap ?? 10 } onChange={ ( v ) => setAttributes( { iconTextGap: v } ) } min={ 0 } max={ 48 } />
					<RangeControl label={ __( 'Space Between Items (px)', 'nexus-blocks' ) } value={ itemSpacing ?? 12 } onChange={ ( v ) => setAttributes( { itemSpacing: v } ) } min={ 0 } max={ 80 } />
					<ToggleControl label={ __( 'Divider Between Items', 'nexus-blocks' ) } checked={ !! showDivider } onChange={ ( v ) => setAttributes( { showDivider: v } ) } />
					{ showDivider && (
						<>
							<SelectControl label={ __( 'Divider Style', 'nexus-blocks' ) } value={ dividerStyle ?? 'solid' } options={ [ { label: 'Solid', value: 'solid' }, { label: 'Dashed', value: 'dashed' }, { label: 'Dotted', value: 'dotted' } ] } onChange={ ( v ) => setAttributes( { dividerStyle: v } ) } />
							<RangeControl label={ __( 'Divider Weight (px)', 'nexus-blocks' ) } value={ dividerWeight ?? 1 } onChange={ ( v ) => setAttributes( { dividerWeight: v } ) } min={ 1 } max={ 8 } />
						</>
					) }
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
					<SpacingControl label={ __( 'Padding', 'nexus-blocks' ) } value={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Default Icon Color', 'nexus-blocks' ) } value={ defaultIconColor } onChange={ ( v ) => setAttributes( { defaultIconColor: v } ) } />
					<ColorControl label={ __( 'Icon Background', 'nexus-blocks' ) } value={ iconBgColor } onChange={ ( v ) => setAttributes( { iconBgColor: v } ) } />
					{ showDivider && (
						<ColorControl label={ __( 'Divider Color', 'nexus-blocks' ) } value={ dividerColor } onChange={ ( v ) => setAttributes( { dividerColor: v } ) } />
					) }
				</ColorsAndBackgroundsPanel>

				<InteractionsPanel initialOpen={ false }>
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>
			</InspectorControls>
			<div { ...blockProps }>
				<ul className={ `nexus-icon-list nx-list-${ layout ?? 'vertical' }` }
					style={ { listStyle: 'none', padding: 0, margin: 0, display: layout === 'horizontal' ? 'flex' : undefined, flexWrap: 'wrap', gap: layout === 'horizontal' ? `${ itemSpacing ?? 12 }px` : undefined, textAlign: alignment ?? 'left' } }
				>
					{ listItems.map( ( item, idx ) => (
						<li key={ idx } className="nx-icon-list-item" style={ { marginBottom: layout !== 'horizontal' ? `${ itemSpacing ?? 12 }px` : undefined, borderBottom: showDivider && layout !== 'horizontal' ? `${ dividerWeight ?? 1 }px ${ dividerStyle ?? 'solid' } ${ dividerColor ?? '#E5E7EB' }` : undefined, paddingBottom: showDivider && layout !== 'horizontal' ? `${ itemSpacing ?? 12 }px` : undefined, display: 'flex', alignItems: 'center', gap: `${ iconTextGap ?? 10 }px` } }>
							{ item.iconClass && (
								<span className="nx-icon-list-icon" style={ { fontSize: `${ iconSize ?? 18 }px`, color: item.iconColor || defaultIconColor || 'var(--nx-color-primary,#7C3AED)', background: iconBgColor || undefined, borderRadius: iconBorderRadius || undefined, padding: iconPadding ? `${ iconPadding }px` : undefined, flexShrink: 0 } }>
									<i className={ item.iconClass } />
								</span>
							) }
							<span className="nx-icon-list-text" style={ { color: textColor || undefined } }>
								{ item.link ? <a href={ item.link } style={ { color: 'inherit', textDecoration: 'none' } }>{ item.text }</a> : item.text }
							</span>
						</li>
					) ) }
				</ul>
			</div>
		</>
	);
}
