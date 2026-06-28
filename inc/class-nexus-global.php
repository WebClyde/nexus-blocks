<?php
/**
 * Nexus Global Settings — manages design tokens stored in wp_options.
 *
 * @package NexusBlocks
 */

defined( 'ABSPATH' ) || exit;

class Nexus_Global {

	private static ?self $instance = null;

	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'wp_head', [ $this, 'output_css_variables' ], 5 );
		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
	}

	/**
	 * Output CSS custom properties on :root from stored settings.
	 */
	public function output_css_variables(): void {
		$settings = self::get_settings();
		$colors   = $settings['colors'] ?? [];
		$typo     = $settings['typography'] ?? [];
		$spacing  = $settings['spacing'] ?? [];
		$borders  = $settings['borders'] ?? [];
		$shadows  = $settings['shadows'] ?? [];

		echo "<style id=\"nexus-global-tokens\">\n:root {\n";

		// Colors
		foreach ( $colors as $key => $value ) {
			printf( "  --nx-color-%s: %s;\n", esc_attr( $key ), esc_attr( $value ) );
		}

		// Typography
		if ( ! empty( $typo['fontPrimary'] ) ) {
			printf( "  --nx-font-primary: %s;\n", esc_attr( $typo['fontPrimary'] ) );
		}
		if ( ! empty( $typo['fontSecondary'] ) ) {
			printf( "  --nx-font-secondary: %s;\n", esc_attr( $typo['fontSecondary'] ) );
		}
		$font_sizes = $typo['fontSizes'] ?? [];
		foreach ( $font_sizes as $key => $value ) {
			printf( "  --nx-font-size-%s: %s;\n", esc_attr( $key ), esc_attr( $value ) );
		}
		if ( ! empty( $typo['lineHeightBase'] ) ) {
			printf( "  --nx-line-height-base: %s;\n", esc_attr( $typo['lineHeightBase'] ) );
		}

		// Spacing
		foreach ( $spacing as $key => $value ) {
			printf( "  --nx-space-%s: %s;\n", esc_attr( $key ), esc_attr( $value ) );
		}

		// Borders
		foreach ( $borders as $key => $value ) {
			printf( "  --nx-border-%s: %s;\n", esc_attr( $key ), esc_attr( $value ) );
		}

		// Shadows
		foreach ( $shadows as $key => $value ) {
			printf( "  --nx-shadow-%s: %s;\n", esc_attr( $key ), esc_attr( $value ) );
		}

		// Transitions
		$transitions = $settings['transitions'] ?? [];
		foreach ( $transitions as $key => $value ) {
			printf( "  --nx-transition-%s: %s;\n", esc_attr( $key ), esc_attr( $value ) );
		}

		// Custom CSS
		if ( ! empty( $settings['customCSS'] ) ) {
			echo "}\n" . wp_strip_all_tags( $settings['customCSS'] ) . "\n";
		} else {
			echo "}\n";
		}

		echo "</style>\n";
	}

	public function register_rest_routes(): void {
		register_rest_route( 'nexus-blocks/v1', '/global-settings', [
			[
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'rest_get_settings' ],
				'permission_callback' => '__return_true',
			],
			[
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => [ $this, 'rest_save_settings' ],
				'permission_callback' => fn() => current_user_can( 'manage_options' ),
			],
		] );
	}

	public function rest_get_settings(): WP_REST_Response {
		return new WP_REST_Response( self::get_settings(), 200 );
	}

	public function rest_save_settings( WP_REST_Request $request ): WP_REST_Response {
		$settings = $request->get_json_params();
		$sanitized = $this->sanitize_settings( $settings );
		update_option( 'nexus_global_settings', $sanitized );
		return new WP_REST_Response( $sanitized, 200 );
	}

	public static function get_settings(): array {
		$saved    = get_option( 'nexus_global_settings', [] );
		$defaults = self::get_defaults();
		return array_replace_recursive( $defaults, $saved );
	}

	private function sanitize_settings( array $settings ): array {
		// Recursively sanitize text values
		array_walk_recursive( $settings, function ( &$val ) {
			$val = sanitize_text_field( $val );
		} );
		return $settings;
	}

	public static function get_defaults(): array {
		return [
			'colors' => [
				'primary'   => '#7C3AED',
				'secondary' => '#06B6D4',
				'text'      => '#1F2937',
				'heading'   => '#111827',
				'accent'    => '#F59E0B',
				'bg'        => '#FFFFFF',
				'surface'   => '#F9FAFB',
				'border'    => '#E5E7EB',
			],
			'typography' => [
				'fontPrimary'   => "'Inter', sans-serif",
				'fontSecondary' => "'Playfair Display', serif",
				'lineHeightBase' => '1.6',
				'fontSizes' => [
					'xs'  => '12px',
					'sm'  => '14px',
					'md'  => '18px',
					'lg'  => '24px',
					'xl'  => '32px',
					'2xl' => '48px',
					'3xl' => '64px',
				],
			],
			'spacing' => [
				'xs'  => '4px',
				'sm'  => '8px',
				'md'  => '16px',
				'lg'  => '24px',
				'xl'  => '32px',
				'2xl' => '48px',
				'3xl' => '64px',
				'4xl' => '96px',
			],
			'borders' => [
				'radius-sm'   => '4px',
				'radius-md'   => '8px',
				'radius-lg'   => '16px',
				'radius-full' => '9999px',
				'width-sm'    => '1px',
				'width-md'    => '2px',
				'width-lg'    => '4px',
			],
			'shadows' => [
				'sm' => '0 1px 2px rgba(0,0,0,0.05)',
				'md' => '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
				'lg' => '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
				'xl' => '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
			],
			'transitions' => [
				'fast' => '150ms ease',
				'base' => '300ms ease',
				'slow' => '500ms ease',
			],
			'customCSS' => '',
		];
	}
}
