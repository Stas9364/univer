<?php
get_header();

while (have_posts()) {
    the_post();
    pageBanner([
        'title' => get_the_title(),
        'subtitle' => 'Learn how the school of your dreams got started.'
    ]);
    ?>

    <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
                <a class="metabox__blog-home-link"
                   href="<?php echo site_url('/programs'); ?>">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    All Programs
                </a>
            </p>
        </div>
        <div class="generic-content">
            <?php the_content(); ?>
        </div>

        <?php
        $professors = new WP_Query([
            'post_type' => 'professor',
            'posts_per_page' => -1,
            'orderby' => 'title',
            'order' => 'ASC',
            'meta_query' => [
                [
                    'key' => 'related_program',
                    'compare' => 'LIKE',
                    'value' => get_the_ID()
                ]
            ]
        ]);

        if ($professors->have_posts()) {
        ?>

        <hr class="section-break">
        <h2 class="headline headline--medium">
            <?php the_title(); ?> Professors
        </h2>
        <ul class="professor-cards">

            <?php while ($professors->have_posts()) {
                $professors->the_post();
                ?>
                <li class="professor-card__list-item">
                    <a class="professor-card" href="<?php the_permalink(); ?>">
                        <img class="professor-card__image" src="<?php the_post_thumbnail_url('professorsPortrait'); ?>"
                             alt="<?php the_title(); ?>">
                        <span class="professor-card__name">
                            <?php the_title(); ?>
                        </span>
                    </a>
                </li>

            <?php }

            echo '</ul>';

            wp_reset_postdata();
            }

            $today = date('Ymd');
            $professors = new WP_Query([
                'post_type' => 'event',
                'posts_per_page' => 2,
                'orderby' => 'meta_value',
                'order' => 'ASC',
                'meta_key' => 'event_date',
                'meta_query' => [
                    [
                        'key' => 'event_date',
                        'compare' => '>=',
                        'value' => $today,
                        'type' => 'DATE'
                    ],
                    [
                        'key' => 'related_program',
                        'compare' => 'LIKE',
                        'value' => get_the_ID()
                    ]
                ]
            ]);
            if ($professors->have_posts()) {

                ?>

                <hr class="section-break">
                <h2 class="headline headline--medium">
                    Upcoming <?php the_title(); ?> Events
                </h2>

                <?php while ($professors->have_posts()) {
                    $professors->the_post();
                    get_template_part('template-parts/content', 'events');
                }
                wp_reset_postdata();
            }
            ?>
    </div>

<?php }
get_footer();
?>