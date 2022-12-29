<?php
get_header();

function show_excerpt_or_content(): string
{
    if (has_excerpt()) {
        return get_the_excerpt();
    } else {
        return wp_trim_words(get_the_content(), 14);
    }
}

while (have_posts()) {
    the_post();
    ?>

    <div class="page-banner">
        <div class="page-banner__bg-image"
             style="background-image: url(<?php echo get_theme_file_uri('/assets/images/ocean.jpg'); ?>)"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php the_title(); ?></h1>
            <div class="page-banner__intro">
                <p>Learn how the school of your dreams got started.</p>
            </div>
        </div>
    </div>

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
        <h2 class="headline headline--medium"><?php the_title(); ?> Professors</h2>
        <ul class="professor-cards">

            <?php while ($professors->have_posts()) {
                $professors->the_post();
                ?>
                <li class="professor-card__list-item">
                    <a class="professor-card" href="<?php the_permalink(); ?>">
                        <img class="professor-card__image" src="<?php the_post_thumbnail_url('professorsPortrait'); ?>"
                             alt="<?php the_title(); ?>">
                        <span class="professor-card__name"><?php the_title(); ?></span>
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
                    'type' => 'string'
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
            <h2 class="headline headline--medium">Upcoming <?php the_title(); ?> Events</h2>

            <?php while ($professors->have_posts()) {
                $professors->the_post();
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
                            <?php echo show_excerpt_or_content(); ?>
                            <a href="<?php the_permalink(); ?>" class="nu gray">Learn more</a></p>
                    </div>
                </div>

            <?php }
            wp_reset_postdata();
        }
        ?>

    </div>

<?php }
get_footer();
?>