<?php
get_header();

while (have_posts()) {
    the_post();
    pageBanner([
        'title' => '',
        'subtitle' => 'Learn how the school of your dreams got started.'
    ]);
    ?>

    <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
            <p>
                <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('event'); ?>">
                    <i class="fa fa-home" aria-hidden="true"></i>
                    Back to Events Home
                </a>
                <span class="metabox__main">
                    <?php the_title(); ?>
                </span>
            </p>
        </div>
        <div class="generic-content">
            <?php the_content(); ?>
        </div>

        <?php $programs = CFS()->get('related_program');
        if ($programs) { ?>

            <hr class="section-break">
            <h2 class="headline headline--medium">Related Program(s)</h2>
            <ul class="link-list min-list">

                <?php foreach ($programs as $program) { ?>
                    <li>
                        <a href="<?php echo get_the_permalink($program); ?>"><?php echo get_the_title($program); ?></a>
                    </li>
                <?php } ?>

            </ul>
        <?php } ?>

    </div>

<?php }
get_footer();
?>