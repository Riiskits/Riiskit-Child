/**
 * Mobile togglemenu
 *
 * @since Riiskit 1.0.0
 */

jQuery(function ($) {

    "use strict";

	// Cache vars
	var body    = $('body');
    var nav     = $('.site-header__nav');
    var menu    = $('.menu-primary');
    var button  = $('.toggle-menu-btn');

	// Other vars
	var menuBreakpoint = 649;
	var active = false;

    if ( !nav || !button ) {
        return;
    } else if ( !menu || !menu.children().length ) {
        button.addClass('hide');
        return;
    } else {
        // Toggle functionality
       button.on('click.riiskit', function() {
            menu.toggleClass('active');
            $(this).toggleClass('active');

            if ( active === false ) {
                active = true;
                $(this).attr('aria-pressed', 'true');
            } else {
    	        active = false;
    	        $(this).attr('aria-pressed', 'false');
            }
        });

       // Resize window
        var menuResize = riiskit.utils.throttle(function() {
            console.log( 'test' );
            if ( $.selector_cache(window).width() >= menuBreakpoint ) {
                menu.addClass('active was-not-active');
                button.addClass('active');
            } else {
                if ( menu.hasClass('active was-not-active') ) {
                    menu.removeClass('active active was-not-active');
                    button.removeClass('active active was-not-active');
                }
            }
        }, 100);

        $.selector_cache(window)
            .on('resize.riiskit', menuResize);
    }

}); // end jQuery document ready
