/**
 * Section / Box — deprecations.
 *
 * v1: background was seven flat attributes (`bgColor`, `bgGradient` raw CSS
 * string, `enableGradient`, `bgImage`, `bgSize`, `bgPosition`, `bgRepeat`,
 * `bgAttachment`). Migrated to the shared `background` object
 * (BackgroundControl). The separate overlay color/opacity is unchanged.
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { buildScopedCSS } from '../../hooks/useStyleOutput';

const v1AttributeSchema = {
	uniqueId:       { type: 'string',  default: '' },
	htmlTag:        { type: 'string',  default: 'section' },
	flexLayout:     { type: 'object',  default: {} },
	margin:         { type: 'object',  default: {} },
	padding:        { type: 'object',  default: {} },
	width:          { type: 'string',  default: '' },
	maxWidth:       { type: 'string',  default: '' },
	minHeight:      { type: 'string',  default: '' },
	overflow:       { type: 'string',  default: '' },
	bgColor:        { type: 'string',  default: '' },
	bgGradient:     { type: 'string',  default: '' },
	enableGradient: { type: 'boolean', default: false },
	bgImage:        { type: 'string',  default: '' },
	bgSize:         { type: 'string',  default: 'cover' },
	bgPosition:     { type: 'string',  default: 'center center' },
	bgRepeat:       { type: 'string',  default: 'no-repeat' },
	bgAttachment:   { type: 'string',  default: 'scroll' },
	overlayColor:   { type: 'string',  default: '' },
	overlayOpacity: { type: 'number',  default: 50 },
	borderColor:    { type: 'string',  default: '' },
	borderWidth:    { type: 'string',  default: '' },
	borderStyle:    { type: 'string',  default: 'solid' },
	borderRadius:   { type: 'string',  default: '' },
	boxShadow:      { type: 'string',  default: '' },
	animation:      { type: 'object',  default: {} },
	cssId:          { type: 'string',  default: '' },
	cssClasses:     { type: 'string',  default: '' },
};

function buildSectionBoxRulesV1( attributes ) {
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
			'margin':  margin?.top  ? `${ margin.top  } ${ margin.right  } ${ margin.bottom  } ${ margin.left  }` : undefined,
			'padding': padding?.top ? `${ padding.top } ${ padding.right } ${ padding.bottom } ${ padding.left }` : '40px 20px',
			'background-color':      enableGradient ? undefined : ( bgColor || undefined ),
			'background-image':      enableGradient && bgGradient ? bgGradient : ( bgImage ? `url('${ bgImage }')` : undefined ),
			'background-size':       bgImage ? bgSize || 'cover' : undefined,
			'background-position':   bgImage ? bgPosition || 'center center' : undefined,
			'background-repeat':     bgImage ? bgRepeat || 'no-repeat' : undefined,
			'background-attachment': bgImage ? bgAttachment || 'scroll' : undefined,
			'border-color':  borderColor || undefined,
			'border-width':  borderWidth || undefined,
			'border-style':  borderColor || borderWidth ? borderStyle || 'solid' : undefined,
			'border-radius': borderRadius || undefined,
			'box-shadow':    boxShadow || undefined,
		},
		' > .nx-overlay': {
			'content':          '""',
			'position':         'absolute',
			'inset':            '0',
			'background-color': overlayColor || undefined,
			'opacity':          overlayColor ? ( overlayOpacity / 100 ) : undefined,
			'pointer-events':   'none',
			'z-index':          '0',
		},
		' > .nx-section-inner': {
			'position': 'relative',
			'z-index':  '1',
			'width':    '100%',
			'height':   '100%',
			'min-height': 'inherit',
			'display':         flexLayout?.display || 'block',
			'flex-direction':  isFlex ? ( flexLayout?.flexDirection  || undefined ) : undefined,
			'flex-wrap':       isFlex ? ( flexLayout?.flexWrap       || 'wrap'    ) : undefined,
			'justify-content': isFlex ? ( flexLayout?.justifyContent || undefined ) : undefined,
			'align-items':     isFlex ? ( flexLayout?.alignItems     || undefined ) : undefined,
			'align-content':   isFlex ? ( flexLayout?.alignContent   || undefined ) : undefined,
			'gap':             ( isFlex || isGrid ) ? ( flexLayout?.gap || undefined ) : undefined,
			'grid-template-columns': isGrid
				? ( flexLayout?.gridTemplateColumns || ( flexLayout?.columns ? `repeat(${ flexLayout.columns }, 1fr)` : 'repeat(2, 1fr)' ) )
				: undefined,
			'grid-template-rows': isGrid && flexLayout?.gridTemplateRows ? flexLayout.gridTemplateRows : undefined,
			'grid-gap':       isGrid ? ( flexLayout?.gap || '20px' ) : undefined,
			'justify-items':  isGrid && flexLayout?.justifyItems ? flexLayout.justifyItems : undefined,
		},
	};
}

function SaveV1( { attributes } ) {
	const { uniqueId, htmlTag, cssId, cssClasses, overlayColor, animation } = attributes;
	const Tag = htmlTag || 'section';
	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		...( animation?.animation ? {
			'data-nx-animation': animation.animation,
			'data-nx-duration':  animation.duration ?? 600,
			'data-nx-delay':     animation.delay    ?? 0,
		} : {} )
	} );
	const scopedCss = buildScopedCSS( uniqueId, buildSectionBoxRulesV1( attributes ) );
	return (
		<Tag { ...blockProps } className={ [ blockProps.className, cssClasses ].filter( Boolean ).join( ' ' ) }>
			{ scopedCss && <style dangerouslySetInnerHTML={ { __html: scopedCss } } /> }
			{ overlayColor && <div className="nx-overlay" aria-hidden="true" /> }
			<div className="nx-section-inner">
				<InnerBlocks.Content />
			</div>
		</Tag>
	);
}

export default [
	{
		attributes: v1AttributeSchema,
		save: SaveV1,
		migrate( attributes ) {
			const { bgColor, bgGradient, enableGradient, bgImage, bgSize, bgPosition, bgRepeat, bgAttachment, ...rest } = attributes;
			let background = {};
			if ( bgImage ) {
				background = { type: 'image', imageUrl: bgImage, imageSize: bgSize, imageRepeat: bgRepeat, imageFixed: bgAttachment === 'fixed' };
			} else if ( enableGradient && bgGradient ) {
				background = { type: 'gradient', gradientType: 'linear', gradientStart: bgColor || '#7C3AED', gradientEnd: '#06B6D4' };
			} else if ( bgColor ) {
				background = { type: 'solid', color: bgColor };
			}
			return { ...rest, background };
		},
	},
];
