<?php
/**
 * Plugin Name:       Nexus Blocks
 * Plugin URI:        https://nexusblocks.io
 * Description:       Advanced Gutenberg blocks with Elementor Pro-level controls. Zero bloat, scoped CSS, full design token system.
 * Version:           1.0.15
 * Requires at least: 6.4
 * Requires PHP:      8.1
 * Author:            WebClyde
 * Author URI:        https://webclyde.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       nexus-blocks
 * Domain Path:       /languages
 *
 * @package NexusBlocks
 */

defined( 'ABSPATH' ) || exit;

define( 'NEXUS_BLOCKS_VERSION', '1.0.15' );
define( 'NEXUS_BLOCKS_DIR', plugin_dir_path( __FILE__ ) );
define( 'NEXUS_BLOCKS_URL', plugin_dir_url( __FILE__ ) );
define( 'NEXUS_BLOCKS_FILE', __FILE__ );

require_once NEXUS_BLOCKS_DIR . 'inc/class-nexus-loader.php';
require_once NEXUS_BLOCKS_DIR . 'inc/class-nexus-global.php';
require_once NEXUS_BLOCKS_DIR . 'inc/class-nexus-assets.php';
require_once NEXUS_BLOCKS_DIR . 'inc/class-nexus-rest.php';

/**
 * Initialize the plugin.
 */
function nexus_blocks_init(): void {
	Nexus_Loader::instance();
	Nexus_Global::instance();
	Nexus_Assets::instance();
}
add_action( 'plugins_loaded', 'nexus_blocks_init' );

/**
 * Activation hook.
 */
register_activation_hook( __FILE__, function () {
	$defaults = Nexus_Global::get_defaults();
	if ( ! get_option( 'nexus_global_settings' ) ) {
		update_option( 'nexus_global_settings', $defaults );
	}
} );
