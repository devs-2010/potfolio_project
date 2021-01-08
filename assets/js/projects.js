/*Fetch request to projects.json*/
let project_slider = null,
    tag_container = null,
    valid_tags = new Array(),
    projects_cards = new Array();

function generate_card_code(json) {
    let banner_code = '';
    json.tags.forEach((i) => {
        banner_code += `<div class="banner">${i.toUpperCase()}</div>\n`
    });

    return `<div class="card_container">
                    <div class="card project_card">
                        <div class="project_header" style="background-image: url('${json.images[0]}');">
                            <!-- contains image and name -->
                        </div>
                        <div class="project_card_body">
                            <div class="project_banners">
                                ${banner_code}
                            </div>
                            <span class="project_name">${json.name}</span>
                            <p class="project_desc">
                                ${json.description}
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
        if (projects_slider.get(0).scrollLeft === projects_slider.get(0).scrollLeftMax) {
            btn_slide_right.css({"display": "none"});
        } else {
            btn_slide_right.css({"display": "block"});
        }

        if (projects_slider.get(0).scrollLeft === 0) {
            btn_slide_left.css({"display": "none"});
        } else {
            btn_slide_left.css({"display": "block"});
        }

        console.log(projects_slider.get(0).scrollLeft, projects_slider.get(0).scrollLeftMax)
    }

    // eval_scroll();
    btn_slide_left.click(function () {
        projects_slider.animate({
            scrollLeft: "-=" + (projects_slider.width() / 1.5) + "px",
        }, 300);
    });

    btn_slide_right.click(function () {
        projects_slider.animate({
            scrollLeft: "+=" + (projects_slider.width() / 1.5) + "px",
        }, 300)
    });


}

function hide_scrollbar() {
    // project_slider.css({'paddingBottom': (project_slider.get(0).offsetHeight - project_slider.get(0).clientHeight) + "px"})
}

function toggle_visibility_card(tag) {
    if (tag === "ALL") {
        // set all cards to display: block;
        projects_cards.forEach(function (val) {
            val.css({"display": "flex"});
            setTimeout(function () {
                val.css({'visibility': "visible", "opacity": "1"})
            }, 200);
        })
    } else {
        projects_cards.forEach(function (val) {
            if (val.tags.indexOf(tag) === -1) {
                val.css({'visibility': "invisible", "opacity": "0"});
                setTimeout(function () {
                    val.css({"display": "none"})
                }, 200)
            } else {
                val.css({"display": "flex"});
                setTimeout(function () {
                    val.css({'visibility': "visible", "opacity": "1"})
                }, 200);
            }
        })
    }
}

function append_tag(tag) {
    if (valid_tags.indexOf(tag) !== -1) return;
    valid_tags.push(tag);
    let _tag = $(`<div class="tag hover_btn" for="${tag}">${tag}</div>`);
    _tag.click(function () {
        // Show selected tag
        toggle_visibility_card(this.getAttribute("for"));
    });

    tag_container.append(_tag);
}

function getProjects() {
    $.ajax({
        type: 'GET',
        url: '/projects.json',
        success: function (data) {
            if (!data) return;
            data.projects.forEach(function (val, i) {
                let card = $(generate_card_code(val));
                card.tags = val.tags.map((x) => {
                    return x.toUpperCase();
                });

                projects_cards.push(card);
                project_slider.append(card);
                val.tags.forEach((x) => {
                    append_tag(x.toUpperCase());
                });
            });
            bind_listeners_for_scroll();
            hide_scrollbar();
        },
        error: function (e) {
            console.log(e)
        },
    })
}

$(document).ready(function () {
    project_slider = $('.project_slider');
    tag_container = $('.tag_container');
    append_tag("All".toUpperCase());
    getProjects();
});