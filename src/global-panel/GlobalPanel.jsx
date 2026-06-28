/**
 * GlobalPanel — tabbed design token editor UI.
 * Reads/writes nexus_global_settings via REST API.
 */

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
	TabPanel,
	TextControl,
	RangeControl,
	Button,
	Notice,
	Spinner,
	TextareaControl,
} from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import ColorControl from '../controls/ColorControl';

const TABS = [
	{ name: 'colors',     title: __( '🎨 Colors', 'nexus-blocks' ) },
	{ name: 'typography', title: __( '✏️ Typography', 'nexus-blocks' ) },
	{ name: 'spacing',    title: __( '📐 Spacing', 'nexus-blocks' ) },
	{ name: 'custom-css', title: __( '💻 CSS', 'nexus-blocks' ) },
];

const COLOR_KEYS = [ 'primary', 'secondary', 'text', 'heading', 'accent', 'bg', 'surface', 'border' ];
const COLOR_LABELS = {
	primary:   'Primary',
	secondary: 'Secondary',
	text:      'Text',
	heading:   'Heading',
	accent:    'Accent',
	bg:        'Background',
	surface:   'Surface',
	border:    'Border',
};

const SPACING_KEYS = [ 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl' ];

export default function GlobalPanel() {
	const [ settings, setSettings ] = useState( window.nexusBlocksData?.globalSettings ?? {} );
	const [ saving,   setSaving ]   = useState( false );
	const [ notice,   setNotice ]   = useState( null );

	const setIn = ( path, value ) => {
		const parts  = path.split( '.' );
		const newSet = structuredClone( settings );
		let obj      = newSet;
		for ( let i = 0; i < parts.length - 1; i++ ) {
			obj = obj[ parts[ i ] ] ??= {};
		}
		obj[ parts.at( -1 ) ] = value;
		setSettings( newSet );
	};

	const save = async () => {
		setSaving( true );
		setNotice( null );
		try {
			await apiFetch( {
				path:   '/nexus-blocks/v1/global-settings',
				method: 'POST',
				data:   settings,
			} );
			setNotice( { type: 'success', message: __( 'Settings saved!', 'nexus-blocks' ) } );
		} catch ( err ) {
			setNotice( { type: 'error', message: __( 'Save failed.', 'nexus-blocks' ) } );
		}
		setSaving( false );
	};

	return (
		<div className="nx-global-panel">
			{ notice && (
				<Notice status={ notice.type } onRemove={ () => setNotice( null ) }>
					{ notice.message }
				</Notice>
			) }

			<TabPanel className="nx-global-tabs" tabs={ TABS }>
				{ ( tab ) => {
					if ( tab.name === 'colors' ) {
						return (
							<div className="nx-global-section">
								<p className="nx-global-section-desc">
									{ __( 'Define global color tokens used across all Nexus blocks.', 'nexus-blocks' ) }
								</p>
								{ COLOR_KEYS.map( ( key ) => (
									<ColorControl
										key={ key }
										label={ COLOR_LABELS[ key ] }
										value={ settings.colors?.[ key ] ?? '' }
										onChange={ ( val ) => setIn( `colors.${ key }`, val ) }
									/>
								) ) }
							</div>
						);
					}

					if ( tab.name === 'typography' ) {
						return (
							<div className="nx-global-section">
								<TextControl
									label={ __( 'Primary Font', 'nexus-blocks' ) }
									value={ settings.typography?.fontPrimary ?? '' }
									onChange={ ( val ) => setIn( 'typography.fontPrimary', val ) }
									placeholder="'Inter', sans-serif"
								/>
								<TextControl
									label={ __( 'Secondary Font', 'nexus-blocks' ) }
									value={ settings.typography?.fontSecondary ?? '' }
									onChange={ ( val ) => setIn( 'typography.fontSecondary', val ) }
									placeholder="'Playfair Display', serif"
								/>
								<p className="nx-global-section-heading">{ __( 'Font Size Scale', 'nexus-blocks' ) }</p>
								{ [ 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl' ].map( ( key ) => (
									<TextControl
										key={ key }
										label={ key.toUpperCase() }
										value={ settings.typography?.fontSizes?.[ key ] ?? '' }
										onChange={ ( val ) => setIn( `typography.fontSizes.${ key }`, val ) }
									/>
								) ) }
							</div>
						);
					}

					if ( tab.name === 'spacing' ) {
						return (
							<div className="nx-global-section">
								<p className="nx-global-section-desc">
									{ __( 'Spacing scale (xs → 4xl) used as tokens across all blocks.', 'nexus-blocks' ) }
								</p>
								{ SPACING_KEYS.map( ( key ) => (
									<TextControl
										key={ key }
										label={ `--nx-space-${ key }` }
										value={ settings.spacing?.[ key ] ?? '' }
										onChange={ ( val ) => setIn( `spacing.${ key }`, val ) }
									/>
								) ) }
							</div>
						);
					}

					if ( tab.name === 'custom-css' ) {
						return (
							<div className="nx-global-section">
								<TextareaControl
									label={ __( 'Global Custom CSS', 'nexus-blocks' ) }
									help={ __( 'Output in <head> sitewide. No <style> tags needed.', 'nexus-blocks' ) }
									value={ settings.customCSS ?? '' }
									onChange={ ( val ) => setIn( 'customCSS', val ) }
									rows={ 10 }
								/>
							</div>
						);
					}
				} }
			</TabPanel>

			<div className="nx-global-footer">
				<Button
					variant="primary"
					onClick={ save }
					disabled={ saving }
				>
					{ saving ? <Spinner /> : __( 'Save Settings', 'nexus-blocks' ) }
				</Button>
			</div>
		</div>
	);
}
