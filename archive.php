<?php
get_header();
?>

    <div class="page-banner">
        <div class="page-banner__bg-image"
             style="background-image: url(<?php echo get_theme_file_uri('/assets/images/ocean.jpg'); ?>)"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title">
                <?php the_archive_title(); ?>
            </h1>
            <div class="page-banner__intro">
                <p>
                    <?php the_archive_description(); ?>
                </p>
            </div>
        </div>
    </div>

<?php
get_footer();
?>