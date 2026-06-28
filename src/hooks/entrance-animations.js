/**
 * Nexus Blocks — Entrance Animations
 * Uses IntersectionObserver to trigger CSS-class-based entrance animations
 * when elements scroll into view.
 */

const ANIMATION_CLASS = 'nx-animated';
const DONE_CLASS      = 'nx-anim-done';

export function initEntranceAnimations() {
	const elements = document.querySelectorAll( '[data-nx-animation]' );
	if ( ! elements.length ) return;

	const observer = new IntersectionObserver(
		( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					const el        = entry.target;
					const animation = el.dataset.nxAnimation;
					const delay     = el.dataset.nxDelay ?? 0;
					const duration  = el.dataset.nxDuration ?? 600;

					el.style.animationDelay    = `${ delay }ms`;
					el.style.animationDuration = `${ duration }ms`;
					el.classList.add( ANIMATION_CLASS, `nx-anim-${ animation }` );

					if ( el.dataset.nxRepeat !== 'loop' ) {
						el.classList.add( DONE_CLASS );
						observer.unobserve( el );
					}
				}
			} );
		},
		{
			threshold:  0.1,
			rootMargin: '0px 0px -50px 0px',
		}
	);

	elements.forEach( ( el ) => {
		if ( ! el.classList.contains( DONE_CLASS ) ) {
			observer.observe( el );
		}
	} );
}
