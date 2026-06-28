/**
 * Advanced Heading — Save Component
 */

import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		uniqueId, content, tag: Tag = 'h2',
		alignment, linkUrl, linkTarget, linkNofollow,
		textColor, enableGradient, gradient, typography,
		enableStroke, strokeWidth, strokeColor,
		cssId, cssClasses, animation,
	} = attributes;

	const textStyle = {
		color: textColor || undefined,
		textAlign: alignment || undefined,
		...(enableGradient ? {
			backgroundImage: `linear-gradient(${ gradient?.angle ?? 135 }deg, ${ gradient?.start ?? '#7C3AED' }, ${ gradient?.end ?? '#06B6D4' })`,
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor:  'transparent',
			backgroundClip:       'text',
		} : {}),
		...(enableStroke ? {
			WebkitTextStroke: `${ strokeWidth } ${ strokeColor }`,
		} : {}),
		...( typography?.fontFamily    ? { fontFamily:    typography.fontFamily }    : {} ),
		...( typography?.fontSize      ? { fontSize:      typography.fontSize }      : {} ),
		...( typography?.fontWeight    ? { fontWeight:    typography.fontWeight }    : {} ),
		...( typography?.lineHeight    ? { lineHeight:    typography.lineHeight }    : {} ),
		...( typography?.letterSpacing ? { letterSpacing: typography.letterSpacing } : {} ),
		...( typography?.textTransform ? { textTransform: typography.textTransform } : {} ),
	};

	const blockProps = useBlockProps.save( {
		className: `nx-heading-wrapper${ cssClasses ? ' ' + cssClasses : '' }`,
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		...(animation?.animation ? {
			'data-nx-animation': animation.animation,
			'data-nx-duration':  animation.duration ?? 600,
			'data-nx-delay':     animation.delay    ?? 0,
		} : {}),
	} );

	const heading = (
		<Tag className="nexus-heading" style={ textStyle }>
			<RichText.Content value={ content } />
		</Tag>
	);

	return (
		<div { ...blockProps }>
			{ linkUrl ? (
				<a href={ linkUrl }
					target={ linkTarget ? '_blank' : undefined }
					rel={ linkNofollow ? 'nofollow noreferrer' : undefined }
				>
					{ heading }
				</a>
			) : heading }
		</div>
	);
}
