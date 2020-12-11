let baseURL = `${location.protocol}//${location.hostname}${location.port ? ":" + location.port : ""}/`

function load_url(url, fun) {
    // function to get the contents of url raw using AJAX
    $.ajax({
        url: baseURL + url,
        dataType: 'text',
        processData: false,
        statusCode: {
            404: function () {
                console.log(this.url)
            }
        },
        success: (data) => {
            fun(data);
        },

        error: (e) => {
            console.log(e)
        },
    });
}

// load svgs
function load_svgs() {
    let c_svg = $('c_svg');
    for (let i = 0; i < c_svg.length; i++) {
        let el = c_svg.get(i);
        load_url(el.getAttribute('href'), (data) => {
            let new_node = $(data);
            $(el).after(new_node);
            $(el).remove();
            let attributes = $(el).prop('attributes');
            $.each(attributes, (k, v) => {
                if (v.name === 'href') return;
                new_node.attr(v.name, v.value);
            });

            new_node.attr('fill', 'currentColor');
            new_node.before(`<!-- ${el.outerHTML} -->`);
        })
    }
}

$(document).ready(function () {
    load_svgs();
});
