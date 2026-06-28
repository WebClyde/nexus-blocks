<?php
/**
 * Nexus REST — registers custom REST API endpoints.
 *
 * @package NexusBlocks
 */

defined( 'ABSPATH' ) || exit;

class Nexus_Rest {

	private static ?self $instance = null;

	public static function instance(): self {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes(): void {
		// Dynamic posts query endpoint (Phase 3)
		register_rest_route( 'nexus-blocks/v1', '/query', [
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => [ $this, 'handle_query' ],
			'permission_callback' => '__return_true',
			'args'                => [
				'post_type' => [
					'type'    => 'string',
					'default' => 'post',
				],
				'posts_per_page' => [
					'type'    => 'integer',
					'default' => 10,
				],
				'taxonomy' => [
					'type' => 'string',
				],
				'term_id' => [
					'type' => 'integer',
				],
				'order' => [
					'type'    => 'string',
					'default' => 'DESC',
					'enum'    => [ 'ASC', 'DESC' ],
				],
				'orderby' => [
					'type'    => 'string',
					'default' => 'date',
				],
			],
		] );

		// Dynamic tag resolution endpoint (Phase 3)
		register_rest_route( 'nexus-blocks/v1', '/dynamic-tag', [
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => [ $this, 'handle_dynamic_tag' ],
			'permission_callback' => '__return_true',
			'args'                => [
				'tag'     => [ 'type' => 'string', 'required' => true ],
				'post_id' => [ 'type' => 'integer' ],
			],
		] );
	}

	public function handle_query( WP_REST_Request $request ): WP_REST_Response {
		$args = [
			'post_type'      => sanitize_key( $request->get_param( 'post_type' ) ),
			'posts_per_page' => (int) $request->get_param( 'posts_per_page' ),
			'order'          => $request->get_param( 'order' ),
			'orderby'        => sanitize_key( $request->get_param( 'orderby' ) ),
			'post_status'    => 'publish',
		];

		if ( $request->get_param( 'taxonomy' ) && $request->get_param( 'term_id' ) ) {
			$args['tax_query'] = [ [
				'taxonomy' => sanitize_key( $request->get_param( 'taxonomy' ) ),
				'field'    => 'term_id',
				'terms'    => (int) $request->get_param( 'term_id' ),
			] ];
		}

		$query = new WP_Query( $args );
		$posts = [];

		foreach ( $query->posts as $post ) {
			$posts[] = [
				'id'        => $post->ID,
				'title'     => get_the_title( $post ),
				'excerpt'   => get_the_excerpt( $post ),
				'permalink' => get_permalink( $post ),
				'date'      => get_the_date( '', $post ),
				'thumbnail' => get_the_post_thumbnail_url( $post, 'medium' ),
				'author'    => get_the_author_meta( 'display_name', $post->post_author ),
			];
		}

		return new WP_REST_Response( [
			'posts'       => $posts,
			'total'       => (int) $query->found_posts,
			'total_pages' => (int) $query->max_num_pages,
		], 200 );
	}

	public function handle_dynamic_tag( WP_REST_Request $request ): WP_REST_Response {
		$tag     = sanitize_text_field( $request->get_param( 'tag' ) );
		$post_id = (int) $request->get_param( 'post_id' );

		if ( ! $post_id ) {
			$post_id = get_the_ID();
		}

		$value = match ( $tag ) {
			'post_title'   => get_the_title( $post_id ),
			'post_excerpt' => get_the_excerpt( $post_id ),
			'post_date'    => get_the_date( '', $post_id ),
			'post_url'     => get_permalink( $post_id ),
			'author_name'  => get_the_author_meta( 'display_name', get_post_field( 'post_author', $post_id ) ),
			'site_name'    => get_bloginfo( 'name' ),
			'site_url'     => get_site_url(),
			default        => get_post_meta( $post_id, $tag, true ),
		};

		return new WP_REST_Response( [ 'value' => (string) $value ], 200 );
	}
}

// Initialize REST endpoints
add_action( 'plugins_loaded', function () {
	Nexus_Rest::instance();
} );
