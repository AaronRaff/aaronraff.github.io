$(document).ready(function() {
    $.ajax({
    beforeSend: function(request) {
        request.setRequestHeader("Accept", "application/vnd.github.cloak-preview");
    },
    dataType: "json",
    url: "https://api.github.com/users/aaronraff/events/public",
    success: function(data) {
        populateGitHubSection(data);
    }
    });
});

function populateGitHubSection(data) {
    console.log(data);
        for(var i = 2; i >= 0; i--) {
            if(data[i].type === "PushEvent") {
                var html = buildGitHubHTML(data[i]);
                $('#github').append(html);
            }
    }
}

function buildGitHubHTML(data) {
    var timestamp = data.created_at;
    timestamp = timestamp.substring(0, timestamp.indexOf('T'));
    var time = "<span class='timestamp'>" + timestamp + "</span>";
    
    var repo = "<a class='repo-link' target='_blank' href='https://github.com/" + data.repo.name + "'>" + 
               "<h3>" + data.repo.name + time + "</h3>" +
               "</a>";

    var message = "<p>" + data.payload.commits[0].message + "</p>"; 

    return "<div class='github-commit'>" + repo + message + "</div><hr>";
}