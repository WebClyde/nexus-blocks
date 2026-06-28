/**
 * Global Panel — Nexus Blocks design token editor.
 * Registers a PluginSidebar accessible from the editor toolbar.
 */

import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';
import GlobalPanel from './GlobalPanel';

const NexusGlobalPanel = () => (
	<>
		<PluginSidebarMoreMenuItem target="nexus-global-panel" icon="admin-appearance">
			{ __( 'Nexus Global Settings', 'nexus-blocks' ) }
		</PluginSidebarMoreMenuItem>
		<PluginSidebar
			name="nexus-global-panel"
			title={ __( 'Nexus Global Settings', 'nexus-blocks' ) }
			icon="admin-appearance"
		>
			<GlobalPanel />
		</PluginSidebar>
	</>
);

registerPlugin( 'nexus-global-panel', { render: NexusGlobalPanel } );
