/**
 * Shared style builder for the Advanced Heading block.
 * Used by both edit.jsx and save.jsx so their output can never drift apart.
 */

import { spacingToStyle } from '../../controls/SpacingControl';

export function buildTextStyle( attributes ) {
	const {
		textColor, enableGradient, gradient, typography,
		enableStroke, strokeWidth, strokeColor,
	} = attributes;

	return {
		color: textColor || undefined,
		...( enableGradient ? {
			backgroundImage: `linear-gradient(${ gradient?.angle ?? 135 }deg, ${ gradient?.start ?? '#7C3AED' }, ${ gradient?.end ?? '#06B6D4' })`,
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor:  'transparent',
			backgroundClip:       'text',
		} : {} ),
		...( enableStroke ? {
			WebkitTextStroke: `${ strokeWidth } ${ strokeColor }`,
		} : {} ),
		...( typography?.fontFamily    ? { fontFamily:    typography.fontFamily }    : {} ),
		...( typography?.fontSize      ? { fontSize:      typography.fontSize }      : {} ),
		...( typography?.fontWeight    ? { fontWeight:    typography.fontWeight }    : {} ),
		...( typography?.lineHeight    ? { lineHeight:    typography.lineHeight }    : {} ),
		...( typography?.letterSpacing ? { letterSpacing: typography.letterSpacing } : {} ),
		...( typography?.textTransform ? { textTransform: typography.textTransform } : {} ),
	};
}

export function buildWrapperStyle( attributes ) {
	const { alignment, margin, padding } = attributes;

	return {
		textAlign: alignment || undefined,
		...spacingToStyle( margin, 'margin' ),
		...spacingToStyle( padding, 'padding' ),
	};
}
