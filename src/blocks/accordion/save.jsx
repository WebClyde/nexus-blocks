import { useBlockProps } from '@wordpress/block-editor';
import { buildScopedCSS } from '../../hooks/useStyleOutput';
import { buildAccordionRules } from './style';

export default function Save( { attributes } ) {
	const { uniqueId, items, defaultOpen, openIconClass, closeIconClass, iconPosition, faqSchema, cssId, cssClasses, animation } = attributes;
	const blockProps = useBlockProps.save( { 'data-nexus-id': uniqueId, id: cssId || undefined, ...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} ) } );
	const listItems = items ?? [];
	const scopedCss = buildScopedCSS( uniqueId, buildAccordionRules( attributes ) );
	return (
		<div { ...blockProps }>
			{ scopedCss && <style dangerouslySetInnerHTML={ { __html: scopedCss } } /> }
			{ faqSchema && (
				<script type="application/ld+json" dangerouslySetInnerHTML={ { __html: JSON.stringify( { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: listItems.map( ( item ) => ( { '@type': 'Question', name: item.title, acceptedAnswer: { '@type': 'Answer', text: item.content } } ) ) } ) } } />
			) }
			<div className={ `nexus-accordion${ cssClasses ? ' ' + cssClasses : '' }` } data-default-open={ defaultOpen ?? -1 }>
				{ listItems.map( ( item, idx ) => (
					<div key={ idx } className={ `nx-accordion-item${ idx === ( defaultOpen ?? -1 ) ? ' is-open' : '' }` }>
						<button className="nx-accordion-header" aria-expanded={ idx === ( defaultOpen ?? -1 ) }
								style={ { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: 'none', cursor: 'pointer', textAlign: 'left' } }
						>
							{ iconPosition === 'left' && (
								<>
									<i className={ `nx-accordion-icon-closed ${ openIconClass || 'fa-solid fa-chevron-down' }` } style={ { marginRight: 12 } } />
									<i className={ `nx-accordion-icon-opened ${ closeIconClass || 'fa-solid fa-chevron-up' }` } style={ { marginRight: 12 } } />
								</>
							) }
							<span style={ { flex: 1 } }>{ item.title }</span>
							{ iconPosition !== 'left' && (
								<>
									<i className={ `nx-accordion-icon-closed ${ openIconClass || 'fa-solid fa-chevron-down' }` } style={ { marginLeft: 12 } } />
									<i className={ `nx-accordion-icon-opened ${ closeIconClass || 'fa-solid fa-chevron-up' }` } style={ { marginLeft: 12 } } />
								</>
							) }
						</button>
						<div className="nx-accordion-content" style={ { display: idx === ( defaultOpen ?? -1 ) ? 'block' : 'none' } }>
							<div className="nx-accordion-content-inner">
								<p style={ { margin: 0 } }>{ item.content }</p>
							</div>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
}
