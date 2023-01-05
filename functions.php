<?php

function show_excerpt_or_content(): string {
	if ( has_excerpt() ) {
		return get_the_excerpt();
	} else {
		return wp_trim_words( get_the_content(), 14 );
	}
}


function pageBanner( $args = null ) {
	$pageBannerIMG    = CFS()->get( 'page_background_image' );
	$defaultBannerIMG = get_theme_file_uri( '/images/ocean.jpg' );
	?>

    <div class="page-banner">
        <div class="page-banner__bg-image"
             style="background-image: url(<?php echo $pageBannerIMG ? $pageBannerIMG : $defaultBannerIMG ?>)">
        </div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title">
				<?php echo $args['title'] ? $args['title'] : get_the_title(); ?>
            </h1>
            <div class="page-banner__intro">
                <p>
					<?php echo $args['subtitle'] ? $args['subtitle'] : CFS()->get( 'page_subtitle' ) ?>
                </p>
            </div>
        </div>
    </div>

	<?php
}

function univer_scripts() {
	wp_enqueue_style( 'main_style', get_theme_file_uri( '/build/index.css' ) );
	wp_enqueue_style( 'main_style-index', get_theme_file_uri( '/build/style-index.css' ) );

//    wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');
	wp_enqueue_style( 'bootstrap-fa', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' );
	wp_enqueue_style( 'google-fonts', 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i' );

	wp_enqueue_script( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js' );
	wp_enqueue_script( 'js-script', get_template_directory_uri() . '/build/index.js', array( 'jquery' ), '', true );

	wp_localize_script( 'js-script', 'univerData', [ 'root_url' => get_site_url() ] );
}

add_action( 'wp_enqueue_scripts', 'univer_scripts' );

function univer_theme_features() {
	register_nav_menus( [
		'Header'         => 'Header_menu',
		'Footer_Explore' => 'Footer_Explore_menu',
		'Footer_Learn'   => 'Footer_Learn_menu'
	] );

	add_theme_support( 'title-tag' ); //auto added title tag in head
	add_theme_support( 'post-thumbnails' ); //allows to add thumbnail to custom posts

	add_image_size( 'professorsPortrait', 480, 650, true );
	add_image_size( 'pageBannerBackground', 1500, 350, true );
}

add_action( 'after_setup_theme', 'univer_theme_features' );

function univer_adjust_queries( $query ) {
	if ( ! is_admin() && $query->is_main_query() && $query->is_post_type_archive( 'program' ) ) {
		$query->set( 'order', 'ASC' );
		$query->set( 'orderby', 'title' );
		$query->set( 'posts_per_page', - 1 );
	}

	if ( ! is_admin() && $query->is_main_query() && $query->is_post_type_archive( 'event' ) ) {
		$today = date( 'Ymd' );
		$query->set( 'order', 'ASC' );
		$query->set( 'orderby', 'meta_value' );
		$query->set( 'meta_key', 'event_date' );
		$query->set( 'meta_query', [
			[
				'key'     => 'event_date',
				'compare' => '>=',
				'value'   => $today,
				'type'    => 'DATE'
			]
		] );
	}
}

add_action( 'pre_get_posts', 'univer_adjust_queries' );

function univer_custom_rest() {
	register_rest_field( 'post', 'authorName', [
		'get_callback' => function () {
			return get_the_author();
		}
	] );
}

add_action( 'rest_api_init', 'univer_custom_rest' );