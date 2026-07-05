/**
 * Advanced Heading — Save Component
 */

import { RichText, useBlockProps } from '@wordpress/block-editor';
import { buildTextStyle, buildWrapperStyle } from './style-utils';

export default function Save( { attributes } ) {
	const {
		uniqueId, content, tag: Tag = 'h2',
		linkUrl, linkTarget, linkNofollow,
		cssId, cssClasses, animation,
	} = attributes;

	const textStyle = buildTextStyle( attributes );

	const blockProps = useBlockProps.save( {
		className: `nx-heading-wrapper${ cssClasses ? ' ' + cssClasses : '' }`,
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		style: buildWrapperStyle( attributes ),
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
