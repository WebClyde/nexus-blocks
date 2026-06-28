<?php
/**
 * Nexus Assets — handles frontend script/style enqueuing.
 *
 * @package NexusBlocks
 */

defined( 'ABSPATH' ) || exit;

class Nexus_Assets {

	private static ?self $instance = null;

	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_shared_assets' ] );
	}

	public function enqueue_shared_assets(): void {
		// FontAwesome Free (Shared between Editor and Frontend)
		wp_enqueue_style(
			'font-awesome-free',
			'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
			[],
			'6.5.1'
		);
	}

	public function enqueue_frontend(): void {
		// Only enqueue if a Nexus block is present on this page
		if ( ! $this->has_nexus_blocks() ) {
			return;
		}

		// Frontend styles
		if ( file_exists( NEXUS_BLOCKS_DIR . 'build/style-index.css' ) ) {
			wp_enqueue_style(
				'nexus-blocks-frontend',
				NEXUS_BLOCKS_URL . 'build/style-index.css',
				[],
				NEXUS_BLOCKS_VERSION
			);
		}

		// Frontend interactive JS (counters, tabs, accordions, etc.)
		$frontend_asset = NEXUS_BLOCKS_DIR . 'build/frontend.asset.php';
		$deps           = [];
		$version        = NEXUS_BLOCKS_VERSION;

		if ( file_exists( $frontend_asset ) ) {
			$asset   = require $frontend_asset;
			$deps    = $asset['dependencies'] ?? [];
			$version = $asset['version'] ?? $version;
		}

		wp_enqueue_script(
			'nexus-blocks-frontend',
			NEXUS_BLOCKS_URL . 'build/frontend.js',
			$deps,
			$version,
			true
		);

	}

	private function has_nexus_blocks(): bool {
		if ( ! is_singular() ) {
			return true; // archives, etc. — enqueue to be safe
		}
		$post = get_post();
		return $post && has_blocks( $post->post_content ) &&
			str_contains( $post->post_content, 'nexus-blocks/' );
	}
}
