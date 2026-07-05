/**
 * Row Layout / Container — deprecations.
 *
 * v1: background was six flat attributes (`bgColor`, `bgGradient` raw CSS
 * string, `enableGradient`, `bgImage`, `bgSize`, `bgPosition`, `bgRepeat`).
 * Migrated to the shared `background` object (BackgroundControl).
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { buildScopedCSS } from '../../hooks/useStyleOutput';

const v1AttributeSchema = {
	uniqueId:       { type: 'string',  default: '' },
	flexLayout:     { type: 'object',  default: { display: 'flex', flexWrap: 'wrap' } },
	columnWidths:   { type: 'string',  default: '' },
	equalColumns:   { type: 'boolean', default: true },
	columnGap:      { type: 'string',  default: '20px' },
	rowGap:         { type: 'string',  default: '20px' },
	margin:         { type: 'object',  default: {} },
	padding:        { type: 'object',  default: {} },
	width:          { type: 'string',  default: '' },
	maxWidth:       { type: 'string',  default: '1200px' },
	minHeight:      { type: 'string',  default: '' },
	bgColor:        { type: 'string',  default: '' },
	bgGradient:     { type: 'string',  default: '' },
	enableGradient: { type: 'boolean', default: false },
	bgImage:        { type: 'string',  default: '' },
	bgSize:         { type: 'string',  default: 'cover' },
	bgPosition:     { type: 'string',  default: 'center center' },
	bgRepeat:       { type: 'string',  default: 'no-repeat' },
	borderColor:    { type: 'string',  default: '' },
	borderWidth:    { type: 'string',  default: '' },
	borderStyle:    { type: 'string',  default: 'solid' },
	borderRadius:   { type: 'string',  default: '' },
	boxShadow:      { type: 'string',  default: '' },
	animation:      { type: 'object',  default: {} },
	cssId:          { type: 'string',  default: '' },
	cssClasses:     { type: 'string',  default: '' },
};

function buildRowLayoutRulesV1( attributes ) {
	const {
		flexLayout, columnGap, rowGap, margin, padding,
		width, maxWidth, minHeight, bgColor, bgGradient, enableGradient,
		bgImage, bgSize, bgPosition, bgRepeat, borderColor, borderWidth, borderStyle, borderRadius, boxShadow
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
			'background-color':    enableGradient ? undefined : ( bgColor || undefined ),
			'background-image':    enableGradient && bgGradient ? bgGradient : ( bgImage ? `url('${ bgImage }')` : undefined ),
			'background-size':     bgImage ? bgSize || 'cover' : undefined,
			'background-position': bgImage ? bgPosition || 'center center' : undefined,
			'background-repeat':   bgImage ? bgRepeat || 'no-repeat' : undefined,
			'border-color':  borderColor || undefined,
			'border-width':  borderWidth || undefined,
			'border-style':  borderColor || borderWidth ? borderStyle || 'solid' : undefined,
			'border-radius': borderRadius || undefined,
			'box-shadow':    boxShadow || undefined,
		},
		' > .nx-row-inner': {
			'width':  '100%',
			'height': '100%',
			'min-height': 'inherit',
			'display':         flexLayout?.display || 'flex',
			'flex-direction':  isFlex ? ( flexLayout?.flexDirection  || 'row'  ) : undefined,
			'flex-wrap':       isFlex ? ( flexLayout?.flexWrap       || 'wrap' ) : undefined,
			'justify-content': isFlex ? ( flexLayout?.justifyContent || undefined ) : undefined,
			'align-items':     ( isFlex || isGrid ) ? ( flexLayout?.alignItems || undefined ) : undefined,
			'column-gap':      ( isFlex || isGrid ) ? ( columnGap  || '20px' ) : undefined,
			'row-gap':         ( isFlex || isGrid ) ? ( rowGap     || '20px' ) : undefined,
			'grid-template-columns': isGrid
				? ( flexLayout?.gridTemplateColumns || ( flexLayout?.columns ? `repeat(${ flexLayout.columns }, 1fr)` : 'repeat(2, 1fr)' ) )
				: undefined,
			'grid-template-rows': isGrid && flexLayout?.gridTemplateRows ? flexLayout.gridTemplateRows : undefined,
			'justify-items': isGrid && flexLayout?.justifyItems ? flexLayout.justifyItems : undefined,
		},
		' > .nx-row-inner > *': {
			'flex':          isFlex && !isGrid && !isColumn ? '1 1 0' : undefined,
			'min-width':     isFlex && !isGrid && !isColumn ? '0' : undefined,
			'width':         isColumn ? '100%' : undefined,
			'box-sizing':    'border-box',
		},
	};
}

function SaveV1( { attributes } ) {
	const { uniqueId, cssId, cssClasses, animation } = attributes;
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		...( animation?.animation ? {
			'data-nx-animation': animation.animation,
			'data-nx-duration':  animation.duration ?? 600,
			'data-nx-delay':     animation.delay    ?? 0,
		} : {} )
	} );
	const scopedCss = buildScopedCSS( uniqueId, buildRowLayoutRulesV1( attributes ) );
	return (
		<div { ...blockProps } className={ [ blockProps.className, cssClasses ].filter( Boolean ).join( ' ' ) }>
			{ scopedCss && <style dangerouslySetInnerHTML={ { __html: scopedCss } } /> }
			<div className="nx-row-inner">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}

export default [
	{
		attributes: v1AttributeSchema,
		save: SaveV1,
		migrate( attributes ) {
			const { bgColor, bgGradient, enableGradient, bgImage, bgSize, bgPosition, bgRepeat, ...rest } = attributes;
			let background = {};
			if ( bgImage ) {
				background = { type: 'image', imageUrl: bgImage, imageSize: bgSize, imageRepeat: bgRepeat };
			} else if ( enableGradient && bgGradient ) {
				background = { type: 'gradient', gradientType: 'linear', gradientStart: bgColor || '#7C3AED', gradientEnd: '#06B6D4' };
			} else if ( bgColor ) {
				background = { type: 'solid', color: bgColor };
			}
			return { ...rest, background };
		},
	},
];
