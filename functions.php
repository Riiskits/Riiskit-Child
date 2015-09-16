<?php
/**
 * @package WordPress
 * @subpackage Riiskit
 *
 * @since Riiskit Child 1.0.0
 */

/**
 * Set the content's pixel-width based on the theme's design.
 *
 * @since Riiskit Child 1.0.0
 */
if ( ! isset( $content_width ) ) {
	$content_width = apply_filters( 'riiskit_child_content_width' , 1170 );
}


/**
 * Riiskit Child setup.
 *
 * @since Riiskit Child 1.0.0
 */
function riiskit_child_setup() {
	//add_editor_style( array( 'inc/admin/css/editor-style.css' ) );

	//add_image_size( '', 250, 100, false );
}

add_action( 'after_setup_theme', 'riiskit_child_setup', 20 );


/**
 * Enqueue development stylesheets for the front end.
 *
 * @since Riiskit Child 1.0.0
 */
function riiskit_child_dev_stylesheets() {
    wp_enqueue_style( 'riiskit-child-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'riiskit-child-elements', get_stylesheet_directory_uri() . '/dist/css/base/elements.css', array(), '1.0.0', null );
    wp_enqueue_style( 'riiskit-child-main', get_stylesheet_directory_uri() . '/dist/css/base/main.css', array(), '1.0.0', null );
    wp_enqueue_style( 'riiskit-child-mobile-menu', get_stylesheet_directory_uri() . '/dist/css/components/mobile-menu.css', array(), '1.0.0', null );
}

/**
 * Enqueue development scripts for the front end.
 *
 * @since Riiskit Child 1.0.0
 */
function riiskit_child_dev_scripts() {
    wp_enqueue_script( 'riiskit-child-main', get_stylesheet_directory_uri() . '/src/js/main.js', array( 'jquery' ), '1.0.0', true );
    wp_enqueue_script( 'riiskit-child-mobile-menu', get_stylesheet_directory_uri() . '/src/js/components/mobile-menu.js', array('jquery'), '1.0.0', true );
}
/**
 * Enqueue production stylesheets for the front end.
 *
 * @since Riiskit Child 1.0.0
 */
function riiskit_child_dist_stylesheets() {
    // Parent styles
    wp_enqueue_style( 'riiskit-style', get_template_directory_uri() . '/style.css' );
    // Child styles
    wp_enqueue_style( 'riiskit-child-main', get_stylesheet_directory_uri() . '/dist/css/min/main.min.css', array(), '1.0.0', null );
}
/**
 * Enqueue production scripts for the front end.
 *
 * @since Riiskit Child 1.0.0
 */
function riiskit_child_dist_scripts() {
    wp_enqueue_script( 'riiskit-child-main', get_stylesheet_directory_uri() . '/dist/js/min/main.min.js', array( 'jquery' ), '1.0.0', true );
}

/* Uncomment for production */
//add_action( 'wp_enqueue_scripts', 'riiskit_child_dist_stylesheets', 20 );
//add_action( 'wp_enqueue_scripts', 'riiskit_child_dist_scripts', 20 );
/* Comment out for production */
add_action( 'wp_enqueue_scripts', 'riiskit_child_dev_stylesheets', 20 );
add_action( 'wp_enqueue_scripts', 'riiskit_child_dev_scripts', 20 );


/**
 * Inline JS.
 *
 * @since Riiskit 1.0.0
 */
function riiskit_child_scripts_head() { ?>
	<!-- Battle the FOUC (remove if using Modernizr) -->
	<script>(function(H){H.className=H.className.replace(/\bno-js\b/,'js');})(document.documentElement);</script>
<?php }
add_action( 'wp_head', 'riiskit_child_scripts_head' );


/*
 * Theme constants.
 *
 * @since Riiskit Child 1.0.0
 */
if ( ! defined( 'RIISKIT_CHILD_BASE' ) ) {
    define( 'RIISKIT_CHILD_BASE' , get_stylesheet_directory() . '/' );
}
if ( ! defined( 'RIISKIT_CHILD_BASE_URL' ) ) {
    define( 'RIISKIT_CHILD_BASE_URL' , get_stylesheet_directory_uri() . '/' );
}


/**
 * Plugin filters.
 *
 * @since Riiskit Child 1.0.0
 */
//require_once( RIISKIT_CHILD_BASE . 'inc/plugin-filters.php' );

/**
 * Custom post types.
 *
 * @since Riiskit Child 1.0.0
 */
//require_once( RIISKIT_CHILD_BASE . 'inc/admin/custom-post-types.php' );

/**
 * Custom logos etc.
 *
 * @since Riiskit Child 1.0.0
 */
//require_once( RIISKIT_CHILD_BASE . 'inc/admin/customization.php' );

/**
 * Metaboxes.
 *
 * @since Riiskit Child 1.0.0
 */
//require_once( RIISKIT_CHILD_BASE . 'inc/admin/metaboxes.php' );

?>