<?php

function univerRegisterSearch() {
	register_rest_route( 'univer/v1', 'search', [
		'methods'  => WP_REST_Server::READABLE,
		'callback' => 'univerSearchResults'
	] );
}

add_action( 'rest_api_init', 'univerRegisterSearch' );

/** @noinspection PhpArrayPushWithOneElementInspection */
function univerSearchResults( $data ) {
	$mainQuery = new WP_Query( [
		'post_type' => [ 'post', 'page', 'professor', 'program', 'event' ],
		's'         => sanitize_text_field( $data['keyword'] ) //protecting function
	] );

	$results = [
		'generalInfo' => [],
		'professors'  => [],
		'programs'    => [],
		'events'      => [],
	];

	while ( $mainQuery->have_posts() ) {
		$mainQuery->the_post();

		if ( get_post_type() === 'post' || get_post_type() === 'page' ) {
			array_push( $results['generalInfo'], [
				'title' => get_the_title(),
				'link'  => get_the_permalink(),
				'postType' => get_post_type(),
				'authorName' => get_the_author()
			] );
		}
		if ( get_post_type() === 'professor' ) {
			array_push( $results['professors'], [
				'title' => get_the_title(),
				'link'  => get_the_permalink(),
				'thumbnail' => get_the_post_thumbnail_url(0, 'professorsPortrait')
			] );
		}
		if ( get_post_type() === 'program' ) {
			array_push( $results['programs'], [
				'title' => get_the_title(),
				'link'  => get_the_permalink()
			] );
		}
		if ( get_post_type() === 'event' ) {
			$eventDate = new DateTime(CFS()->get('event_date'));

			array_push( $results['events'], [
				'title' => get_the_title(),
				'link'  => get_the_permalink(),
				'month' => $eventDate->format('M'),
				'day' => $eventDate->format('d'),
				'content' => show_excerpt_or_content(5)
			] );
		}
	}

	$programRelationQuery = new WP_Query([
		'post_type' => 'professor',
		'meta_query' => [
			[
				'key' => 'related_program',
				'compare' => 'LIKE',
				'value' => $data['keyword']
			]
		]
	]);

	while ($programRelationQuery->have_posts()) {
		$programRelationQuery->the_post();

		if(get_post_type() === 'professor') {
			array_push( $results['professors'], [
				'title' => get_the_title(),
				'link'  => get_the_permalink(),
				'thumbnail' => get_the_post_thumbnail_url(0, 'professorsPortrait')
			] );
		}
	}
	$results['professors'] = array_values(array_unique($results['professors'], SORT_REGULAR));

	return $results;
}