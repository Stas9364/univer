<?php
get_header();
?>

    <div class="page-banner">
        <div class="page-banner__bg-image"
             style="background-image: url(<?php echo get_theme_file_uri('/assets/images/ocean.jpg'); ?>)"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title">
                Past Events
            </h1>
            <div class="page-banner__intro">
                <p>
                    A recap of our events.
                </p>
            </div>
        </div>
    </div>
    <div class="container container--narrow page-section">
        <?php
        $today = date('Ymd');
        $homepageEvents = new WP_Query([
            'post_type' => 'event',
            'orderby' => 'meta_value',
            'order' => 'ASC',
            'paged' => get_query_var('paged', 1),
            'meta_key' => 'event_date',
            'meta_query' => [
                [
                    'key' => 'event_date',
                    'compare' => '<',
                    'value' => $today,
                    'type' => 'string'
                ]
            ]
        ]);
        while ($homepageEvents->have_posts()) {
            $homepageEvents->the_post();
            ?>

            <div class="event-summary">
                <a class="event-summary__date t-center" href="<?php the_permalink(); ?>">
                        <span class="event-summary__month">
                            <?php
                            $eventDate = new DateTime(CFS()->get('event_date'));
                            echo $eventDate->format('M');
                            ?>
                        </span>
                    <span class="event-summary__day">
                            <?php echo $eventDate->format('d'); ?>
                        </span>
                </a>
                <div class="event-summary__content">
                    <h5 class="event-summary__title headline headline--tiny">
                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                    </h5>
                    <p>
                        <?php echo wp_trim_words(get_the_content(), 14); ?>
                        <a href="<?php the_permalink(); ?>" class="nu gray">Learn more</a>
                    </p>
                </div>
            </div>

        <?php }
        wp_reset_postdata();
        echo paginate_links([
            'total' => $homepageEvents->max_num_pages
        ]);
        ?>
    </div>

<?php get_footer(); ?>