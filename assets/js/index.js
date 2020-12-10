let popup_nav_menu = $('.popup_nav_menu').get(0);

$(document).ready(function () {
    $('#close_icon').click(() => {
        $(popup_nav_menu).css({
            'animation-name': 'menu_popup_animation_reverse',
            'transform': 'translate(40%, -100%)',
            'animation-iteration-count': '1',

        })
    });
    console.log($('#menu_icon'));
    $('#menu_icon').click(() => {
        console.log('clicked');
        $(popup_nav_menu).css({
            'animation-name': 'menu_popup_animation',
            'transform': 'translate(40%, -40%)',
            'animation-iteration-count': '1',
        })
    });
});
