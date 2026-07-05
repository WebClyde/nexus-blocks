/**
 * Nexus Blocks — Frontend JS entry point.
 * Handles all client-side interactions: counters, accordions, tabs,
 * progress bars, scroll animations, button hovers, alert dismiss.
 */

import { initCounters } from './blocks/counter/frontend';
import { initProgressBars } from './blocks/progress-bar/frontend';
import { initTabs } from './blocks/tabs/frontend';
import { initAccordions } from './blocks/accordion/frontend';
import { initAlerts } from './blocks/alert/frontend';
import { initEntranceAnimations } from './hooks/entrance-animations';

/**
 * Button hover text-color swap — reads data-hover-text-color and applies it
 * on mouseenter, reverts on mouseleave. Hover *background* is handled purely
 * in CSS (see BackgroundControl's backgroundHoverToCSS) so it works without JS.
 */
function initButtonHovers() {
	const buttons = document.querySelectorAll( '.nexus-button[data-hover-text-color]' );

	buttons.forEach( ( btn ) => {
		const hoverText = btn.dataset.hoverTextColor;
		let origColor;

		btn.addEventListener( 'mouseenter', () => {
			origColor = btn.style.color;
			if ( hoverText ) btn.style.color = hoverText;
		} );

		btn.addEventListener( 'mouseleave', () => {
			btn.style.color = origColor;
		} );
	} );
}

document.addEventListener( 'DOMContentLoaded', () => {
	initCounters();
	initProgressBars();
	initTabs();
	initAccordions();
	initAlerts();
	initButtonHovers();
	initEntranceAnimations();
} );
