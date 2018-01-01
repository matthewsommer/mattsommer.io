
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
        if(task.fields.customfield_10009 != null) {
            $.getJSON("http://54.190.22.140/rest/api/2/issue/" + task.fields.customfield_10009 + "?fields=summary,project", function(epic) {
                callback(task,epic);
            });
        } else {
            callback(task,null);
        }
    });
}

function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function getRepoData(id,callback) {
    $.getJSON("http://54.190.22.140/rest/dev-status/1.0/issue/detail?issueId=" + id + "&applicationType=github&dataType=repository", function(result) {
        callback(result);
    });
}

function getTasks(query,callback) {
    var tasks = [];
    var startAt = 0;
    var maxResults = 100;
    $.getJSON("http://54.190.22.140/rest/api/2/search?jql=" + query + "&startAt=" + startAt + "&maxResults=" + maxResults, function(result1) {
        tasks = result1.issues;
        startAt = startAt + maxResults;
        if(result1.total > (result1.startAt + result1.maxResults)) {
            $.getJSON("http://54.190.22.140/rest/api/2/search?jql=" + query + "&startAt=" + startAt + "&maxResults=" + maxResults, function(result2) {
                tasks = $.merge(result1.issues, result2.issues);
                callback(tasks);
            });
        } else {
            callback(tasks);
        }
    });
}

function getReadme(callback) {
    $.get("https://raw.githubusercontent.com/matthewsommer/popular_movies/master/readme.md", function(readme){
        var converter = new showdown.Converter(),
        text      = readme,
        html      = converter.makeHtml(text);
        callback(html);
    });
}