<?php
get_header();

$pageBannerIMG = CFS()->get('page_background_image');
$defaultBannerIMG = get_theme_file_uri('/assets/images/ocean.jpg');

while (have_posts()) {
    the_post();
    ?>

    <div class="page-banner">
        <div class="page-banner__bg-image"
             style="background-image: url(<?php echo $pageBannerIMG ? $pageBannerIMG : $defaultBannerIMG ?>)"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php the_title(); ?></h1>
            <div class="page-banner__intro">
                <p><?php echo CFS()->get('page_subtitle') ?></p>
            </div>
        </div>
    </div>

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