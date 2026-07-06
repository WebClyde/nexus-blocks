/**
 * Progress Bar — Edit
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { TextControl, SelectControl, RangeControl, ToggleControl, Button } from '@wordpress/components';
import { useStyleOutput } from '../../hooks/useStyleOutput';
import { buildProgressBarRules } from './style';
import { TypographyControl, ColorControl, SpacingControl, AnimationControl } from '../../controls';
import {
	SizeAndSpacingPanel,
	ColorsAndBackgroundsPanel,
	TypographyPanel,
	InteractionsPanel,
	DataAndSchemaPanel,
	ColumnLayoutControlsPanel
} from '../../panels';

const DEFAULT_ITEM = { title: 'Skill', percentage: 75, color: '' };

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId, items, displayPercentage, percentagePosition,
		layoutType, continuousAnimation, counterAnimation, circleSize, circleStrokeWidth,
		animateOnScroll, animationDuration, barHeight, barBgColor, fillColor, fillGradient,
		enableGradient, barBorderRadius, titleColor, titleTypography, titleSpacing,
		percentageColor, percentageTypography, itemGap, margin, padding, flexLayout, cssId, cssClasses, animation
	} = attributes;

	useEffect( () => {
		const expected = `nx-${ clientId.slice( 0, 8 ) }`;
		if ( uniqueId !== expected ) setAttributes( { uniqueId: expected } );
	}, [ clientId ] );

	const blockProps = useBlockProps( { 'data-nexus-id': uniqueId, id: cssId || undefined } );
	const scopedCss = useStyleOutput( uniqueId, buildProgressBarRules, attributes );
	const listItems = items ?? [ DEFAULT_ITEM ];

	const updateItem = ( idx, key, val ) => setAttributes( { items: listItems.map( ( it, i ) => i === idx ? { ...it, [ key ]: val } : it ) } );
	const addItem    = () => setAttributes( { items: [ ...listItems, { ...DEFAULT_ITEM } ] } );
	const removeItem = ( idx ) => setAttributes( { items: listItems.filter( ( _, i ) => i !== idx ) } );

	const isHistogram = layoutType === 'histogram';
	const isCircle    = layoutType === 'circle';
	const isLinear    = !isHistogram && !isCircle;

	// Editor Animation Logic
	const [ animatedValues, setAnimatedValues ] = useState( listItems.map( () => 0 ) );
	const [ triggerAnim, setTriggerAnim ] = useState( 0 );

	// Re-trigger animation when attributes change in the editor
	useEffect( () => {
		setTriggerAnim( prev => prev + 1 );
	}, [ items, layoutType, counterAnimation ] );

	useEffect( () => {
		if ( ! counterAnimation ) {
			setAnimatedValues( listItems.map( it => it.percentage ) );
			return;
		}

		let start = null;
		const duration = animationDuration || 1200;
		let reqId;

		const step = ( timestamp ) => {
			if ( ! start ) start = timestamp;
			const progress = Math.min( ( timestamp - start ) / duration, 1 );
			const easeOutQuart = 1 - Math.pow( 1 - progress, 4 );

			setAnimatedValues( listItems.map( it => Math.round( it.percentage * easeOutQuart ) ) );

			if ( progress < 1 ) {
				reqId = requestAnimationFrame( step );
			}
		};

		reqId = requestAnimationFrame( step );
		return () => cancelAnimationFrame( reqId );
	}, [ triggerAnim, animationDuration ] );

	return (
		<>
			<InspectorControls>
				<DataAndSchemaPanel initialOpen={ true }>
					<SelectControl
						label={ __( 'Layout Type', 'nexus-blocks' ) }
						value={ layoutType || 'linear' }
						options={ [
							{ label: 'Linear', value: 'linear' },
							{ label: 'Histogram', value: 'histogram' },
							{ label: 'Circle', value: 'circle' }
						] }
						onChange={ ( v ) => setAttributes( { layoutType: v } ) }
					/>
					<hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #ddd' }} />
					{ listItems.map( ( item, idx ) => (
						<div key={ idx } style={ { border: '1px solid #ddd', padding: 8, marginBottom: 8, borderRadius: 4 } }>
							<TextControl label={ __( 'Title', 'nexus-blocks' ) } value={ item.title ?? '' } onChange={ ( v ) => updateItem( idx, 'title', v ) } />
							<RangeControl label={ __( 'Percentage', 'nexus-blocks' ) } value={ item.percentage ?? 75 } onChange={ ( v ) => updateItem( idx, 'percentage', v ) } min={ 0 } max={ 100 } />
							<ColorControl label={ __( 'Color Override', 'nexus-blocks' ) } value={ item.color ?? '' } onChange={ ( v ) => updateItem( idx, 'color', v ) } />
							<Button isSmall isDestructive variant="tertiary" onClick={ () => removeItem( idx ) }>{ __( 'Remove', 'nexus-blocks' ) }</Button>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addItem } style={{ marginBottom: 16 }}>{ __( '+ Add Bar', 'nexus-blocks' ) }</Button>
					<TextControl label={ __( 'CSS ID', 'nexus-blocks' ) } value={ cssId } onChange={ ( v ) => setAttributes( { cssId: v } ) } />
					<TextControl label={ __( 'CSS Classes', 'nexus-blocks' ) } value={ cssClasses } onChange={ ( v ) => setAttributes( { cssClasses: v } ) } />
				</DataAndSchemaPanel>

				<TypographyPanel initialOpen={ false }>
					<ToggleControl label={ __( 'Display Percentage', 'nexus-blocks' ) } checked={ !! displayPercentage } onChange={ ( v ) => setAttributes( { displayPercentage: v } ) } />
					{ displayPercentage && isLinear && <SelectControl label={ __( 'Position', 'nexus-blocks' ) } value={ percentagePosition ?? 'right' } options={ [ { label: 'Inside Bar', value: 'inside' }, { label: 'Outside Right', value: 'right' }, { label: 'Above Right', value: 'above' } ] } onChange={ ( v ) => setAttributes( { percentagePosition: v } ) } /> }
					<ColorControl label={ __( 'Title Color', 'nexus-blocks' ) } value={ titleColor } onChange={ ( v ) => setAttributes( { titleColor: v } ) } />
					<TypographyControl label={ __( 'Title', 'nexus-blocks' ) } value={ titleTypography } onChange={ ( v ) => setAttributes( { titleTypography: v } ) } />
					<RangeControl label={ __( 'Title Spacing (px)', 'nexus-blocks' ) } value={ titleSpacing ?? 6 } onChange={ ( v ) => setAttributes( { titleSpacing: v } ) } min={ 0 } max={ 32 } />
					<ColorControl label={ __( 'Percentage Color', 'nexus-blocks' ) } value={ percentageColor } onChange={ ( v ) => setAttributes( { percentageColor: v } ) } />
					<TypographyControl label={ __( 'Percentage Typography', 'nexus-blocks' ) } value={ percentageTypography } onChange={ ( v ) => setAttributes( { percentageTypography: v } ) } />
				</TypographyPanel>

				<SizeAndSpacingPanel initialOpen={ false }>
					{ isLinear && <RangeControl label={ __( 'Bar Height (px)', 'nexus-blocks' ) } value={ barHeight ?? 12 } onChange={ ( v ) => setAttributes( { barHeight: v } ) } min={ 4 } max={ 60 } /> }
					{ ( isLinear || isHistogram ) && <TextControl label={ __( 'Border Radius', 'nexus-blocks' ) } value={ barBorderRadius ?? '999px' } onChange={ ( v ) => setAttributes( { barBorderRadius: v } ) } /> }
					{ isCircle && (
						<>
							<RangeControl label={ __( 'Circle Size (px)', 'nexus-blocks' ) } value={ circleSize ?? 120 } onChange={ ( v ) => setAttributes( { circleSize: v } ) } min={ 60 } max={ 300 } />
							<RangeControl label={ __( 'Stroke Width (px)', 'nexus-blocks' ) } value={ circleStrokeWidth ?? 8 } onChange={ ( v ) => setAttributes( { circleStrokeWidth: v } ) } min={ 2 } max={ 30 } />
						</>
					) }
					<RangeControl label={ __( 'Gap Between Bars (px)', 'nexus-blocks' ) } value={ itemGap ?? 20 } onChange={ ( v ) => setAttributes( { itemGap: v } ) } min={ 0 } max={ 80 } />
					<SpacingControl label={ __( 'Margin', 'nexus-blocks' ) } value={ margin } onChange={ ( v ) => setAttributes( { margin: v } ) } allowNegative />
					<SpacingControl label={ __( 'Padding', 'nexus-blocks' ) } value={ padding } onChange={ ( v ) => setAttributes( { padding: v } ) } />
				</SizeAndSpacingPanel>

				<ColumnLayoutControlsPanel 
					initialOpen={ false }
					flexLayout={ flexLayout || {} } 
					onChangeFlex={ ( v ) => setAttributes( { flexLayout: v } ) } 
				/>

				<ColorsAndBackgroundsPanel initialOpen={ false }>
					<ColorControl label={ __( 'Track Background', 'nexus-blocks' ) } value={ barBgColor } onChange={ ( v ) => setAttributes( { barBgColor: v } ) } />
					<ToggleControl label={ __( 'Gradient Fill', 'nexus-blocks' ) } checked={ !! enableGradient } onChange={ ( v ) => setAttributes( { enableGradient: v } ) } />
					{ enableGradient
						? <TextControl label={ __( 'Gradient CSS', 'nexus-blocks' ) } value={ fillGradient ?? '' } onChange={ ( v ) => setAttributes( { fillGradient: v } ) } />
						: <ColorControl label={ __( 'Fill Color', 'nexus-blocks' ) } value={ fillColor } onChange={ ( v ) => setAttributes( { fillColor: v } ) } />
					}
				</ColorsAndBackgroundsPanel>

				<InteractionsPanel initialOpen={ false }>
					<ToggleControl label={ __( 'Continuous Striped Animation', 'nexus-blocks' ) } checked={ !! continuousAnimation } onChange={ ( v ) => setAttributes( { continuousAnimation: v } ) } help="Adds a continuous moving pattern to the active progress." />
					<ToggleControl label={ __( 'Animate Number Counter', 'nexus-blocks' ) } checked={ !! counterAnimation } onChange={ ( v ) => setAttributes( { counterAnimation: v } ) } help="Animates the percentage text from 0 to the target." />
					<ToggleControl label={ __( 'Animate on Scroll', 'nexus-blocks' ) } checked={ !! animateOnScroll } onChange={ ( v ) => setAttributes( { animateOnScroll: v } ) } />
					<RangeControl label={ __( 'Animation Duration (ms)', 'nexus-blocks' ) } value={ animationDuration ?? 1200 } onChange={ ( v ) => setAttributes( { animationDuration: v } ) } min={ 300 } max={ 3000 } step={ 100 } />
					<AnimationControl value={ animation } onChange={ ( v ) => setAttributes( { animation: v } ) } />
				</InteractionsPanel>
			</InspectorControls>
			<div { ...blockProps }>
				{ scopedCss && <style>{ scopedCss }</style> }
				<div className="nexus-progress-bars">
					{ listItems.map( ( item, idx ) => {
						const displayedPct = animatedValues[idx];
						const targetPct = item.percentage || 0;
						
						// Circle logic
						const radius = (circleSize || 120) / 2 - (circleStrokeWidth || 8) / 2;
						const circumference = 2 * Math.PI * radius;
						// Trigger animation via style transition
						// In editor, we'll force the delay by waiting for triggerAnim state
						const dashoffset = triggerAnim ? circumference - (targetPct / 100) * circumference : circumference;

						return (
							<div key={ idx } className="nx-progress-item">
								<div className="nx-progress-header">
									<span className="nx-progress-title">{ item.title }</span>
									{ displayPercentage && (isHistogram || isCircle || percentagePosition !== 'inside') && (
										<span className="nx-progress-pct">{ displayedPct }%</span>
									) }
								</div>

								{ isCircle && (
									<div className="nx-progress-track">
										<svg>
											<circle className="nx-circle-bg" cx="50%" cy="50%" r={ radius } />
											<circle 
												className="nx-circle-fill" 
												cx="50%" cy="50%" r={ radius } 
												style={{ 
													strokeDasharray: circumference, 
													strokeDashoffset: dashoffset,
													stroke: item.color || undefined 
												}} 
											/>
										</svg>
										{ displayPercentage && (
											<div className="nx-progress-pct-absolute">
												<span className="nx-progress-pct">{ displayedPct }%</span>
											</div>
										) }
									</div>
								) }

								{ isHistogram && (
									<div className="nx-progress-track">
										<div 
											className="nx-progress-fill" 
											style={{ 
												height: triggerAnim ? `${ targetPct }%` : '0%', 
												background: item.color || undefined 
											}}
										></div>
									</div>
								) }

								{ isLinear && (
									<div className="nx-progress-track">
										<div 
											className="nx-progress-fill" 
											style={{ 
												width: triggerAnim ? `${ targetPct }%` : '0%', 
												background: item.color || undefined 
											}}
										>
											{ displayPercentage && percentagePosition === 'inside' && (
												<span style={{ paddingRight: 8 }}>{ displayedPct }%</span>
											) }
										</div>
									</div>
								) }
							</div>
						);
					} ) }
				</div>
			</div>
		</>
	);
}
