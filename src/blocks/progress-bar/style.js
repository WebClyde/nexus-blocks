// Default modern progress bar palette
const DEF_TITLE_COLOR       = '#1e293b'; // slate-900
const DEF_PCT_COLOR         = '#64748b'; // slate-500
const DEF_TRACK_BG          = '#e2e8f0'; // slate-200
const DEF_FILL_COLOR        = '#4f46e5'; // indigo-600

export function buildProgressBarRules( attributes ) {
	const {
		layoutType, continuousAnimation, circleSize, circleStrokeWidth,
		barHeight, barBgColor, fillColor, fillGradient, enableGradient, barBorderRadius,
		titleColor, titleTypography, titleSpacing, percentageColor, percentageTypography,
		itemGap, margin, padding, flexLayout
	} = attributes;

	const effTitleColor = titleColor || DEF_TITLE_COLOR;
	const effPctColor   = percentageColor || DEF_PCT_COLOR;
	const effTrackBg    = barBgColor || DEF_TRACK_BG;
	const effFillBg     = enableGradient && fillGradient ? fillGradient : ( fillColor || DEF_FILL_COLOR );

	const isHistogram = layoutType === 'histogram';
	const isCircle    = layoutType === 'circle';
	const isLinear    = !isHistogram && !isCircle;

	const rules = {
		// Root wrapper — only outer spacing
		'': {
			'margin': margin?.top ? `${ margin.top } ${ margin.right } ${ margin.bottom } ${ margin.left }` : undefined,
			'padding': padding?.top ? `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }` : undefined,
		},

		// Inner bars container — layout controls apply HERE
		' .nexus-progress-bars': {
			'display': flexLayout?.display || ( isHistogram || isCircle ? 'flex' : 'block' ),
			'flex-direction': flexLayout?.flexDirection || undefined,
			'flex-wrap': flexLayout?.flexWrap || ( isCircle ? 'wrap' : ( flexLayout?.display === 'flex' ? 'wrap' : undefined ) ),
			'justify-content': flexLayout?.justifyContent || ( isCircle ? 'center' : undefined ),
			'align-items': flexLayout?.alignItems || ( isHistogram ? 'flex-end' : undefined ),
			'align-content': flexLayout?.alignContent || undefined,
			'gap': (
				flexLayout?.display === 'flex' || isHistogram || isCircle
					? `${ itemGap ?? 20 }px`
					: undefined
			),
			// CSS Grid columns support
			'grid-template-columns': flexLayout?.display === 'grid'
				? ( flexLayout?.gridTemplateColumns || ( flexLayout?.columns ? `repeat(${ flexLayout.columns }, 1fr)` : 'repeat(2, 1fr)' ) )
				: undefined,
			'grid-template-rows': flexLayout?.display === 'grid' && flexLayout?.gridTemplateRows ? flexLayout.gridTemplateRows : undefined,
			'grid-gap': flexLayout?.display === 'grid' ? `${ itemGap ?? 20 }px` : undefined,
			'justify-items': flexLayout?.display === 'grid' && flexLayout?.justifyItems ? flexLayout.justifyItems : undefined,
		},

		' .nx-progress-item': {
			'width': '100%',
			'margin-bottom': (
				isLinear && flexLayout?.display !== 'flex' && flexLayout?.display !== 'grid'
					? `${ itemGap ?? 20 }px`
					: '0'
			),
			'display': isCircle ? 'flex' : ( isHistogram ? 'flex' : 'block' ),
			'flex-direction': isCircle || isHistogram ? 'column' : undefined,
			'align-items': isCircle || isHistogram ? 'center' : undefined,
			'flex': isHistogram ? '1' : undefined,
		},
		' .nx-progress-item:last-child': {
			'margin-bottom': '0'
		},

		// Title & Percentage
		' .nx-progress-header': {
			'display': 'flex',
			'justify-content': isHistogram || isCircle ? 'center' : 'space-between',
			'margin-bottom': isLinear ? `${ titleSpacing ?? 6 }px` : '0',
			'margin-top': isHistogram || isCircle ? `${ titleSpacing ?? 6 }px` : '0',
			'width': '100%',
			'order': isHistogram || isCircle ? '2' : '1',
			'flex-direction': isCircle ? 'column' : undefined,
			'align-items': isCircle ? 'center' : undefined,
		},
		' .nx-progress-title': {
			'color': effTitleColor,
			'font-family': titleTypography?.fontFamily,
			'font-size': titleTypography?.fontSize || '0.95rem',
			'font-weight': titleTypography?.fontWeight || '600',
			'line-height': titleTypography?.lineHeight,
			'text-transform': titleTypography?.textTransform,
			'letter-spacing': titleTypography?.letterSpacing,
		},
		' .nx-progress-pct': {
			'color': effPctColor,
			'font-family': percentageTypography?.fontFamily,
			'font-size': percentageTypography?.fontSize || ( isCircle ? '1.5rem' : '0.85rem' ),
			'font-weight': percentageTypography?.fontWeight || '700',
			'line-height': percentageTypography?.lineHeight,
		}
	};

	if ( isLinear ) {
		Object.assign( rules, {
			' .nx-progress-track': {
				'background': effTrackBg,
				'height': `${ barHeight ?? 12 }px`,
				'border-radius': barBorderRadius || '999px',
				'overflow': 'hidden',
			},
			' .nx-progress-fill': {
				'background': effFillBg,
				'height': '100%',
				'border-radius': 'inherit',
				'transition': 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
				'width': '0%', // Start at 0 for animation
				'display': 'flex',
				'align-items': 'center',
				'justify-content': 'flex-end',
				'color': '#fff',
				'font-size': '0.75rem',
				'font-weight': 'bold',
				'position': 'relative',
				'overflow': 'hidden',
			}
		} );
	}

	if ( isHistogram ) {
		Object.assign( rules, {
			' .nx-progress-track': {
				'background': effTrackBg,
				'width': '100%',
				'height': '200px', // Fixed height for histogram wrapper
				'border-radius': barBorderRadius || '4px',
				'display': 'flex',
				'align-items': 'flex-end',
				'overflow': 'hidden',
				'order': '1',
			},
			' .nx-progress-fill': {
				'background': effFillBg,
				'width': '100%',
				'border-radius': 'inherit',
				'transition': 'height 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
				'height': '0%', // Start at 0
				'position': 'relative',
				'overflow': 'hidden',
			}
		} );
	}

	if ( isCircle ) {
		const size = circleSize || 120;
		Object.assign( rules, {
			' .nx-progress-track': {
				'order': '1',
				'position': 'relative',
				'width': `${ size }px`,
				'height': `${ size }px`,
			},
			' .nx-progress-track svg': {
				'transform': 'rotate(-90deg)',
				'width': '100%',
				'height': '100%',
			},
			' .nx-progress-track circle.nx-circle-bg': {
				'fill': 'none',
				'stroke': effTrackBg,
				'stroke-width': circleStrokeWidth || 8,
			},
			' .nx-progress-track circle.nx-circle-fill': {
				'fill': 'none',
				'stroke': effFillBg,
				'stroke-width': circleStrokeWidth || 8,
				'stroke-linecap': 'round',
				'transition': 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
			},
			' .nx-progress-pct-absolute': {
				'position': 'absolute',
				'top': '0',
				'left': '0',
				'width': '100%',
				'height': '100%',
				'display': 'flex',
				'align-items': 'center',
				'justify-content': 'center',
				'flex-direction': 'column',
			}
		} );
	}

	if ( continuousAnimation && ( isLinear || isHistogram ) ) {
		// Add striped moving background overlay via pseudo-element
		Object.assign( rules, {
			' .nx-progress-fill::after': {
				'content': '""',
				'position': 'absolute',
				'top': '0',
				'left': '0',
				'bottom': '0',
				'right': '0',
				'background-image': 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
				'background-size': '1rem 1rem',
				'animation': 'nx-progress-stripes 1s linear infinite',
				'z-index': '1',
			},
			'@keyframes nx-progress-stripes': {
				'0%': { 'background-position-x': '1rem' },
			}
		} );
	}

	return rules;
}
