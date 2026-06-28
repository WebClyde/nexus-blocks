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
 * Button hover color swap — reads data-hover-text-color and data-hover-bg-color
 * and applies them on mouseenter, reverts on mouseleave.
 */
function initButtonHovers() {
	const buttons = document.querySelectorAll( '.nexus-button[data-hover-text-color], .nexus-button[data-hover-bg-color]' );

	buttons.forEach( ( btn ) => {
		const hoverText = btn.dataset.hoverTextColor;
		const hoverBg   = btn.dataset.hoverBgColor;
		let origColor, origBg;

		btn.addEventListener( 'mouseenter', () => {
			origColor = btn.style.color;
			origBg    = btn.style.background;
			if ( hoverText ) btn.style.color      = hoverText;
			if ( hoverBg )   btn.style.background  = hoverBg;
		} );

		btn.addEventListener( 'mouseleave', () => {
			btn.style.color      = origColor;
			btn.style.background = origBg;
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
