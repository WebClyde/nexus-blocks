import { backgroundToStyle } from '../../controls';

export function buildRowLayoutRules( attributes ) {
	const {
		flexLayout, columnGap, rowGap, margin, padding,
		width, maxWidth, minHeight, background,
		borderColor, borderWidth, borderStyle, borderRadius, boxShadow
	} = attributes;

	const isFlex = !flexLayout?.display || flexLayout.display === 'flex' || flexLayout.display === 'inline-flex';
	const isGrid = flexLayout?.display === 'grid';

	const isColumn = flexLayout?.flexDirection === 'column' || flexLayout?.flexDirection === 'column-reverse';

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

		// Inner Layout Wrapper
		' > .nx-row-inner': {
			'width':  '100%',
			'height': '100%',
			'min-height': 'inherit',
			
			// Layout — defaults to flex/row/wrap
			'display':         flexLayout?.display || 'flex',
			'flex-direction':  isFlex ? ( flexLayout?.flexDirection  || 'row'  ) : undefined,
			'flex-wrap':       isFlex ? ( flexLayout?.flexWrap       || 'wrap' ) : undefined,
			'justify-content': isFlex ? ( flexLayout?.justifyContent || undefined ) : undefined,
			'align-items':     ( isFlex || isGrid ) ? ( flexLayout?.alignItems || undefined ) : undefined,
			'column-gap':      ( isFlex || isGrid ) ? ( columnGap  || '20px' ) : undefined,
			'row-gap':         ( isFlex || isGrid ) ? ( rowGap     || '20px' ) : undefined,

			// Grid
			'grid-template-columns': isGrid
				? ( flexLayout?.gridTemplateColumns || ( flexLayout?.columns ? `repeat(${ flexLayout.columns }, 1fr)` : 'repeat(2, 1fr)' ) )
				: undefined,
			'grid-template-rows': isGrid && flexLayout?.gridTemplateRows ? flexLayout.gridTemplateRows : undefined,
			'justify-items': isGrid && flexLayout?.justifyItems ? flexLayout.justifyItems : undefined,
		},

		// By default each direct child gets equal flex sizing only in row direction
		' > .nx-row-inner > *': {
			'flex':          isFlex && !isGrid && !isColumn ? '1 1 0' : undefined,
			'min-width':     isFlex && !isGrid && !isColumn ? '0' : undefined,
			'width':         isColumn ? '100%' : undefined,
			'box-sizing':    'border-box',
		},
	};
}
