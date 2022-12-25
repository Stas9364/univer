<?php

function univer_scripts(){
    wp_enqueue_style('main_style', get_stylesheet_uri());

//    wp_enqueue_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css');
    wp_enqueue_style('bootstrap-fa', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');

    wp_enqueue_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js');
    wp_enqueue_script('js-scripts', get_template_directory_uri() . '/assets/js/slider.js', array(), '', true);
    wp_enqueue_script('mobile-menu', get_theme_file_uri('/assets/js/MobileMenu.js'), array(), '', true);
}

add_action('wp_enqueue_scripts', 'univer_scripts');

function render_title_tag() {
    register_nav_menu('Header', 'Header_menu');
    register_nav_menu('Footer_Explore', 'Footer_Explore_menu');
    register_nav_menu('Footer_Learn', 'Footer_Learn_menu');
    add_theme_support('title-tag');
}

add_action('after_setup_theme', 'render_title_tag');