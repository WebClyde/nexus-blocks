/**
 * Accordion — Frontend: expand/collapse logic.
 */
export function initAccordions() {
	const accordions = document.querySelectorAll( '.nexus-accordion' );

	accordions.forEach( ( accordion ) => {
		const headers = accordion.querySelectorAll( '.nx-accordion-header' );

		headers.forEach( ( header ) => {
			header.addEventListener( 'click', () => {
				const item    = header.parentElement;
				const content = item.querySelector( '.nx-accordion-content' );
				const isOpen  = item.classList.contains( 'is-open' );
				const icon    = header.querySelector( 'i' );

				// Close all others
				accordion.querySelectorAll( '.nx-accordion-item.is-open' ).forEach( ( openItem ) => {
					if ( openItem !== item ) {
						openItem.classList.remove( 'is-open' );
						const openContent = openItem.querySelector( '.nx-accordion-content' );
						if ( openContent ) slideUp( openContent );
						openItem.querySelector( '.nx-accordion-header' )?.setAttribute( 'aria-expanded', 'false' );
					}
				} );

				item.classList.toggle( 'is-open', ! isOpen );
				header.setAttribute( 'aria-expanded', String( ! isOpen ) );
				if ( content ) {
					if ( ! isOpen ) slideDown( content );
					else slideUp( content );
				}
			} );
		} );
	} );
}

function slideDown( el ) {
	el.style.display = 'block';
	el.style.overflow = 'hidden';
	const height = el.scrollHeight;
	el.style.maxHeight = '0';
	requestAnimationFrame( () => {
		el.style.transition = 'max-height 0.35s ease';
		el.style.maxHeight = height + 'px';
		setTimeout( () => { el.style.overflow = ''; el.style.maxHeight = ''; }, 360 );
	} );
}

function slideUp( el ) {
	el.style.maxHeight = el.scrollHeight + 'px';
	el.style.overflow  = 'hidden';
	requestAnimationFrame( () => {
		el.style.transition = 'max-height 0.3s ease';
		el.style.maxHeight  = '0';
		setTimeout( () => { el.style.display = 'none'; el.style.maxHeight = ''; el.style.overflow = ''; }, 310 );
	} );
}
