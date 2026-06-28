/**
 * Counter — Frontend: count-up animation on scroll into view.
 */
export function initCounters() {
	const counters = document.querySelectorAll( '.nexus-counter' );
	if ( ! counters.length ) return;

	const observer = new IntersectionObserver(
		( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					animateCounter( entry.target );
					observer.unobserve( entry.target );
				}
			} );
		},
		{ threshold: 0.3 }
	);

	counters.forEach( ( el ) => observer.observe( el ) );
}

function animateCounter( el ) {
	const valueEl  = el.querySelector( '.nx-counter-value' );
	if ( ! valueEl ) return;

	const start     = parseFloat( el.dataset.start )    || 0;
	const end       = parseFloat( el.dataset.end )       || 0;
	const duration  = parseFloat( el.dataset.duration )  || 2000;
	const decimals  = parseInt( el.dataset.decimals )    || 0;
	const separator = el.dataset.separator || '';
	const startTime = performance.now();

	function easeOutCubic( t ) { return 1 - Math.pow( 1 - t, 3 ); }

	function format( num ) {
		const fixed = num.toFixed( decimals );
		if ( ! separator ) return fixed;
		const parts = fixed.split( '.' );
		parts[ 0 ] = parts[ 0 ].replace( /\B(?=(\d{3})+(?!\d))/g, separator );
		return parts.join( '.' );
	}

	function step( now ) {
		const elapsed  = now - startTime;
		const progress = Math.min( elapsed / duration, 1 );
		const current  = start + ( end - start ) * easeOutCubic( progress );
		valueEl.textContent = format( current );
		if ( progress < 1 ) requestAnimationFrame( step );
	}

	requestAnimationFrame( step );
}
