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
                // Look at the commits under this push
                data[count].payload.commits.forEach(commit => {
                    // Only display 3 commits
                    if(items >= 3) {
                        return       
                    }
                    
                    if(commit.author.email == "aaronraffdev@gmail.com") {
                        //Increment count of items added to page.
                        items++;
                        var html = buildGitHubHTML(commit, data[count].repo, data[count].created_at);
                        $('#github-container').append(html);
                    }
                });
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
function buildGitHubHTML(commitData, repoData, timestamp) {
    timestamp = timestamp.substring(0, timestamp.indexOf('T'));
    var time = "<span class='timestamp'>" + timestamp + "</span>";
    
    var repo = "<a class='repo-link' target='_blank' href='https://github.com/" + repoData.name + "'>" + 
               "<h3>" + repoData.name + time + "</h3>" +
               "</a>";

    var message = "<p>" + commitData.message + "</p>"; 

    return "<div class='github-commit'>" + repo + message + "</div><hr>";
}
