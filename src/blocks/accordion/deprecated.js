/**
 * Accordion — deprecations.
 *
 * v1: `contentBackground` was a plain solid-color string. Migrated to the
 * shared `background` object (BackgroundControl) for gradient/image support.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { buildScopedCSS } from '../../hooks/useStyleOutput';

const DEF_TITLE_COLOR      = '#1e293b';
const DEF_TITLE_ACTIVE     = '#4f46e5';
const DEF_ICON_COLOR       = '#64748b';
const DEF_ICON_ACTIVE      = '#4f46e5';
const DEF_HEADER_BG        = '#ffffff';
const DEF_HEADER_BG_HOVER  = '#f1f5f9';
const DEF_HEADER_BG_ACTIVE = '#eef2ff';
const DEF_BORDER_COLOR     = '#e2e8f0';
const DEF_CONTENT_BG       = '#f8fafc';
const DEF_RADIUS           = '10px';

const v1AttributeSchema = {
	uniqueId:            { type: 'string',  default: '' },
	items:               { type: 'array',   default: [
		{ title: 'What is Nexus Blocks?', content: 'Nexus Blocks is an advanced Gutenberg block plugin.' },
		{ title: 'How do I install it?', content: 'Upload the plugin and activate it from your WordPress admin.' },
		{ title: 'Is it free?', content: 'Phase 1 blocks are free. Pro blocks are available in Nexus Blocks Pro.' },
	] },
	defaultOpen:         { type: 'number',  default: -1 },
	openIconClass:       { type: 'string',  default: 'fa-solid fa-chevron-down' },
	closeIconClass:      { type: 'string',  default: 'fa-solid fa-chevron-up' },
	iconPosition:        { type: 'string',  default: 'right' },
	faqSchema:           { type: 'boolean', default: false },
	headerBgActive:      { type: 'string',  default: '' },
	titleColor:          { type: 'string',  default: '' },
	titleColorActive:    { type: 'string',  default: '' },
	titleTypography:     { type: 'object',  default: {} },
	contentTypography:   { type: 'object',  default: {} },
	headerBorder:        { type: 'object',  default: {} },
	headerBorderBetween: { type: 'boolean', default: true },
	headerPadding:       { type: 'object',  default: {} },
	iconColor:           { type: 'string',  default: '' },
	iconColorActive:     { type: 'string',  default: '' },
	iconSize:            { type: 'number',  default: 16 },
	iconBgActive:        { type: 'string',  default: '' },
	iconBorderRadius:    { type: 'string',  default: '' },
	contentBackground:   { type: 'string',  default: '' },
	contentPadding:      { type: 'object',  default: {} },
	contentBorder:       { type: 'object',  default: {} },
	margin:              { type: 'object',  default: {} },
	padding:             { type: 'object',  default: {} },
	itemGap:             { type: 'number',  default: 0 },
	titleContentGap:     { type: 'number',  default: 0 },
	animation:           { type: 'object',  default: {} },
	width:               { type: 'string',  default: '' },
	maxWidth:            { type: 'string',  default: '' },
	minHeight:           { type: 'string',  default: '' },
	overflow:            { type: 'string',  default: '' },
	cssId:               { type: 'string',  default: '' },
	cssClasses:          { type: 'string',  default: '' },
};

function buildAccordionRulesV1( attributes ) {
	const {
		headerBgActive, titleColor, titleColorActive, titleTypography, contentTypography,
		headerBorder, headerPadding,
		iconColor, iconColorActive, iconSize,
		contentBackground, contentPadding, contentBorder, margin, padding, itemGap, titleContentGap,
		width, maxWidth, minHeight, overflow
	} = attributes;

	const effTitleColor     = titleColor      || DEF_TITLE_COLOR;
	const effTitleActive    = titleColorActive || DEF_TITLE_ACTIVE;
	const effIconColor      = iconColor       || DEF_ICON_COLOR;
	const effIconActive     = iconColorActive  || DEF_ICON_ACTIVE;
	const effHeaderBgActive = headerBgActive  || DEF_HEADER_BG_ACTIVE;

	const borderVal = headerBorder?.style && headerBorder?.style !== 'none'
		? `${ headerBorder.width ?? '1px' } ${ headerBorder.style } ${ headerBorder.color ?? DEF_BORDER_COLOR }`
		: `1px solid ${ DEF_BORDER_COLOR }`;

	const contentBorderVal = contentBorder?.style && contentBorder?.style !== 'none'
		? `${ contentBorder.width ?? '1px' } ${ contentBorder.style } ${ contentBorder.color ?? DEF_BORDER_COLOR }`
		: 'none';

	return {
		'': {
			'margin': margin?.top ? `${ margin.top } ${ margin.right } ${ margin.bottom } ${ margin.left }` : undefined,
			'padding': padding?.top ? `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }` : undefined,
			'width': width || undefined,
			'max-width': maxWidth || undefined,
			'min-height': minHeight || undefined,
			'overflow': overflow && overflow !== 'visible' ? overflow : 'visible',
			'display': 'flex',
			'flex-direction': 'column',
			'gap': itemGap ? `${ itemGap }px` : '8px',
			'border-radius': DEF_RADIUS,
		},
		' .nx-accordion-item': {
			'background': DEF_HEADER_BG,
			'border': itemGap ? borderVal : 'none',
			'border-bottom': !itemGap ? borderVal : borderVal,
			'border-radius': itemGap ? DEF_RADIUS : '0',
			'overflow': 'hidden',
			'transition': 'box-shadow 0.25s ease',
		},
		' .nx-accordion-item:first-child': {
			'border-radius': !itemGap ? `${ DEF_RADIUS } ${ DEF_RADIUS } 0 0` : DEF_RADIUS,
		},
		' .nx-accordion-item:last-child': {
			'border-bottom': borderVal,
			'border-radius': !itemGap ? `0 0 ${ DEF_RADIUS } ${ DEF_RADIUS }` : DEF_RADIUS,
		},
		' .nx-accordion-item:only-child': {
			'border-radius': DEF_RADIUS,
		},
		' .nx-accordion-item.is-open': {
			'box-shadow': '0 4px 20px rgba(79,70,229,0.10)',
		},
		' .nx-accordion-header': {
			'display': 'flex',
			'width': '100%',
			'align-items': 'center',
			'justify-content': 'space-between',
			'padding': headerPadding?.top
				? `${ headerPadding.top } ${ headerPadding.right } ${ headerPadding.bottom } ${ headerPadding.left }`
				: '18px 22px',
			'background': DEF_HEADER_BG,
			'border': 'none',
			'cursor': 'pointer',
			'text-align': 'left',
			'transition': 'background 0.25s ease',
			'outline': 'none',
		},
		' .nx-accordion-header:focus-visible': {
			'outline': `2px solid ${ DEF_TITLE_ACTIVE }`,
			'outline-offset': '-2px',
		},
		' .nx-accordion-header:hover': {
			'background': DEF_HEADER_BG_HOVER,
		},
		' .nx-accordion-header:hover span': {
			'color': effTitleActive,
		},
		' .nx-accordion-header:hover i': {
			'color': effIconActive,
		},
		' .nx-accordion-header span': {
			'flex': '1',
			'color': effTitleColor,
			'font-family': titleTypography?.fontFamily,
			'font-size': titleTypography?.fontSize || '1rem',
			'font-weight': titleTypography?.fontWeight || '600',
			'line-height': titleTypography?.lineHeight || '1.5',
			'letter-spacing': titleTypography?.letterSpacing,
			'text-transform': titleTypography?.textTransform,
			'text-decoration': titleTypography?.textDecoration,
			'font-style': titleTypography?.fontStyle,
			'transition': 'color 0.25s ease',
		},
		' .nx-accordion-header i': {
			'color': effIconColor,
			'font-size': iconSize ? `${ iconSize }px` : '14px',
			'flex-shrink': '0',
			'transition': 'color 0.25s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)',
			'margin-left': '14px',
		},
		' .nx-accordion-item:not(.is-open) .nx-accordion-icon-opened': {
			'display': 'none',
		},
		' .nx-accordion-item.is-open .nx-accordion-icon-closed': {
			'display': 'none',
		},
		' .nx-accordion-item.is-open .nx-accordion-header': {
			'background': effHeaderBgActive,
		},
		' .nx-accordion-item.is-open .nx-accordion-header span': {
			'color': effTitleActive,
		},
		' .nx-accordion-item.is-open .nx-accordion-header i': {
			'color': effIconActive,
		},
		' .nx-accordion-item.is-open .nx-accordion-icon-opened': {
			'transform': 'rotate(180deg)',
		},
		' .nx-accordion-content': {
			'background-color': contentBackground || DEF_CONTENT_BG,
			'border-top': contentBorderVal !== 'none' ? contentBorderVal : `1px solid ${ DEF_BORDER_COLOR }`,
			'overflow': 'hidden',
		},
		' .nx-accordion-content-inner': {
			'padding': contentPadding?.top
				? `${ contentPadding.top } ${ contentPadding.right } ${ contentPadding.bottom } ${ contentPadding.left }`
				: '16px 22px',
			'margin-top': titleContentGap ? `${ titleContentGap }px` : undefined,
			'color': '#475569',
			'font-family': contentTypography?.fontFamily,
			'font-size': contentTypography?.fontSize || '0.95rem',
			'font-weight': contentTypography?.fontWeight,
			'line-height': contentTypography?.lineHeight || '1.75',
			'letter-spacing': contentTypography?.letterSpacing,
			'text-transform': contentTypography?.textTransform,
			'text-decoration': contentTypography?.textDecoration,
			'font-style': contentTypography?.fontStyle,
		}
	};
}

function SaveV1( { attributes } ) {
	const { uniqueId, items, defaultOpen, openIconClass, closeIconClass, iconPosition, faqSchema, cssId, cssClasses, animation } = attributes;
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, ...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ) } );
	const listItems = items ?? [];
	const scopedCss = buildScopedCSS( uniqueId, buildAccordionRulesV1( attributes ) );
	return (
		<div { ...blockProps }>
			{ scopedCss && <style dangerouslySetInnerHTML={ { __html: scopedCss } } /> }
			{ faqSchema && (
				<script type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify( { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: listItems.map( ( item ) => ( { '@type': 'Question', name: item.title, acceptedAnswer: { '@type': 'Answer', text: item.content } } ) ) } ) } } />
			) }
			<div className={ `nexus-accordion${ cssClasses ? ' ' + cssClasses : '' }` } data-default-open={ defaultOpen ?? -1 }>
				{ listItems.map( ( item, idx ) => (
					<div key={ idx } className={ `nx-accordion-item${ idx === ( defaultOpen ?? -1 ) ? ' is-open' : '' }` }>
						<button className="nx-accordion-header" aria-expanded={ idx === ( defaultOpen ?? -1 ) }
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
						<div className="nx-accordion-content" style={ { display: idx === ( defaultOpen ?? -1 ) ? 'block' : 'none' } }>
							<div className="nx-accordion-content-inner">
								<p style={ { margin: 0 } }>{ item.content }</p>
							</div>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
}

export default [
	{
		attributes: v1AttributeSchema,
		save: SaveV1,
		migrate( attributes ) {
			const { contentBackground, ...rest } = attributes;
			return {
				...rest,
				contentBackground: contentBackground ? { type: 'solid', color: contentBackground } : {},
			};
		},
	},
];
