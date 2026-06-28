/**
 * Progress Bar — Save
 */
import { useBlockProps } from '@wordpress/block-editor';
import { buildScopedCSS } from '../../hooks/useStyleOutput';
import { buildProgressBarRules } from './style';

export default function Save( { attributes } ) {
	const {
		uniqueId, items, displayPercentage, percentagePosition,
		layoutType, circleSize, circleStrokeWidth,
		cssId, cssClasses, animation
	} = attributes;

	const blockProps = useBlockProps.save( {
		'data-nexus-id': uniqueId,
		id: cssId || undefined,
		...( animation?.animation ? { 'data-nx-animation': animation.animation, 'data-nx-duration': animation.duration ?? 600, 'data-nx-delay': animation.delay ?? 0 } : {} )
	} );

	const scopedCss = buildScopedCSS( uniqueId, buildProgressBarRules( attributes ) );
	const listItems = items ?? [];

	const isHistogram = layoutType === 'histogram';
	const isCircle    = layoutType === 'circle';
	const isLinear    = !isHistogram && !isCircle;

	return (
		<div { ...blockProps }>
			{ scopedCss && <style dangerouslySetInnerHTML={ { __html: scopedCss } } /> }
			<div className={ `nexus-progress-bars${ cssClasses ? ' ' + cssClasses : '' }` }>
				{ listItems.map( ( item, idx ) => {
					const targetPct = item.percentage || 0;
					const radius = (circleSize || 120) / 2 - (circleStrokeWidth || 8) / 2;
					const circumference = 2 * Math.PI * radius;
					const dashoffset = circumference; // Start fully hidden for intersection observer

					return (
						<div key={ idx } className="nx-progress-item" data-animate="1">
							<div className="nx-progress-header">
								<span className="nx-progress-title">{ item.title }</span>
								{ displayPercentage && (isHistogram || isCircle || percentagePosition !== 'inside') && (
									<span className="nx-progress-pct" data-target={ targetPct }>0%</span>
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
												strokeDashoffset: dashoffset, // Initial state
												stroke: item.color || undefined 
											}}
											data-target-offset={ circumference - (targetPct / 100) * circumference }
										/>
									</svg>
									{ displayPercentage && (
										<div className="nx-progress-pct-absolute">
											<span className="nx-progress-pct" data-target={ targetPct }>0%</span>
										</div>
									) }
								</div>
							) }

							{ isHistogram && (
								<div className="nx-progress-track">
									<div 
										className="nx-progress-fill" 
										style={{ background: item.color || undefined }}
										data-target={ targetPct }
										data-type="height"
									></div>
								</div>
							) }

							{ isLinear && (
								<div className="nx-progress-track">
									<div 
										className="nx-progress-fill" 
										style={{ background: item.color || undefined }}
										data-target={ targetPct }
										data-type="width"
									>
										{ displayPercentage && percentagePosition === 'inside' && (
											<span style={{ paddingRight: 8 }} className="nx-progress-pct" data-target={ targetPct }>0%</span>
										) }
									</div>
								</div>
							) }
						</div>
					);
				} ) }
			</div>
		</div>
	);
}
