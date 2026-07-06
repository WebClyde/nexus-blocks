/**
 * ColumnCountPicker — shown when a Row/Grid Layout has no children yet.
 * Lets the user choose how many columns/items to start with (1–6).
 */
import { Placeholder, Button } from '@wordpress/components';

/** Tiny preview icon: `count` evenly-spaced vertical bars. */
function ColumnPreview( { count } ) {
	const gap = 3;
	const barWidth = ( 48 - gap * ( count - 1 ) ) / count;
	const bars = Array.from( { length: count }, ( _, i ) => (
		<rect
			key={ i }
			x={ i * ( barWidth + gap ) }
			y="0"
			width={ barWidth }
			height="32"
			rx="2"
			fill="currentColor"
		/>
	) );
	return (
		<svg viewBox="0 0 48 32" width="48" height="32" xmlns="http://www.w3.org/2000/svg">
			{ bars }
		</svg>
	);
}

export default function ColumnCountPicker( { icon = 'columns', label, instructions, onPick } ) {
	return (
		<Placeholder icon={ icon } label={ label } instructions={ instructions }>
			<div style={ { display: 'flex', gap: '8px', flexWrap: 'wrap' } }>
				{ [ 1, 2, 3, 4, 5, 6 ].map( ( count ) => (
					<Button
						key={ count }
						variant="secondary"
						onClick={ () => onPick( count ) }
						style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: 'auto', padding: '10px 14px' } }
					>
						<ColumnPreview count={ count } />
						<span>{ count }</span>
					</Button>
				) ) }
			</div>
		</Placeholder>
	);
}
