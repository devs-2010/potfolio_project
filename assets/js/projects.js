/*Fetch request to projects.json*/
function generate_card_code(val) {
    let banner_code = '';
    val.tags.forEach((i) => {
        banner_code += `<div class="banner">${i.toUpperCase()}</div>\n`
    });

    return `<div class="card_container">
                    <div class="card project_card">
                        <div class="project_header" style="background-image: url('${val.images[0]}');">
                            <!-- contains image and name -->
                        </div>
                        <div class="project_card_body">
                            <div class="project_banners">
                                ${banner_code}
                            </div>
                            <span class="project_name">${val.name}</span>
                            <p class="project_desc">
                                ${val.description}
                            </p>
                            <button class="more_btn hover_btn">Explore</button>
                        </div>
                    </div>
                </div>`
}

function bind_listeners_for_scroll() {
    let projects_slider = $('.project_slider'),
        btn_slide_left = $('#slide_left'),
        btn_slide_right = $('#slide_right');

    function eval_scroll() {
        if ($(projects_slider).get(0).scrollLeft === $(projects_slider).get(0).scrollLeftMax) {
            btn_slide_right.css({"display": "none"});
        } else {
            btn_slide_right.css({"display": "block"});
        }

        if ($(projects_slider).get(0).scrollLeft === 0) {
            btn_slide_left.css({"display": "none"});
        } else {
            btn_slide_left.css({"display": "block"});
        }
    }

    eval_scroll();
    btn_slide_left.click(function () {
        projects_slider.animate({
            scrollLeft: "-=" + (projects_slider.width() * 1.1),
        }, 300, function () {
            eval_scroll();
        })
    });

    btn_slide_right.click(function () {
        projects_slider.animate({
            scrollLeft: "+=" + (projects_slider.width() * 1.1),
        }, 300, function () {
            eval_scroll()
        })
    });


}

function getProjects() {
    $.ajax({
        type: 'GET',
        url: '/projects.json',
        success: function (data) {
            if (!data) return;
            let project_slider = $('.project_slider');
            data.projects.forEach(function (val, i){
                project_slider.append($(generate_card_code(val)))
            });
            bind_listeners_for_scroll();
        },
        error: function (e) {
            console.log(e)
        },
    })
}

$(document).ready(function () {
    getProjects();
});