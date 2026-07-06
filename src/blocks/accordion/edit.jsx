/**
 * Accordion — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, RangeControl, ToggleControl, Button } from '@wordpress/components';
import { TypographyControl, ColorControl, BackgroundControl, BorderControl, SpacingControl, AnimationControl, IconControl } from '../../controls';
import { useStyleOutput } from '../../hooks/useStyleOutput';
import { buildAccordionRules } from './style';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
const DEFAULT_ITEMS = [
	{ title: 'What is Nexus Blocks?', content: 'Nexus Blocks is an advanced Gutenberg block plugin.' },
	{ title: 'How do I install it?', content: 'Upload the plugin and activate it from your WordPress admin.' },
	{ title: 'Is it free?', content: 'Phase 1 blocks are free. Pro blocks are available in Nexus Blocks Pro.' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { uniqueId, items, defaultOpen, openIconClass, closeIconClass, iconPosition, faqSchema, headerBgActive, titleColor, titleColorActive, titleTypography, contentTypography, headerBorder, headerBorderBetween, headerPadding, iconColor, iconColorActive, iconSize, iconBgActive, iconBorderRadius, contentBackground, contentPadding, contentBorder, margin, padding, itemGap, titleContentGap, cssId, cssClasses, animation, width, maxWidth, minHeight, overflow } = attributes;
	useEffect( () => {
		const expected = `nx-${ clientId.slice( 0, 8 ) }`;
		if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } );
	}, [ clientId ] );
	const [ openIdx, setOpenIdx ] = useState( defaultOpen ?? -1 );
	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined } );
	const scopedCss = useStyleOutput( uniqueId, buildAccordionRules, attributes );
	const listItems = items ?? DEFAULT_ITEMS;

	const updateItem = ( idx, key, val ) => setAttributes( { items: listItems.map( ( it, i ) => i === idx ? { ...it, [ key ]: val } : it ) } );
	const addItem    = () => setAttributes( { items: [ ...listItems, { title: 'New Question', content: 'Your answer here.' } ] } );
	const removeItem = ( idx ) => setAttributes( { items: listItems.filter( ( _, i ) => i !== idx ) } );

	return (
		<>
			<InspectorControls>
				<DataAndSchemaPanel initialOpen={ true }>
					{ listItems.map( ( item, idx ) => (
						<div key={ idx } style={ { border: '1px solid #ddd', padding: 8, marginBottom: 8, borderRadius: 4 } }>
							<TextControl label={ __( 'Title', 'nexus-blocks' ) } value={ item.title ?? '' } onChange={ ( v ) => updateItem( idx, 'title', v ) } />
							<TextControl label={ __( 'Content', 'nexus-blocks' ) } value={ item.content ?? '' } onChange={ ( v ) => updateItem( idx, 'content', v ) } />
							<Button isSmall isDestructive variant="tertiary" onClick={ () => removeItem( idx ) }>{ __( 'Remove', 'nexus-blocks' ) }</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addItem } style={ { marginBottom: 16 } }>{ __( '+ Add Item', 'nexus-blocks' ) }</Button>
					<ToggleControl label={ __( 'Output FAQ Schema (JSON-LD)', 'nexus-blocks' ) } checked={ !! faqSchema } onChange={ ( v ) => setAttributes( { faqSchema: v } ) } />
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>

				<TypographyPanel initialOpen={ false }>
					<TypographyControl label={ __( 'Title Typography', 'nexus-blocks' ) } value={ titleTypography } onChange={ ( v ) => setAttributes( { titleTypography: v } ) } />
					<TypographyControl label={ __( 'Content Typography', 'nexus-blocks' ) } value={ contentTypography } onChange={ ( v ) => setAttributes( { contentTypography: v } ) } />
				</TypographyPanel>

				<MediaAndVectorPanel initialOpen={ false }>
					<IconControl label={ __( 'Open Icon', 'nexus-blocks' ) } value={ openIconClass ?? 'fa-solid fa-chevron-down' } onChange={ ( v ) => setAttributes( { openIconClass: v } ) } />
					<IconControl label={ __( 'Close Icon', 'nexus-blocks' ) } value={ closeIconClass ?? 'fa-solid fa-chevron-up' } onChange={ ( v ) => setAttributes( { closeIconClass: v } ) } />
					<SelectControl label={ __( 'Icon Position', 'nexus-blocks' ) } value={ iconPosition ?? 'right' } options={ [ { label: 'Left', value: 'left' }, { label: 'Right', value: 'right' } ] } onChange={ ( v ) => setAttributes( { iconPosition: v } ) } />
					<RangeControl label={ __( 'Icon Size (px)', 'nexus-blocks' ) } value={ iconSize ?? 16 } onChange={ ( v ) => setAttributes( { iconSize: v } ) } min={ 10 } max={ 40 } />
				</MediaAndVectorPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Title Color', 'nexus-blocks' ) } value={ titleColor } onChange={ ( v ) => setAttributes( { titleColor: v } ) } />
					<ColorControl label={ __( 'Active Title Color', 'nexus-blocks' ) } value={ titleColorActive } onChange={ ( v ) => setAttributes( { titleColorActive: v } ) } />
					<ColorControl label={ __( 'Header Active BG', 'nexus-blocks' ) } value={ headerBgActive } onChange={ ( v ) => setAttributes( { headerBgActive: v } ) } />
					<ColorControl label={ __( 'Icon Color', 'nexus-blocks' ) } value={ iconColor } onChange={ ( v ) => setAttributes( { iconColor: v } ) } />
					<ColorControl label={ __( 'Icon Active Color', 'nexus-blocks' ) } value={ iconColorActive } onChange={ ( v ) => setAttributes( { iconColorActive: v } ) } />
					<BackgroundControl value={ contentBackground } onChange={ ( v ) => setAttributes( { contentBackground: v } ) } />
				</ColorsAndBackgroundsPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<TextControl label={ __( 'Width (e.g. 100%, 500px)', 'nexus-blocks' ) } value={ width } onChange={ ( v ) => setAttributes( { width: v } ) } />
					<TextControl label={ __( 'Max Width (e.g. 800px)', 'nexus-blocks' ) } value={ maxWidth } onChange={ ( v ) => setAttributes( { maxWidth: v } ) } />
					<TextControl label={ __( 'Min Height (e.g. 300px)', 'nexus-blocks' ) } value={ minHeight } onChange={ ( v ) => setAttributes( { minHeight: v } ) } />
					<SelectControl label={ __( 'Overflow', 'nexus-blocks' ) } value={ overflow || 'visible' } options={ [ { label: 'Visible', value: 'visible' }, { label: 'Hidden', value: 'hidden' }, { label: 'Scroll', value: 'scroll' }, { label: 'Auto', value: 'auto' } ] } onChange={ ( v ) => setAttributes( { overflow: v } ) } />
					<SpacingControl label={ __( 'Outer Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
					<SpacingControl label={ __( 'Outer Padding', 'nexus-blocks' ) } value={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
					<hr style={ { margin: '24px 0', border: 'none', borderTop: '1px solid #ddd' } } />
					<RangeControl label={ __( 'Item Gap (px)', 'nexus-blocks' ) } value={ itemGap ?? 0 } onChange={ ( v ) => setAttributes( { itemGap: v } ) } min={ 0 } max={ 100 } />
					<RangeControl label={ __( 'Title-Content Gap (px)', 'nexus-blocks' ) } value={ titleContentGap ?? 0 } onChange={ ( v ) => setAttributes( { titleContentGap: v } ) } min={ 0 } max={ 100 } />
					<BorderControl value={ headerBorder } onChange={ ( v ) => setAttributes( { headerBorder: v } ) } />
					<BorderControl value={ contentBorder } onChange={ ( v ) => setAttributes( { contentBorder: v } ) } />
					<SpacingControl label={ __( 'Header Padding (Inner)', 'nexus-blocks' ) } value={ headerPadding } onChange={ ( v ) => setAttributes( { headerPadding: v } ) } />
					<SpacingControl label={ __( 'Content Padding (Inner)', 'nexus-blocks' ) } value={ contentPadding } onChange={ ( v ) => setAttributes( { contentPadding: v } ) } />
				</SizeAndSpacingPanel>

				<InteractionsPanel initialOpen={ false }>
					<RangeControl label={ __( 'Default Open (-1 = none)', 'nexus-blocks' ) } value={ defaultOpen ?? -1 } onChange={ ( v ) => setAttributes( { defaultOpen: v } ) } min={ -1 } max={ listItems.length - 1 } />
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>
			</InspectorControls>
			<div { ...blockProps }>
				{ scopedCss && <style>{ scopedCss }</style> }
				<div className="nexus-accordion">
					{ listItems.map( ( item, idx ) => {
						const isOpen = openIdx === idx;
						return (
							<div key={ idx } className={ `nx-accordion-item${ isOpen ? ' is-open' : '' }` }>
								<button
									className="nx-accordion-header"
									aria-expanded={ isOpen }
									onClick={ () => setOpenIdx( isOpen ? -1 : idx ) }
									style={ { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer', textAlign: 'left' } }
								>
									{ iconPosition === 'left' && (
										<>
											<i className={ `nx-accordion-icon-closed ${ openIconClass || 'fa-solid fa-chevron-down' }` } style={ { marginRight: 12 } } />
											<i className={ `nx-accordion-icon-opened ${ closeIconClass || 'fa-solid fa-chevron-up' }` } style={ { marginRight: 12 } } />
										</>
									) }
									<span style={ { flex: 1 } }>{ item.title }</span>
									{ iconPosition !== 'left' && (
										<>
											<i className={ `nx-accordion-icon-closed ${ openIconClass || 'fa-solid fa-chevron-down' }` } style={ { marginLeft: 12 } } />
											<i className={ `nx-accordion-icon-opened ${ closeIconClass || 'fa-solid fa-chevron-up' }` } style={ { marginLeft: 12 } } />
										</>
									) }
								</button>
								{ isOpen && (
									<div className="nx-accordion-content">
										<div className="nx-accordion-content-inner">
											<p style={ { margin: 0 } }>{ item.content }</p>
										</div>
									</div>
								) }
							</div>
						);
					} ) }
				</div>
			</div>
		</>
	);
}
