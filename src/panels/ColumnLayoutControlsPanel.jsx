import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, BaseControl, Button, Tooltip, TextControl } from '@wordpress/components';

/** ── Tiny helper: icon toggle button group ─────────────────────────── */
function IconGroup( { label, value, options, onChange } ) {
	return (
		<BaseControl label={ label }>
			<div style={ {
				display: 'flex',
				gap: '4px',
				flexWrap: 'wrap',
				marginTop: '4px',
			} }>
				{ options.map( ( opt ) => (
					<Tooltip key={ opt.value } text={ opt.label }>
						<Button
							style={ {
								minWidth: '36px',
								height: '36px',
								padding: '0',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: opt.svg ? '12px' : '16px',
								border: `2px solid ${ value === opt.value ? '#4f46e5' : '#ddd' }`,
								borderRadius: '6px',
								background: value === opt.value ? '#eef2ff' : '#fff',
								color: value === opt.value ? '#4f46e5' : '#555',
								cursor: 'pointer',
								transition: 'all 0.15s ease',
							} }
							onClick={ () => onChange( opt.value ) }
						>
							{ opt.svg
								? <span dangerouslySetInnerHTML={ { __html: opt.svg } } style={ { display: 'flex', alignItems: 'center', width: '18px', height: '18px' } } />
								: opt.icon }
						</Button>
					</Tooltip>
				) ) }
			</div>
		</BaseControl>
	);
}

// SVG icon strings for layout options
const SVG = {
	// Display modes
	block:       `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="14" height="4" rx="1" fill="currentColor"/><rect x="2" y="9" width="14" height="4" rx="1" fill="currentColor"/></svg>`,
	flex:        `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="4" height="10" rx="1" fill="currentColor"/><rect x="7" y="4" width="4" height="10" rx="1" fill="currentColor"/><rect x="12" y="4" width="4" height="10" rx="1" fill="currentColor"/></svg>`,
	inlineFlex:  `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="5" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="9" y="5" width="3" height="8" rx="1" fill="currentColor"/></svg>`,
	grid:        `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor"/><rect x="10" y="2" width="6" height="6" rx="1" fill="currentColor"/><rect x="2" y="10" width="6" height="6" rx="1" fill="currentColor"/><rect x="10" y="10" width="6" height="6" rx="1" fill="currentColor"/></svg>`,
	// Direction
	row:         `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="5" width="4" height="8" rx="1" fill="currentColor"/><rect x="7" y="5" width="4" height="8" rx="1" fill="currentColor"/><rect x="13" y="5" width="4" height="8" rx="1" fill="currentColor"/><path d="M1 9h16" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/></svg>`,
	rowReverse:  `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="13" y="5" width="4" height="8" rx="1" fill="currentColor"/><rect x="7" y="5" width="4" height="8" rx="1" fill="currentColor"/><rect x="1" y="5" width="4" height="8" rx="1" fill="currentColor"/><path d="M17 9H1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="4,6 1,9 4,12" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	column:      `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="1" width="10" height="4" rx="1" fill="currentColor"/><rect x="4" y="7" width="10" height="4" rx="1" fill="currentColor"/><rect x="4" y="13" width="10" height="4" rx="1" fill="currentColor"/></svg>`,
	colReverse:  `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="13" width="10" height="4" rx="1" fill="currentColor"/><rect x="4" y="7" width="10" height="4" rx="1" fill="currentColor"/><rect x="4" y="1" width="10" height="4" rx="1" fill="currentColor"/><path d="M9 1v16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><polyline points="6,14 9,17 12,14" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
	// Wrap
	wrap:        `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="3" width="4" height="5" rx="1" fill="currentColor"/><rect x="7" y="3" width="4" height="5" rx="1" fill="currentColor"/><rect x="13" y="3" width="4" height="5" rx="1" fill="currentColor"/><rect x="1" y="10" width="4" height="5" rx="1" fill="currentColor" opacity="0.5"/></svg>`,
	nowrap:      `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="5" width="4" height="8" rx="1" fill="currentColor"/><rect x="7" y="5" width="4" height="8" rx="1" fill="currentColor"/><rect x="13" y="5" width="4" height="8" rx="1" fill="currentColor"/><path d="M1 9h16" stroke="currentColor" stroke-width="0.75" stroke-dasharray="1 1" opacity="0.5"/></svg>`,
	// Justify Content
	jStart:      `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="3" x2="2" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="4" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="9" y="5" width="3" height="8" rx="1" fill="currentColor"/></svg>`,
	jCenter:     `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="9" y1="3" x2="9" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 2"/><rect x="3" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="12" y="5" width="3" height="8" rx="1" fill="currentColor"/></svg>`,
	jEnd:        `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="16" y1="3" x2="16" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="11" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="6" y="5" width="3" height="8" rx="1" fill="currentColor"/></svg>`,
	jBetween:    `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="14" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="7.5" y="5" width="3" height="8" rx="1" fill="currentColor"/></svg>`,
	jAround:     `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="13" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="7.5" y="5" width="3" height="8" rx="1" fill="currentColor"/><line x1="1" y1="9" x2="17" y2="9" stroke="currentColor" stroke-width="0.5" stroke-dasharray="1 3"/></svg>`,
	jEvenly:     `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="12" y="5" width="3" height="8" rx="1" fill="currentColor"/><rect x="7.5" y="5" width="3" height="8" rx="1" fill="currentColor"/></svg>`,
	// Align Items
	aStart:      `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="3" x2="16" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="3" y="5" width="4" height="4" rx="1" fill="currentColor"/><rect x="11" y="5" width="4" height="7" rx="1" fill="currentColor"/></svg>`,
	aCenter:     `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 2"/><rect x="3" y="6" width="4" height="6" rx="1" fill="currentColor"/><rect x="11" y="4" width="4" height="10" rx="1" fill="currentColor"/></svg>`,
	aEnd:        `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="15" x2="16" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><rect x="3" y="9" width="4" height="4" rx="1" fill="currentColor"/><rect x="11" y="6" width="4" height="7" rx="1" fill="currentColor"/></svg>`,
	aStretch:    `<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="2" y1="3" x2="16" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="2" y1="15" x2="16" y2="15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><rect x="3" y="3" width="4" height="12" rx="1" fill="currentColor"/><rect x="11" y="3" width="4" height="12" rx="1" fill="currentColor"/></svg>`,
};

