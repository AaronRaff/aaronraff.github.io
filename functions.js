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
});

/**
 * Adds HTML to the github section of the site.
 * @param {object} data - Information about activity.
 */
function populateGitHubSection(data) {
        let count = 0, items = 0;
        let done = false;

        while(!done && items < 3) {
            if(data[count].type === "PushEvent") {
                //Increment count of items added to page.
                items++;
                var html = buildGitHubHTML(data[count]);
                $('#github-container').append(html);    
            }
            
            //Check if at end of array or count is 3
            if(count >= data.length) {
                done = true;
            }

            //Increment count to check next item
            count++;
        }
}

/**
 * Generates HTML from activity data.
 * @param {object} data - Information about activity.
 */
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