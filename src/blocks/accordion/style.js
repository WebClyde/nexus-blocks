// Default modern accordion palette
const DEF_TITLE_COLOR       = '#1e293b'; // slate-900
const DEF_TITLE_ACTIVE      = '#4f46e5'; // indigo-600
const DEF_ICON_COLOR        = '#64748b'; // slate-500
const DEF_ICON_ACTIVE       = '#4f46e5'; // indigo-600
const DEF_HEADER_BG         = '#ffffff';
const DEF_HEADER_BG_HOVER   = '#f1f5f9'; // slate-100
const DEF_HEADER_BG_ACTIVE  = '#eef2ff'; // indigo-50
const DEF_BORDER_COLOR      = '#e2e8f0'; // slate-200
const DEF_CONTENT_BG        = '#f8fafc'; // slate-50
const DEF_RADIUS            = '10px';

export function buildAccordionRules( attributes ) {
	const {
		headerBgActive, titleColor, titleColorActive, titleTypography, contentTypography,
		headerBorder, headerPadding,
		iconColor, iconColorActive, iconSize,
		contentBackground, contentPadding, contentBorder, margin, padding, itemGap, titleContentGap,
		width, maxWidth, minHeight, overflow
	} = attributes;

	// Resolve effective colors — fall back to modern defaults (never 'inherit')
	const effTitleColor      = titleColor      || DEF_TITLE_COLOR;
	const effTitleActive     = titleColorActive || DEF_TITLE_ACTIVE;
	const effIconColor       = iconColor       || DEF_ICON_COLOR;
	const effIconActive      = iconColorActive  || DEF_ICON_ACTIVE;
	const effHeaderBgActive  = headerBgActive  || DEF_HEADER_BG_ACTIVE;

	// Build border shorthand
	const borderVal = headerBorder?.style && headerBorder?.style !== 'none'
		? `${ headerBorder.width ?? '1px' } ${ headerBorder.style } ${ headerBorder.color ?? DEF_BORDER_COLOR }`
		: `1px solid ${ DEF_BORDER_COLOR }`;

	const contentBorderVal = contentBorder?.style && contentBorder?.style !== 'none'
		? `${ contentBorder.width ?? '1px' } ${ contentBorder.style } ${ contentBorder.color ?? DEF_BORDER_COLOR }`
		: 'none';

	return {
		// Wrapper
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

		// Each item card
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
		// Lifted shadow on open
		' .nx-accordion-item.is-open': {
			'box-shadow': '0 4px 20px rgba(79,70,229,0.10)',
		},

		// Header button — base
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
		// Hover
		' .nx-accordion-header:hover': {
			'background': DEF_HEADER_BG_HOVER,
		},
		' .nx-accordion-header:hover span': {
			'color': effTitleActive,
		},
		' .nx-accordion-header:hover i': {
			'color': effIconActive,
		},

		// Title span — base
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

		// Icon — base
		' .nx-accordion-header i': {
			'color': effIconColor,
			'font-size': iconSize ? `${ iconSize }px` : '14px',
			'flex-shrink': '0',
			'transition': 'color 0.25s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1)',
			'margin-left': '14px',
		},

		// Show/hide icons via CSS
		' .nx-accordion-item:not(.is-open) .nx-accordion-icon-opened': {
			'display': 'none',
		},
		' .nx-accordion-item.is-open .nx-accordion-icon-closed': {
			'display': 'none',
		},

		// Active header
		' .nx-accordion-item.is-open .nx-accordion-header': {
			'background': effHeaderBgActive,
		},
		' .nx-accordion-item.is-open .nx-accordion-header span': {
			'color': effTitleActive,
		},
		' .nx-accordion-item.is-open .nx-accordion-header i': {
			'color': effIconActive,
		},

		// Opened-icon spin animation
		' .nx-accordion-item.is-open .nx-accordion-icon-opened': {
			'transform': 'rotate(180deg)',
		},

		// Content area
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
			'color': '#475569', // slate-600 — readable content colour
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
