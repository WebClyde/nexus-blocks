/**
 * Alert / Notice — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, RangeControl, ToggleControl } from '@wordpress/components';
import { generateUniqueId } from '../../hooks/useStyleOutput';
import { TypographyControl, ColorControl, BorderControl, BoxShadowControl, BackgroundControl, backgroundToStyle, backgroundHoverToCSS, SpacingControl, AnimationControl, IconControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	MediaAndVectorPanel,
	DataAndSchemaPanel
} from '../../panels';
const ALERT_TYPES = [
	{ label: 'Info (Blue)',     value: 'info' },
	{ label: 'Success (Green)', value: 'success' },
	{ label: 'Warning (Yellow)',value: 'warning' },
	{ label: 'Danger (Red)',    value: 'danger' },
	{ label: 'Custom',          value: 'custom' },
];

const TYPE_DEFAULTS = {
	info:    { bg: '#EFF6FF', text: '#1D4ED8', icon: 'fa-solid fa-info-circle', border: '#BFDBFE' },
	success: { bg: '#F0FDF4', text: '#15803D', icon: 'fa-solid fa-check', border: '#BBF7D0' },
	warning: { bg: '#FFFBEB', text: '#B45309', icon: 'fa-solid fa-exclamation-triangle', border: '#FDE68A' },
	danger:  { bg: '#FEF2F2', text: '#B91C1C', icon: 'fa-solid fa-times', border: '#FECACA' },
	custom:  { bg: '#F9FAFB', text: '#111827', icon: 'fa-solid fa-info-circle', border: '#E5E7EB' },
};

export default function Edit( { attributes, setAttributes } ) {
	const { uniqueId, alertType, title, description, iconClass, showIcon, dismissible, dismissCookie, cookieDuration, background, textColor, iconColor, iconSize, border, borderLeftAccent, borderLeftAccentColor, borderLeftAccentWidth, borderRadius, boxShadow, padding, titleTypography, descTypography, titleColorOverride, dismissBtnColor, cssId, cssClasses, margin, animation } = attributes;
	useEffect( () => { if ( ! uniqueId ) setAttributes( { uniqueId: generateUniqueId() } ); }, [] );
	const [ dismissed, setDismissed ] = useState( false );
	if ( dismissed ) return null;

	const type     = alertType ?? 'info';
	const defaults = TYPE_DEFAULTS[ type ] ?? TYPE_DEFAULTS.custom;
	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined } );

	const alertStyle = {
		background:   defaults.bg,
		...backgroundToStyle( background ),
		color:        textColor || defaults.text,
		borderRadius: borderRadius ?? '6px',
		padding:      padding ? `${ padding.top ?? 16 }px ${ padding.right ?? 20 }px ${ padding.bottom ?? 16 }px ${ padding.left ?? 20 }px` : '16px 20px',
		borderLeft:   borderLeftAccent ? `${ borderLeftAccentWidth ?? 4 }px solid ${ borderLeftAccentColor || defaults.border }` : undefined,
		border:       border?.style && border?.style !== 'none' ? `${ border.width ?? '1px' } ${ border.style } ${ border.color ?? defaults.border }` : `1px solid ${ defaults.border }`,
		position:     'relative',
	};
	const hoverCss = backgroundHoverToCSS( uniqueId, background, ' .nexus-alert' );

	return (
		<>
			<InspectorControls>
				<TypographyPanel initialOpen={ true }>
					<TextControl label={ __( 'Title', 'nexus-blocks' ) } value={ title ?? '' } onChange={ ( v ) => setAttributes( { title: v } ) } />
					<TypographyControl label={ __( 'Title Typography', 'nexus-blocks' ) } value={ titleTypography } onChange={ ( v ) => setAttributes( { titleTypography: v } ) } />
					<TypographyControl label={ __( 'Description Typography', 'nexus-blocks' ) } value={ descTypography } onChange={ ( v ) => setAttributes( { descTypography: v } ) } />
				</TypographyPanel>

				<MediaAndVectorPanel initialOpen={ false }>
					<ToggleControl label={ __( 'Show Icon', 'nexus-blocks' ) } checked={ showIcon !== false } onChange={ ( v ) => setAttributes( { showIcon: v } ) } />
					{ showIcon !== false && (
						<>
							<IconControl label={ __( 'Icon', 'nexus-blocks' ) } value={ iconClass ?? defaults.icon } onChange={ ( v ) => setAttributes( { iconClass: v } ) } />
							<RangeControl label={ __( 'Icon Size (px)', 'nexus-blocks' ) } value={ iconSize ?? 20 } onChange={ ( v ) => setAttributes( { iconSize: v } ) } min={ 12 } max={ 60 } />
						</>
					) }
				</MediaAndVectorPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					<BorderControl value={ border } onChange={ ( v ) => setAttributes( { border: v } ) } showRadius={ false } />
					<ToggleControl label={ __( 'Left Accent Border', 'nexus-blocks' ) } checked={ !! borderLeftAccent } onChange={ ( v ) => setAttributes( { borderLeftAccent: v } ) } />
					{ borderLeftAccent && (
						<RangeControl label={ __( 'Accent Width (px)', 'nexus-blocks' ) } value={ borderLeftAccentWidth ?? 4 } onChange={ ( v ) => setAttributes( { borderLeftAccentWidth: v } ) } min={ 1 } max={ 16 } />
					) }
					<TextControl label={ __( 'Border Radius', 'nexus-blocks' ) } value={ borderRadius ?? '6px' } onChange={ ( v ) => setAttributes( { borderRadius: v } ) } />
					<BoxShadowControl value={ boxShadow } onChange={ ( v ) => setAttributes( { boxShadow: v } ) } />
					<SpacingControl label={ __( 'Padding', 'nexus-blocks' ) } value={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
				</SizeAndSpacingPanel>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<SelectControl label={ __( 'Preset Theme', 'nexus-blocks' ) } value={ type } options={ ALERT_TYPES } onChange={ ( v ) => setAttributes( { alertType: v } ) } />
					<BackgroundControl value={ background } onChange={ ( v ) => setAttributes( { background: v } ) } />
					<ColorControl label={ __( 'Text Color', 'nexus-blocks' ) } value={ textColor } onChange={ ( v ) => setAttributes( { textColor: v } ) } />
					<ColorControl label={ __( 'Icon Color', 'nexus-blocks' ) } value={ iconColor } onChange={ ( v ) => setAttributes( { iconColor: v } ) } />
					{ borderLeftAccent && (
						<ColorControl label={ __( 'Accent Color', 'nexus-blocks' ) } value={ borderLeftAccentColor } onChange={ ( v ) => setAttributes( { borderLeftAccentColor: v } ) } />
					) }
				</ColorsAndBackgroundsPanel>

				<InteractionsPanel initialOpen={ false }>
					<ToggleControl label={ __( 'Dismissible', 'nexus-blocks' ) } checked={ !! dismissible } onChange={ ( v ) => setAttributes( { dismissible: v } ) } />
					{ dismissible && (
						<>
							<ToggleControl label={ __( 'Remember Dismiss (Cookie)', 'nexus-blocks' ) } checked={ !! dismissCookie } onChange={ ( v ) => setAttributes( { dismissCookie: v } ) } />
							{ dismissCookie && <RangeControl label={ __( 'Cookie Duration (days)', 'nexus-blocks' ) } value={ cookieDuration ?? 30 } onChange={ ( v ) => setAttributes( { cookieDuration: v } ) } min={ 1 } max={ 365 } /> }
						</>
					) }
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>

				<DataAndSchemaPanel initialOpen={ false }>
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ `nexus-alert nx-alert-${ type }` } style={ alertStyle }>
					{ hoverCss && <style>{ hoverCss }</style> }
					<div className="nx-alert-inner" style={ { display: 'flex', gap: 12, alignItems: 'flex-start' } }>
						{ showIcon !== false && (
							<i className={ iconClass || defaults.icon } style={ { fontSize: `${ iconSize ?? 20 }px`, color: iconColor || defaults.text, flexShrink: 0, marginTop: 2 } } />
						) }
						<div className="nx-alert-body" style={ { flex: 1 } }>
							{ title && <strong className="nx-alert-title" style={ { display: 'block', marginBottom: 4, color: titleColorOverride || undefined } }>{ title }</strong> }
							<RichText
								tagName="p"
								className="nx-alert-desc"
								value={ description ?? 'Alert message goes here.' }
								onChange={ ( v ) => setAttributes( { description: v } ) }
								allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
							/>
						</div>
						{ dismissible && (
							<button className="nx-alert-dismiss" onClick={ () => setDismissed( true ) }
								style={ { background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: dismissBtnColor || defaults.text, lineHeight: 1, padding: 0 } }
								aria-label={ __( 'Dismiss', 'nexus-blocks' ) }
							>×</button>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
