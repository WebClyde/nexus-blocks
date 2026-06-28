/**
 * Tabs — Edit (InnerBlocks architecture)
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { TextControl, SelectControl, RangeControl } from '@wordpress/components';
import { generateUniqueId } from '../../hooks/useStyleOutput';
import { TypographyControl, ColorControl, BorderControl, SpacingControl, AnimationControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	DataAndSchemaPanel
} from '../../panels';
const TAB_LAYOUTS = [
	{ label: 'Top', value: 'top' },
	{ label: 'Bottom', value: 'bottom' },
	{ label: 'Left', value: 'left' },
	{ label: 'Right', value: 'right' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { uniqueId, activeTabId, defaultOpen, tabLayout, tabActivation, labelBgActive, labelTextActive, labelTypography, activeIndicator, indicatorColor, tabBorder, tabPadding, tabSpacing, contentBackground, contentBorder, contentPadding, margin, cssId, cssClasses, animation } = attributes;
	
	useEffect( () => { if ( ! uniqueId ) setAttributes( { uniqueId: generateUniqueId() } ); }, [] );
	
	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined } );

	const childBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getBlocks( clientId );
	}, [ clientId ] );

	// Initialize activeTabId to the first tab if empty
	useEffect( () => {
		if ( ! activeTabId && childBlocks.length > 0 ) {
			setAttributes( { activeTabId: childBlocks[0].attributes.tabId } );
		}
	}, [ childBlocks, activeTabId, setAttributes ] );

	// Use defaultOpen to determine the initial active tab on frontend load
	// We can update the UI to show which tab is set as default open
	const defaultActiveTabId = childBlocks[ defaultOpen ?? 0 ]?.attributes?.tabId;

	return (
		<>
			<InspectorControls>
				<InteractionsPanel initialOpen={ true }>
					<p style={ { color: '#666', fontSize: '13px', marginBottom: '16px' } }>
						{ __( 'Add, remove, or reorder Tab Items directly in the editor or List View.', 'nexus-blocks' ) }
					</p>
					<SelectControl label={ __( 'Layout', 'nexus-blocks' ) } value={ tabLayout ?? 'top' } options={ TAB_LAYOUTS } onChange={ ( v ) => setAttributes( { tabLayout: v } ) } />
					<SelectControl label={ __( 'Activation', 'nexus-blocks' ) } value={ tabActivation ?? 'click' } options={ [ { label: 'Click', value: 'click' }, { label: 'Hover', value: 'hover' } ] } onChange={ ( v ) => setAttributes( { tabActivation: v } ) } />
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>

				<TypographyPanel initialOpen={ false }>
					<TypographyControl label={ __( 'Label Typography', 'nexus-blocks' ) } value={ labelTypography } onChange={ ( v ) => setAttributes( { labelTypography: v } ) } />
				</TypographyPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<RangeControl label={ __( 'Space Between Tabs (px)', 'nexus-blocks' ) } value={ tabSpacing ?? 4 } onChange={ ( v ) => setAttributes( { tabSpacing: v } ) } min={ 0 } max={ 40 } />
					<SpacingControl label={ __( 'Tab Padding', 'nexus-blocks' ) } value={ tabPadding } onChange={ ( v ) => setAttributes( { tabPadding: v } ) } />
					<SpacingControl label={ __( 'Content Padding', 'nexus-blocks' ) } value={ contentPadding } onChange={ ( v ) => setAttributes( { contentPadding: v } ) } />
					<BorderControl value={ contentBorder } onChange={ ( v ) => setAttributes( { contentBorder: v } ) } />
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Active Text', 'nexus-blocks' ) } value={ labelTextActive } onChange={ ( v ) => setAttributes( { labelTextActive: v } ) } />
					<ColorControl label={ __( 'Active BG', 'nexus-blocks' ) } value={ labelBgActive } onChange={ ( v ) => setAttributes( { labelBgActive: v } ) } />
					<SelectControl label={ __( 'Active Indicator', 'nexus-blocks' ) } value={ activeIndicator ?? 'bottom' } options={ [ { label: 'Bottom Border', value: 'bottom' }, { label: 'Top Border', value: 'top' }, { label: 'Left Border', value: 'left' }, { label: 'Right Border', value: 'right' }, { label: 'Background Fill', value: 'fill' }, { label: 'None', value: 'none' } ] } onChange={ ( v ) => setAttributes( { activeIndicator: v } ) } />
					{ activeIndicator !== 'none' && activeIndicator !== 'fill' && (
						<ColorControl label={ __( 'Indicator Color', 'nexus-blocks' ) } value={ indicatorColor } onChange={ ( v ) => setAttributes( { indicatorColor: v } ) } />
					) }
					<ColorControl label={ __( 'Content Background', 'nexus-blocks' ) } value={ contentBackground } onChange={ ( v ) => setAttributes( { contentBackground: v } ) } />
				</ColorsAndBackgroundsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<RangeControl label={ __( 'Default Open Tab (Index)', 'nexus-blocks' ) } value={ defaultOpen ?? 0 } onChange={ ( v ) => setAttributes( { defaultOpen: v } ) } min={ 0 } max={ Math.max( 0, childBlocks.length - 1 ) } />
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>
			<div { ...blockProps }>
				<div className={ `nexus-tabs nx-tabs-${ tabLayout ?? 'top' }` } data-activation={ tabActivation ?? 'click' } style={ { display: 'flex', flexDirection: tabLayout === 'left' ? 'row' : tabLayout === 'right' ? 'row-reverse' : tabLayout === 'bottom' ? 'column-reverse' : 'column' } }>
					<div className="nx-tab-labels" role="tablist" style={ { display: 'flex', flexDirection: ( tabLayout === 'left' || tabLayout === 'right' ) ? 'column' : 'row', gap: `${ tabSpacing ?? 4 }px` } }>
						{ childBlocks.map( ( block ) => {
							const isCurrent = activeTabId === block.attributes.tabId;
							return (
								<button key={ block.clientId }
									className={ `nx-tab-label${ isCurrent ? ' is-active' : '' }` }
									role="tab"
									onClick={ () => setAttributes( { activeTabId: block.attributes.tabId } ) }
									style={ {
										background: isCurrent ? ( labelBgActive || 'var(--nx-color-primary,#7C3AED)' ) : undefined,
										color:      isCurrent ? ( labelTextActive || '#fff' ) : undefined,
										padding:    '10px 20px',
										border:     'none', cursor: 'pointer', textAlign: 'left',
										borderBottom: activeIndicator === 'bottom' && isCurrent ? `3px solid ${ indicatorColor || 'var(--nx-color-primary,#7C3AED)' }` : undefined,
										borderTop:    activeIndicator === 'top' && isCurrent ? `3px solid ${ indicatorColor || 'var(--nx-color-primary,#7C3AED)' }` : undefined,
										borderLeft:   activeIndicator === 'left' && isCurrent ? `3px solid ${ indicatorColor || 'var(--nx-color-primary,#7C3AED)' }` : undefined,
										borderRight:  activeIndicator === 'right' && isCurrent ? `3px solid ${ indicatorColor || 'var(--nx-color-primary,#7C3AED)' }` : undefined,
									} }
								>
									{ block.attributes.iconClass && <i className={ block.attributes.iconClass } style={ { marginRight: 6 } } /> }
									{ block.attributes.label || __( 'Unnamed Tab', 'nexus-blocks' ) }
								</button>
							);
						} ) }
						{ childBlocks.length === 0 && (
							<div style={ { padding: '10px 20px', background: '#f0f0f0', color: '#666' } }>
								{ __( 'No tabs yet. Add a tab below.', 'nexus-blocks' ) }
							</div>
						) }
					</div>
					<div className="nx-tab-panels" style={ { flex: 1, background: contentBackground || undefined, padding: '20px', border: contentBorder?.style && contentBorder?.style !== 'none' ? `${ contentBorder.width ?? '1px' } ${ contentBorder.style } ${ contentBorder.color ?? '#E5E7EB' }` : undefined } }>
						<InnerBlocks
							allowedBlocks={ [ 'nexus-blocks/tab-item' ] }
							template={ [
								[ 'nexus-blocks/tab-item', { label: 'Tab 1' } ],
								[ 'nexus-blocks/tab-item', { label: 'Tab 2' } ],
							] }
							renderAppender={ () => <InnerBlocks.ButtonBlockAppender /> }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
