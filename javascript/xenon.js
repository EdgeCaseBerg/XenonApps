jQuery( document ).ready( function( $ ) { 
	/* Handle profile page swapping */
	if( $('#profile-container').length > 0 ) {
		$('#member-list li').on('click', function(evt) {
			var li = $(this);
			if( ! li.hasClass('loaded') ) {
				/* Load and set content*/
				$('#profile-container').load( '/profiles/' + li.attr('data')  + '.html', function(evt) {
					li.attr('data', $('#profile-container').html() );
					li.addClass('loaded');
				});
			} else {	
				$('#profile-container').html(li.attr('data'));
			}
			$('#member-list li.active').removeClass('active');
			li.addClass('active');
		});
	}
});