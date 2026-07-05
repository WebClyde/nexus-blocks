/**
 * Alert / Notice — deprecations.
 *
 * v1: background was a plain solid-color string (`bgColor`). Migrated to the
 * shared `background` object (BackgroundControl) for gradient/image support.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { RichText } from '@wordpress/block-editor';

const TYPE_DEFAULTS = {
	info:    { bg: '#EFF6FF', text: '#1D4ED8', icon: 'fa-solid fa-info-circle', border: '#BFDBFE' },
	success: { bg: '#F0FDF4', text: '#15803D', icon: 'fa-solid fa-check', border: '#BBF7D0' },
	warning: { bg: '#FFFBEB', text: '#B45309', icon: 'fa-solid fa-exclamation-triangle', border: '#FDE68A' },
	danger:  { bg: '#FEF2F2', text: '#B91C1C', icon: 'fa-solid fa-times', border: '#FECACA' },
	custom:  { bg: '#F9FAFB', text: '#111827', icon: 'fa-solid fa-info-circle', border: '#E5E7EB' },
};

const v1AttributeSchema = {
	uniqueId:              { type: 'string',  default: '' },
	alertType:             { type: 'string',  default: 'info' },
	title:                 { type: 'string',  default: '' },
	description:           { type: 'string',  default: '' },
	iconClass:             { type: 'string',  default: '' },
	showIcon:              { type: 'boolean', default: true },
	dismissible:           { type: 'boolean', default: false },
	dismissCookie:         { type: 'boolean', default: false },
	cookieDuration:        { type: 'number',  default: 30 },
	bgColor:               { type: 'string',  default: '' },
	textColor:             { type: 'string',  default: '' },
	iconColor:             { type: 'string',  default: '' },
	iconSize:              { type: 'number',  default: 20 },
	border:                { type: 'object',  default: {} },
	borderLeftAccent:      { type: 'boolean', default: false },
	borderLeftAccentColor: { type: 'string',  default: '' },
	borderLeftAccentWidth: { type: 'number',  default: 4 },
	borderRadius:          { type: 'string',  default: '6px' },
	boxShadow:             { type: 'object',  default: {} },
	padding:               { type: 'object',  default: {} },
	titleTypography:       { type: 'object',  default: {} },
	descTypography:        { type: 'object',  default: {} },
	titleColorOverride:    { type: 'string',  default: '' },
	dismissBtnColor:       { type: 'string',  default: '' },
	margin:                { type: 'object',  default: {} },
	animation:             { type: 'object',  default: {} },
	cssId:                 { type: 'string',  default: '' },
	cssClasses:            { type: 'string',  default: '' },
};

function SaveV1( { attributes } ) {
	const { uniqueId, alertType, title, description, iconClass, showIcon, dismissible, dismissCookie, cookieDuration, bgColor, textColor, iconColor, iconSize, border, borderLeftAccent, borderLeftAccentColor, borderLeftAccentWidth, borderRadius, titleColorOverride, dismissBtnColor, padding, cssId, cssClasses, animation } = attributes;
	const type     = alertType ?? 'info';
	const defaults = TYPE_DEFAULTS[ type ] ?? TYPE_DEFAULTS.custom;
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ),
	} );
	const alertStyle = {
		background: bgColor || defaults.bg, color: textColor || defaults.text, borderRadius: borderRadius ?? '6px',
		padding: padding ? `${ padding.top ?? 16 }px ${ padding.right ?? 20 }px ${ padding.bottom ?? 16 }px ${ padding.left ?? 20 }px` : '16px 20px',
		borderLeft: borderLeftAccent ? `${ borderLeftAccentWidth ?? 4 }px solid ${ borderLeftAccentColor || defaults.border }` : undefined,
		border: border?.style && border?.style !== 'none' ? `${ border.width ?? '1px' } ${ border.style } ${ border.color ?? defaults.border }` : `1px solid ${ defaults.border }`,
		position: 'relative',
	};
	return (
		<div { ...blockProps }>
			<div className={ `nexus-alert nx-alert-${ type }${ cssClasses ? ' ' + cssClasses : '' }${ dismissible ? ' is-dismissible' : '' }` }
				style={ alertStyle }
				{ ...(dismissCookie ? { 'data-cookie-id': `nx-alert-${ uniqueId }`, 'data-cookie-days': cookieDuration ?? 30 } : {} ) }
			>
				<div className="nx-alert-inner" style={ { display: 'flex', gap: 12, alignItems: 'flex-start' } }>
					{ showIcon !== false && <i className={ iconClass || defaults.icon } style={ { fontSize: `${ iconSize ?? 20 }px`, color: iconColor || defaults.text, flexShrink: 0, marginTop: 2 } } /> }
					<div className="nx-alert-body" style={ { flex: 1 } }>
						{ title && <strong className="nx-alert-title" style={ { display: 'block', marginBottom: 4, color: titleColorOverride || undefined } }>{ title }</strong> }
						<RichText.Content tagName="p" className="nx-alert-desc" value={ description } />
					</div>
					{ dismissible && (
						<button className="nx-alert-dismiss" type="button" aria-label="Dismiss"
							style={ { background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: dismissBtnColor || defaults.text, lineHeight: 1, padding: 0 } }
						>×</button>
					) }
				</div>
			</div>
		</div>
	);
}

export default [
	{
		attributes: v1AttributeSchema,
		save: SaveV1,
		migrate( attributes ) {
			const { bgColor, ...rest } = attributes;
			return {
				...rest,
				background: bgColor ? { type: 'solid', color: bgColor } : {},
			};
		},
	},
];
