$(document).ready(function() {
    $.ajax({
    beforeSend: function(request) {
        request.setRequestHeader("Accept", "application/json");
    },
    dataType: "json",
    url: "https://api.github.com/users/aaronraff/events/public",
    success: function(data) {
        populateGitHubSection(data);
    }
});

    $('#nav-icon').on('click', function() {
        if(!$('#nav').hasClass('nav-expanded')) {
            $('#nav').addClass('nav-expanded');
        } else {
            $('#nav').removeClass('nav-expanded');
        }
    })
});

/**
 * Adds HTML to the github section of the site.
 * @param {object} data - Information about activity.
 */
function populateGitHubSection(data) {
    console.log(data);
        for(var i = 0; i < 3; i++) {
            if(data[i].type === "PushEvent") {
                var html = buildGitHubHTML(data[i]);
                $('#github-container').append(html);
            }
    }
}

/**
 * Generates HTML from activity data.
 * @param {object} data - Information about activity.
 */
function buildGitHubHTML(data) {
    console.log(data);
    var timestamp = data.created_at;
    timestamp = timestamp.substring(0, timestamp.indexOf('T'));
    var time = "<span class='timestamp'>" + timestamp + "</span>";
    
    var repo = "<a class='repo-link' target='_blank' href='https://github.com/" + data.repo.name + "'>" + 
               "<h3>" + data.repo.name + time + "</h3>" +
               "</a>";

    var message = "<p>" + data.payload.commits[0].message + "</p>"; 

    return "<div class='github-commit'>" + repo + message + "</div><hr>";
}