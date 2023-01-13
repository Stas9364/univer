<?php

add_action( 'rest_api_init', 'univerRegisterLike' );

function univerRegisterLike() {
	register_rest_route( 'univer/v1', 'like', [
		'methods'  => WP_REST_Server::CREATABLE,
		'callback' => 'createLikeRoute'
	] );

	register_rest_route( 'univer/v1', 'like', [
		'methods'  => WP_REST_Server::DELETABLE,
		'callback' => 'deleteLikeRoute'
	] );
}

function createLikeRoute( $data ) {
	if ( is_user_logged_in() ) {
		$professor = sanitize_text_field( $data['professorId']);

		$existQuery = new WP_Query( [
			'author'     => get_current_user_id(),
			'post_type'  => 'like',
			'meta_query' => [
				[
					'key'     => 'liked_professor_id',
					'compare' => '=',
					'value'   => $professor
				]
			]
		] );

		if ($existQuery->found_posts === 0 && get_post_type($professor) === 'professor') {
			return wp_insert_post( [
				'post_type'   => 'like',
				'post_title'  => 'Like',
				'post_status' => 'publish',
				'meta_input'  => [
					'liked_professor_id' => $professor
				]
			] );
		} else {
			die( 'Invalid professor ID' );
		}

	} else {
		die( 'Only logged in users' );
	}
}

function deleteLikeRoute( $data ) {
//	return wp_delete_post( $data['professorId'] );
}

