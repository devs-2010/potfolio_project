/*Fetch request to projects.json*/
function getProjects(){
    $.ajax({
        type: 'GET',
        url: baseURL + 'projects.json',
        success: function () {
            console.log('success')
        },
        error: function () {
            console.log('error')
        },
    })
}

function bind_listeners_for_scroll(){
    let projects_slider = $('.project_slider'),
        btn_slide_left = $('#slide_left'),
        btn_slide_right = $('#slide_right');

    btn_slide_left.click(function (){
        console.log(projects_slider.width());
        projects_slider.animate({
            scrollLeft : "-="+(projects_slider.width()/1.5),
        }, 300)
    });

    btn_slide_right.click(function (){
        projects_slider.animate({
            scrollLeft : "+="+(projects_slider.width()/1.5),
        }, 300)
    });


}

$(document).ready(function () {
   // getProjects();
    bind_listeners_for_scroll()
});