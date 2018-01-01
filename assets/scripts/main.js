
function getTasksAsync(jql,startAt,callback) {
    $.getJSON("http://54.190.22.140/rest/api/2/search?jql=" + jql + "&startAt=" + startAt, function(result) {
        callback(result.issues);
        if(result.total > (result.startAt + result.maxResults)) {
            getTasksAsync(jql,result.startAt + result.maxResults, callback);
        }
    });
}

function getTaskAsync(id,callback) {
    $.getJSON("http://54.190.22.140/rest/api/2/issue/" + id + "?fields=summary,project,status,description,customfield_11401,customfield_10009,self,attachment,priority,customfield_10700,issuetype", function(task) {
        callback(task);
    });
}

function getRepoData(id,callback) {
    $.getJSON("http://54.190.22.140/rest/dev-status/1.0/issue/detail?issueId=" + id + "&applicationType=github&dataType=repository", function(result) {
        callback(result);
    });
}