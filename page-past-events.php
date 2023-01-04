<?php
get_header();
pageBanner([
    'title' => 'Past Events',
    'subtitle' => 'A recap of our events.'
]);
?>

    <div class="container container--narrow page-section">
        <?php
        $today = date('Ymd');
        $pastEvents = new WP_Query([
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
                    'type' => 'DATE'
                ]
            ]
        ]);
        while ($pastEvents->have_posts()) {
	        $pastEvents->the_post();
            get_template_part('template-parts/content-events');
             }
        wp_reset_postdata();
        echo paginate_links([
            'total' => $pastEvents->max_num_pages
        ]);
        ?>
    </div>

<?php get_footer(); ?>