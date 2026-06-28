/**
 * Progress Bar — Frontend: animated fill on scroll.
 */

// Easing function
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

function animateValue(obj, start, end, duration) {
	let startTimestamp = null;
	const step = (timestamp) => {
		if (!startTimestamp) startTimestamp = timestamp;
		const progress = Math.min((timestamp - startTimestamp) / duration, 1);
		const current = Math.round(start + (end - start) * easeOutQuart(progress));
		obj.innerHTML = current + '%';
		if (progress < 1) {
			window.requestAnimationFrame(step);
		}
	};
	window.requestAnimationFrame(step);
}

export function initProgressBars() {
	const items = document.querySelectorAll( '.nx-progress-item[data-animate="1"]' );
	if ( ! items.length ) return;

	const observer = new IntersectionObserver(
		( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					// 1. Fill Animations (Linear / Histogram)
					const fills = entry.target.querySelectorAll( '.nx-progress-fill' );
					fills.forEach(fill => {
						const target = fill.dataset.target;
						const type = fill.dataset.type; // 'width' or 'height'
						if ( target && type ) {
							fill.style[type] = `${ target }%`;
						}
					});

					// 2. Circle Animations
					const circleFill = entry.target.querySelector( '.nx-circle-fill' );
					if (circleFill && circleFill.dataset.targetOffset) {
						circleFill.style.strokeDashoffset = circleFill.dataset.targetOffset;
					}

					// 3. Counter Animations
					const pctNodes = entry.target.querySelectorAll( '.nx-progress-pct' );
					pctNodes.forEach(node => {
						const target = parseInt(node.dataset.target, 10);
						if (!isNaN(target)) {
							// 1200ms is the default transition duration in style.js
							animateValue(node, 0, target, 1200); 
						}
					});

					// Stop observing after animating
					observer.unobserve( entry.target );
				}
			} );
		},
		{ threshold: 0.2 }
	);

	items.forEach( ( el ) => observer.observe( el ) );
}
