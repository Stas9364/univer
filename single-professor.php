<?php
get_header();

while ( have_posts() ) {
	the_post();
	pageBanner( [
		'title'    => '',
		'subtitle' => ''
	] );
	?>

    <div class="container container--narrow page-section">
        <div class="generic-content">
            <div class="row group">
                <div class="one-third">
					<?php the_post_thumbnail( 'professorsPortrait' ); ?>
                </div>
                <div class="two-third">
					<?php
					$likesCount = new WP_Query( [
						'post_type'  => 'like',
						'meta_query' => [
							[
								'key'     => 'liked_professor_id',
								'compare' => '=',
								'value'   => get_the_ID()
							]
						]
					] );

					$isLiked = 'no';

					if ( is_user_logged_in() ) { //shows unregistered users only likes count
						$existQuery = new WP_Query( [
							'author'     => get_current_user_id(),
							'post_type'  => 'like',
							'meta_query' => [
								[
									'key'     => 'liked_professor_id',
									'compare' => '=',
									'value'   => get_the_ID()
								]
							]
						] );

						if ( $existQuery->found_posts ) {
							$isLiked = 'yes';
						}
					}
					?>
                    <span class="like-box" data-exists="<?php echo $isLiked; ?>" data-id="<?php the_ID(); ?>">
                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                        <i class="fa fa-heart" aria-hidden="true"></i>
                        <span class="like-count">
                            <?php echo $likesCount->found_posts; ?>
                        </span>
                    </span>
					<?php the_content(); ?>
                </div>
            </div>
        </div>

		<?php $programs = CFS()->get( 'related_program' );
		if ( $programs ) { ?>

            <hr class="section-break">
            <h2 class="headline headline--medium">Subject(s) Taught</h2>
            <ul class="link-list min-list">

				<?php foreach ( $programs as $program ) { ?>
                    <li>
                        <a href="<?php echo get_the_permalink( $program ); ?>">
							<?php echo get_the_title( $program ); ?>
                        </a>
                    </li>
				<?php } ?>

            </ul>
		<?php } ?>

    </div>

<?php }
get_footer();
?>