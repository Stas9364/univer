<?php
get_header();

while (have_posts()) {
    the_post();
    pageBanner([
        'title' => '',
        'subtitle' => ''
    ]);
    ?>

    <div class="container container--narrow page-section">
        <div class="generic-content">
            <div class="row group">
                <div class="one-third">
                    <?php the_post_thumbnail('professorsPortrait'); ?>
                </div>
                <div class="two-third">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>

        <?php $programs = CFS()->get('related_program');
        if ($programs) { ?>

            <hr class="section-break">
            <h2 class="headline headline--medium">Subject(s) Taught</h2>
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