/**
 * Simple classnames utility — merges class strings, filtering falsy values.
 *
 * @param  {...(string|undefined|null|false)} args
 * @returns {string}
 */
export function cx( ...args ) {
	return args.filter( Boolean ).join( ' ' );
}

export default cx;
