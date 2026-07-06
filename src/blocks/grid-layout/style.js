import { backgroundToStyle } from '../../controls';

export function buildGridLayoutRules( attributes ) {
	const {
		gridLayout, columnGap, rowGap, margin, padding,
		width, maxWidth, minHeight, background,
		borderColor, borderWidth, borderStyle, borderRadius, boxShadow
	} = attributes;

	return {
		'': {
			'position':  'relative',
			'box-sizing': 'border-box',
			'width':      width || '100%',
			'max-width':  maxWidth || '1200px',
			'min-height': minHeight || undefined,
			'margin':     margin?.top  ? `${ margin.top  } ${ margin.right  } ${ margin.bottom  } ${ margin.left  }` : '0 auto',
			'padding':    padding?.top ? `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }` : undefined,

			// Background
			...backgroundToStyle( background ),

			// Border
			'border-color':  borderColor || undefined,
			'border-width':  borderWidth || undefined,
			'border-style':  borderColor || borderWidth ? borderStyle || 'solid' : undefined,
			'border-radius': borderRadius || undefined,
			'box-shadow':    boxShadow || undefined,
		},

		':hover': backgroundToStyle( background?.hover ),

		// Inner Grid Wrapper
		' > .nx-grid-inner': {
			'width':  '100%',
			'height': '100%',
			'min-height': 'inherit',
			'display': 'grid',
			'column-gap': columnGap || '20px',
			'row-gap':    rowGap    || '20px',

			'grid-template-columns': gridLayout?.gridTemplateColumns
				|| ( gridLayout?.columns ? `repeat(${ gridLayout.columns }, 1fr)` : 'repeat(2, 1fr)' ),
			'grid-template-rows': gridLayout?.gridTemplateRows || undefined,
			'justify-items':      gridLayout?.justifyItems     || undefined,
			'align-items':        gridLayout?.alignItems       || undefined,
		},
	};
}