/**
 * 🔲 Column Layout Controls Panel
 *
 * `flexOnly` hides the Display Mode picker and Grid controls entirely — the
 * container is always flex. Used by row-layout, which is flex-only by design.
 * `gridOnly` is the mirror image, used by grid-layout. section-box passes
 * neither and keeps the full picker.
 */
export default function ColumnLayoutControlsPanel( { flexLayout = {}, onChangeFlex, initialOpen = false, flexOnly = false, gridOnly = false, ...props } ) {
	const set = ( key, val ) => onChangeFlex( { ...flexLayout, [ key ]: val } );

	const lockedMode = flexOnly || gridOnly;
	const isFlex = gridOnly ? false : ( flexOnly || flexLayout.display === 'flex' || flexLayout.display === 'inline-flex' );
	const isGrid = flexOnly ? false : ( gridOnly || flexLayout.display === 'grid' );

	return (
		<PanelBody
			title={ __( '🔲 Column Layout', 'nexus-blocks' ) }
			initialOpen={ initialOpen }
			{ ...props }
		>
			{/* ── Display mode ── */}
			{ ! lockedMode && (
				<IconGroup
					label={ __( 'Display Mode', 'nexus-blocks' ) }
					value={ flexLayout.display || '' }
					onChange={ ( v ) => set( 'display', v ) }
					options={ [
						{ value: '',            label: 'Block (Default)',  svg: SVG.block },
						{ value: 'flex',        label: 'Flex',             svg: SVG.flex },
						{ value: 'inline-flex', label: 'Inline Flex',      svg: SVG.inlineFlex },
						{ value: 'grid',        label: 'CSS Grid',         svg: SVG.grid },
					] }
				/>
			) }

			{/* ── Flex controls ── */}
			{ isFlex && (
				<>
					<IconGroup
						label={ __( 'Direction', 'nexus-blocks' ) }
						value={ flexLayout.flexDirection || 'row' }
						onChange={ ( v ) => set( 'flexDirection', v ) }
						options={ [
							{ value: 'row',            label: 'Row →',           svg: SVG.row },
							{ value: 'row-reverse',    label: 'Row Reverse ←',   svg: SVG.rowReverse },
							{ value: 'column',         label: 'Column ↓',        svg: SVG.column },
							{ value: 'column-reverse', label: 'Column Reverse ↑', svg: SVG.colReverse },
						] }
					/>
					<IconGroup
						label={ __( 'Wrap', 'nexus-blocks' ) }
						value={ flexLayout.flexWrap || 'wrap' }
						onChange={ ( v ) => set( 'flexWrap', v ) }
						options={ [
							{ value: 'nowrap', label: 'No Wrap', svg: SVG.nowrap },
							{ value: 'wrap',   label: 'Wrap',    svg: SVG.wrap },
						] }
					/>
					<IconGroup
						label={ __( 'Justify Content', 'nexus-blocks' ) }
						value={ flexLayout.justifyContent || 'flex-start' }
						onChange={ ( v ) => set( 'justifyContent', v ) }
						options={ [
							{ value: 'flex-start',    label: 'Flex Start',    svg: SVG.jStart },
							{ value: 'center',        label: 'Center',        svg: SVG.jCenter },
							{ value: 'flex-end',      label: 'Flex End',      svg: SVG.jEnd },
							{ value: 'space-between', label: 'Space Between', svg: SVG.jBetween },
							{ value: 'space-around',  label: 'Space Around',  svg: SVG.jAround },
							{ value: 'space-evenly',  label: 'Space Evenly',  svg: SVG.jEvenly },
						] }
					/>
					<IconGroup
						label={ __( 'Align Items', 'nexus-blocks' ) }
						value={ flexLayout.alignItems || 'flex-start' }
						onChange={ ( v ) => set( 'alignItems', v ) }
						options={ [
							{ value: 'flex-start', label: 'Start',   svg: SVG.aStart },
							{ value: 'center',     label: 'Center',  svg: SVG.aCenter },
							{ value: 'flex-end',   label: 'End',     svg: SVG.aEnd },
							{ value: 'stretch',    label: 'Stretch', svg: SVG.aStretch },
						] }
					/>
				</>
			) }

			{/* ── Grid controls ── */}
			{ isGrid && (
				<>
					<RangeControl
						label={ __( 'Columns', 'nexus-blocks' ) }
						help={ __( 'Number of equal columns.', 'nexus-blocks' ) }
						value={ flexLayout.columns || 2 }
						onChange={ ( v ) => set( 'columns', v ) }
						min={ 1 }
						max={ 12 }
					/>
					<TextControl
						label={ __( 'Grid Template Columns', 'nexus-blocks' ) }
						help={ __( 'Advanced columns (e.g. repeat(auto-fit, minmax(200px, 1fr))). Overrides the slider above.', 'nexus-blocks' ) }
						value={ flexLayout.gridTemplateColumns || '' }
						onChange={ ( v ) => set( 'gridTemplateColumns', v ) }
					/>
					<TextControl
						label={ __( 'Grid Template Rows', 'nexus-blocks' ) }
						help={ __( 'Optional row sizing (e.g. 100px 1fr 50px).', 'nexus-blocks' ) }
						value={ flexLayout.gridTemplateRows || '' }
						onChange={ ( v ) => set( 'gridTemplateRows', v ) }
					/>
					<IconGroup
						label={ __( 'Justify Items', 'nexus-blocks' ) }
						value={ flexLayout.justifyItems || 'stretch' }
						onChange={ ( v ) => set( 'justifyItems', v ) }
						options={ [
							{ value: 'start',   label: 'Start',   svg: SVG.jStart },
							{ value: 'center',  label: 'Center',  svg: SVG.jCenter },
							{ value: 'end',     label: 'End',     svg: SVG.jEnd },
							{ value: 'stretch', label: 'Stretch', svg: SVG.aStretch },
						] }
					/>
					<IconGroup
						label={ __( 'Align Items', 'nexus-blocks' ) }
						value={ flexLayout.alignItems || 'stretch' }
						onChange={ ( v ) => set( 'alignItems', v ) }
						options={ [
							{ value: 'start',   label: 'Start',   svg: SVG.aStart },
							{ value: 'center',  label: 'Center',  svg: SVG.aCenter },
							{ value: 'end',     label: 'End',     svg: SVG.aEnd },
							{ value: 'stretch', label: 'Stretch', svg: SVG.aStretch },
						] }
					/>
				</>
			) }
		</PanelBody>
	);
}
