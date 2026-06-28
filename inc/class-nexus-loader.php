<?php
/**
 * Nexus Blocks Loader — registers all blocks.
 *
 * @package NexusBlocks
 */

defined( 'ABSPATH' ) || exit;

class Nexus_Loader {

	private static ?self $instance = null;

	/** All registered block slugs */
	private array $blocks = [
		'advanced-heading',
		'advanced-text',
		'advanced-image',
		'advanced-button',
		'icon',
		'divider',
		'spacer',
		'icon-box',
		'image-box',
		'icon-list',
		'counter',
		'progress-bar',
		'star-rating',
		'tabs',
		'tab-item',
		'accordion',
		'alert',
		'section-box',
		'row-layout',
	];

	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'init', [ $this, 'register_blocks' ] );
		add_action( 'init', [ $this, 'register_editor_assets' ] );
	}

	public function register_blocks(): void {
		foreach ( $this->blocks as $block_slug ) {
			$block_dir = NEXUS_BLOCKS_DIR . 'build/blocks/' . $block_slug;
			if ( file_exists( $block_dir . '/block.json' ) ) {
				register_block_type( $block_dir );
			}
		}
	}

	/**
	 * Register and enqueue the main editor bundle, then attach localized data.
	 */
	public function register_editor_assets(): void {
		$asset_file = NEXUS_BLOCKS_DIR . 'build/index.asset.php';
		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		wp_register_script(
			'nexus-blocks-editor',
			NEXUS_BLOCKS_URL . 'build/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		// Editor-only styles
		if ( file_exists( NEXUS_BLOCKS_DIR . 'build/index.css' ) ) {
			wp_register_style(
				'nexus-blocks-editor-style',
				NEXUS_BLOCKS_URL . 'build/index.css',
				[],
				$asset['version']
			);
		}

		// Frontend styles (also loaded in editor for preview)
		if ( file_exists( NEXUS_BLOCKS_DIR . 'build/style-index.css' ) ) {
			wp_register_style(
				'nexus-blocks-style',
				NEXUS_BLOCKS_URL . 'build/style-index.css',
				[],
				$asset['version']
			);
		}

		// Attach global data to the editor script
		wp_localize_script(
			'nexus-blocks-editor',
			'nexusBlocksData',
			[
				'globalSettings' => Nexus_Global::get_settings(),
				'restUrl'        => rest_url( 'nexus-blocks/v1/' ),
				'nonce'          => wp_create_nonce( 'wp_rest' ),
				'pluginUrl'      => NEXUS_BLOCKS_URL,
				'version'        => NEXUS_BLOCKS_VERSION,
			]
		);

		// Enqueue in editor context
		add_action( 'enqueue_block_editor_assets', function () {
			wp_enqueue_script( 'nexus-blocks-editor' );
			if ( wp_style_is( 'nexus-blocks-editor-style', 'registered' ) ) {
				wp_enqueue_style( 'nexus-blocks-editor-style' );
			}
			if ( wp_style_is( 'nexus-blocks-style', 'registered' ) ) {
				wp_enqueue_style( 'nexus-blocks-style' );
			}
			// FontAwesome Free in Editor
			wp_enqueue_style(
				'font-awesome-free',
				'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
				[],
				'6.5.1'
			);
		} );
	}
}
