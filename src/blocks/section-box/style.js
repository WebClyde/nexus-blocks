export function buildSectionBoxRules( attributes ) {
	const {
		flexLayout, margin, padding, width, maxWidth, minHeight, overflow,
		bgColor, bgGradient, enableGradient, bgImage, bgSize, bgPosition, bgRepeat, bgAttachment,
		overlayColor, overlayOpacity, borderColor, borderWidth, borderStyle, borderRadius, boxShadow
	} = attributes;

	const isFlex = flexLayout?.display === 'flex' || flexLayout?.display === 'inline-flex';
	const isGrid = flexLayout?.display === 'grid';

	return {
		'': {
			'position': 'relative',
			'box-sizing': 'border-box',
			'width':      width || '100%',
			'max-width':  maxWidth || undefined,
			'min-height': minHeight || undefined,
			'overflow':   overflow && overflow !== 'visible' ? overflow : undefined,

			// Spacing
			'margin':  margin?.top  ? `${ margin.top  } ${ margin.right  } ${ margin.bottom  } ${ margin.left  }` : undefined,
			'padding': padding?.top ? `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }` : '40px 20px',

			// Background
			'background-color':      enableGradient ? undefined : ( bgColor || undefined ),
			'background-image':      enableGradient && bgGradient ? bgGradient : ( bgImage ? `url('${ bgImage }')` : undefined ),
			'background-size':       bgImage ? bgSize || 'cover' : undefined,
			'background-position':   bgImage ? bgPosition || 'center center' : undefined,
			'background-repeat':     bgImage ? bgRepeat || 'no-repeat' : undefined,
			'background-attachment': bgImage ? bgAttachment || 'scroll' : undefined,

			// Border
			'border-color':  borderColor || undefined,
			'border-width':  borderWidth || undefined,
			'border-style':  borderColor || borderWidth ? borderStyle || 'solid' : undefined,
			'border-radius': borderRadius || undefined,
			'box-shadow':    boxShadow || undefined,

		},

		// Overlay pseudo-element
		' > .nx-overlay': {
			'content':          '""',
			'position':         'absolute',
			'inset':            '0',
			'background-color': overlayColor || undefined,
			'opacity':          overlayColor ? ( overlayOpacity / 100 ) : undefined,
			'pointer-events':   'none',
			'z-index':          '0',
		},

		// Inner content above overlay
		' > .nx-section-inner': {
			'position': 'relative',
			'z-index':  '1',
			'width':    '100%',
			'height':   '100%',
			'min-height': 'inherit',

			// Flex / Grid
			'display':         flexLayout?.display || 'block',
			'flex-direction':  isFlex ? ( flexLayout?.flexDirection  || undefined ) : undefined,
			'flex-wrap':       isFlex ? ( flexLayout?.flexWrap       || 'wrap'    ) : undefined,
			'justify-content': isFlex ? ( flexLayout?.justifyContent || undefined ) : undefined,
			'align-items':     isFlex ? ( flexLayout?.alignItems     || undefined ) : undefined,
			'align-content':   isFlex ? ( flexLayout?.alignContent   || undefined ) : undefined,
			'gap':             ( isFlex || isGrid ) ? ( flexLayout?.gap || undefined ) : undefined,

			// Grid
			'grid-template-columns': isGrid
				? ( flexLayout?.gridTemplateColumns || ( flexLayout?.columns ? `repeat(${ flexLayout.columns }, 1fr)` : 'repeat(2, 1fr)' ) )
				: undefined,
			'grid-template-rows': isGrid && flexLayout?.gridTemplateRows ? flexLayout.gridTemplateRows : undefined,
			'grid-gap':       isGrid ? ( flexLayout?.gap || '20px' ) : undefined,
			'justify-items':  isGrid && flexLayout?.justifyItems ? flexLayout.justifyItems : undefined,
		},
	};
}
