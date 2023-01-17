<?php
get_header();
?>

    <div class="page-banner">
        <div class="page-banner__bg-image"
             style="background-image: url(<?php echo get_theme_file_uri( 'images/library-hero.jpg' ) ?>)"></div>
        <div class="page-banner__content container t-center c-white">
            <h1 class="headline headline--large">Welcome!</h1>
            <h2 class="headline headline--medium">We think you&rsquo;ll like it here.</h2>
            <h3 class="headline headline--small">Why don&rsquo;t you check out the <strong>major</strong> you&rsquo;re
                interested in?</h3>
            <a href="<?php echo get_post_type_archive_link( 'program' ) ?>" class="btn btn--large btn--blue">Find Your
                Major</a>
        </div>
    </div>

    <div class="full-width-split group">

        <!--    Events block   -->
        <div class="full-width-split__one">
            <div class="full-width-split__inner">
                <h2 class="headline headline--small-plus t-center">Upcoming Events</h2>

				<?php
				$today          = date( 'Ymd' );
				$homepageEvents = new WP_Query( [
					'post_type'      => 'event',
					'posts_per_page' => 2,
					'orderby'        => 'meta_value',
					'order'          => 'ASC',
					'meta_key'       => 'event_date',
					'meta_query'     => [
						[
							'key'     => 'event_date',
							'compare' => '>=',
							'value'   => $today,
							'type'    => 'DATE'
						]
					]
				] );

				while ( $homepageEvents->have_posts() ) {
					$homepageEvents->the_post();
					get_template_part( 'template-parts/content-events' );
				}
				wp_reset_postdata();
				?>

                <p class="t-center no-margin">
                    <a href="<?php echo site_url( '/events' ) ?>" class="btn btn--blue">View All Events</a>
                </p>
            </div>
        </div>

        <!--    Blogs block  -->
        <div class="full-width-split__two">
            <div class="full-width-split__inner">
                <h2 class="headline headline--small-plus t-center">From Our Blogs</h2>

				<?php
				$homepagePosts = new WP_Query( [
					'posts_per_page' => 2,
				] );

				while ( $homepagePosts->have_posts() ) {
					$homepagePosts->the_post();
					?>

                    <div class="event-summary">
                        <a class="event-summary__date event-summary__date--beige t-center"
                           href="<?php the_permalink(); ?>">
                        <span class="event-summary__month">
                            <?php the_time( 'M' ); ?>
                        </span>
                            <span class="event-summary__day">
                            <?php the_time( 'd' ); ?>
                        </span>
                        </a>
                        <div class="event-summary__content">
                            <h5 class="event-summary__title headline headline--tiny">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h5>
                            <p>
								<?php echo show_excerpt_or_content(); ?>
                                <a href="<?php the_permalink(); ?>" class="nu gray">Read more</a>
                            </p>
                        </div>
                    </div>

				<?php }
				wp_reset_postdata();
				?>

                <p class="t-center no-margin">
                    <a href="<?php echo site_url( '/blog' ); ?>" class="btn btn--yellow">View All Blog Posts</a>
                </p>
            </div>
        </div>
    </div>

    <div class="sim-slider hero-slider" id="first">
        <ul class="sim-slider-list slider-list">
            <li class="sim-slider-start">
                <img src="<?php echo get_template_directory_uri() . '/images/Solid_white.svg.png' ?>"
                     alt="screen">
            </li>

			<?php
			$slider_loop = CFS()->get( 'slider' );
			foreach ( $slider_loop as $img ) {
                ?>

            <div>
                <li class="sim-slider-element">
                    <div class="hero-slider__slide"
                         style="background-image: url(<?php echo $img['img'] ?>)">
                        <div class="hero-slider__interior container">
                            <div class="hero-slider__overlay">
                                <h2 class="headline headline--medium t-center"><?php echo $img['title'] ?></h2>
                                <p class="t-center"><?php echo $img['description'] ?></p>
                                <p class="t-center no-margin"><a href="#" class="btn btn--blue">Learn more</a></p>
                            </div>
                        </div>
                    </div>
                </li>

				<?php } ?>

        </ul>
        <div class="sim-slider-arrow-left"></div>
        <div class="sim-slider-arrow-right"></div>
        <div class="sim-slider-dots"></div>
    </div>


<?php
get_footer();
?>