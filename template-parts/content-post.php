<div class="post-item">
	<h2 class="headline headline--medium headline--post-title">
		<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
	</h2>
	<div class="metabox">
		<p>Posted by <?php the_author_posts_link(); ?> on <?php the_date(); ?>
			<?php if (!has_category('uncategorized')) {
				echo 'in ';
				the_category(', ');
			} ?>
		</p>
	</div>
	<div class="generic-content">
		<?php the_excerpt(); ?>
		<p>
			<a class="btn btn--blue" href="<?php the_permalink(); ?>">Continue reading &raquo;</a>
		</p>
	</div>
</div>