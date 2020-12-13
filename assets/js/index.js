function bind_listeners_to_chat_btn() {
    let chat_btn = $('.chat_btn'),
        chat_box = $('.chat_box'),
        chat_box_close = $('.chat_box_close'),
        send_btn = $('#submit'),
        chat_name = $('#chat_name'),
        chat_email = $('#chat_email'),
        chat_message = $('#chat_message');

    chat_btn.click(() => {
        chat_box.addClass('chat_box--shown')
    });

    chat_box_close.click(() => {
        chat_box.removeClass('chat_box--shown')
    });

    send_btn.click(() => {
        send_chat_POST_request(chat_name, chat_email, chat_message)
    });
}

$(document).ready(function () {
    let popup_nav_menu = $('.popup_nav_menu').get(0);
    $('#close_icon').click(() => {
        $(popup_nav_menu).css({
            'animation-name': 'menu_popup_animation_reverse',
            'transform': 'translate(40%, -100%)',
            'animation-iteration-count': '1',

        })
    });

    $('#menu_icon').click(() => {
        $(popup_nav_menu).css({
            'animation-name': 'menu_popup_animation',
            'transform': 'translate(40%, -40%)',
            'animation-iteration-count': '1',
        })
    });

    bind_listeners_to_chat_btn();
});
