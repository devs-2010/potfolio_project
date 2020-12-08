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
            console.log(data);
            fun(data);
        },

        error: (e) => {
            console.log(e)
        },
    });
}

// load svgs
(function load_svgs() {
    let c_svg = $('c_svg');
    for (let i = 0; i < c_svg.length; i++) {
        let el = c_svg.get(i);
        load_url(el.getAttribute('href'), (data) => {
            let new_node = $(data);
            $(el).after(new_node);
            $(el).remove();
            new_node.attr('class', el.getAttribute('class'));
            new_node.before(`<!-- ${el.outerHTML} -->`);
        })
    }
})();
