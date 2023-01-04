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