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

$(document).ready(function () {
   getProjects();
});