<?php

if ( ! is_user_logged_in() ) { //don't show page if unauthorized
	wp_redirect( home_url() );
	exit;
}
get_header();

while ( have_posts() ) {
	the_post();
	pageBanner( [
		'title'    => '',
		'subtitle' => ''
	] );
	?>

    <div class="container container--narrow page-section">
        <ul class="min-list link-list" id="my-notes">
			<?php
			$notes = new WP_Query( [
				'post_type'      => 'note',
				'posts_per_page' => - 1,
				'author'         => get_current_user_id()
			] );

			while ( $notes->have_posts() ) {
				$notes->the_post(); ?>

                <li data-note-id="<?php the_ID(); ?>">
                    <input class="note-title-field" value="<?php echo esc_attr( get_the_title() ); ?>" readonly>
                    <span class="edit-note">
                        <i class="fa fa-pencil" aria-hidden="true"></i>Edit
                    </span>
                    <span class="delete-note">
                        <i class="fa fa-trash-o" aria-hidden="true"></i>Delete
                    </span>
                    <textarea class="note-body-field" readonly>
                        <?php echo trim(strip_tags(get_the_content())); ?>
                    </textarea>
                    <span class="update-note btn btn--blue btn--small">
                        <i class="fa fa-arrow-right" aria-hidden="true"></i>Save
                    </span>
                </li>

			<?php } ?>
        </ul>
    </div>

	<?php
}
get_footer();