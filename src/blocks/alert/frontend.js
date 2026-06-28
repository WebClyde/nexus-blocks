/**
 * Alert — Frontend: dismiss logic with optional cookie persistence.
 */
export function initAlerts() {
	const alerts = document.querySelectorAll( '.nexus-alert.is-dismissible' );

	alerts.forEach( ( alert ) => {
		const cookieId   = alert.dataset.cookieId;
		const cookieDays = parseInt( alert.dataset.cookieDays ) || 30;

		// Check if already dismissed via cookie
		if ( cookieId && getCookie( cookieId ) ) {
			alert.closest( '.nx-alert-block' )?.remove();
			alert.remove();
			return;
		}

		const btn = alert.querySelector( '.nx-alert-dismiss' );
		if ( ! btn ) return;

		btn.addEventListener( 'click', () => {
			alert.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
			alert.style.opacity    = '0';
			alert.style.transform  = 'translateY(-8px)';
			setTimeout( () => {
				alert.closest( '[data-nexus-id]' )?.remove();
				alert.remove();
			}, 310 );

			if ( cookieId ) setCookie( cookieId, '1', cookieDays );
		} );
	} );
}

function getCookie( name ) {
	return document.cookie.split( '; ' ).find( ( r ) => r.startsWith( name + '=' ) )?.split( '=' )[ 1 ];
}

function setCookie( name, value, days ) {
	const expires = new Date( Date.now() + days * 864e5 ).toUTCString();
	document.cookie = `${ name }=${ value }; expires=${ expires }; path=/; SameSite=Lax`;
}
