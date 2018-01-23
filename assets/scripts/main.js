
function getTasksAsync(jql,startAt,callback) {
    $.getJSON("https://jira.mattsommer.io/rest/api/2/search?jql=" + jql + "&startAt=" + startAt, function(result) {
        callback(result.issues);
        if(result.total > (result.startAt + result.maxResults)) {
            getTasksAsync(jql,result.startAt + result.maxResults, callback);
        }
    });
}

function getSubtasksAsync(id,callback) {
    $.getJSON("https://jira.mattsommer.io/rest/api/2/search?jql=parent=" + id + "&expand=renderedFields", function(result) {
        callback(result.issues);
    });
}

function getTaskAsync(id,callback) {
    $.getJSON("https://jira.mattsommer.io/rest/api/2/issue/" + id + "?fields=summary,project,status,description,customfield_11401,customfield_10009,self,attachment,priority,customfield_10700,issuetype,components,subtasks&expand=renderedFields", function(task) {
        if(task.fields.customfield_10009 != null) {
            $.getJSON("https://jira.mattsommer.io/rest/api/2/issue/" + task.fields.customfield_10009 + "?fields=summary,project", function(epic) {
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
    $.getJSON("https://jira.mattsommer.io/rest/dev-status/1.0/issue/detail?issueId=" + id + "&applicationType=github&dataType=repository", function(result) {
        callback(result);
    });
}

function getTasks(query,fields,callback) {
    var tasks = [];
    var startAt = 0;
    var maxResults = 100;
    $.getJSON("https://jira.mattsommer.io/rest/api/2/search?jql=" + query + "&startAt=" + startAt + "&maxResults=" + maxResults+ "&fields=" + fields, function(result1) {
        tasks = result1.issues;
        startAt = startAt + maxResults;
        if(result1.total > (result1.startAt + result1.maxResults)) {
            $.getJSON("https://jira.mattsommer.io/rest/api/2/search?jql=" + query + "&startAt=" + startAt + "&maxResults=" + maxResults+ "&fields=" + fields, function(result2) {
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


function typeCharts() {
    var epicsCount = 0;
    var storiesCount = 0;
    var tasksCount = 0;

    function chart() {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Type');
            data.addColumn('number', 'Total');
            data.addColumn({type: 'string', role: 'style'});
            data.addRows([
                ['Epics', epicsCount, 'color: #03477F'],
                ['Stories', storiesCount, 'color: #045CA5'],
                ['Tasks', tasksCount, 'color: #097EE0']
            ]);

            var pieoptions = {legend: { position: "top" },colors: ['#03477F', '#045CA5', '#097EE0'],'is3D':true,
            'chartArea': {'width': '90%', 'height': '90%'}};

            var baroptions = {legend: { position: "none" },'is3D':true,
            'chartArea': {'width': '75%', 'height': '90%'}};

            var piechart = new google.visualization.PieChart(document.getElementById('piechart_div'));
            var barchart = new google.visualization.BarChart(document.getElementById('barchart_div'));

            piechart.draw(data, pieoptions);
            barchart.draw(data, baroptions);
        }
    }

    $.getJSON("https://jira.mattsommer.io/rest/api/2/search?jql=issuetype%20%3D%20Epic&maxResults=0", function(epics){
        epicsCount = epics.total;
        $.getJSON("https://jira.mattsommer.io/rest/api/2/search?jql=issuetype%20%3D%20Story&maxResults=0", function(stories){
            storiesCount = stories.total;
            $.getJSON("https://jira.mattsommer.io/rest/api/2/search?jql=issuetype%20not%20in%20(Epic%2C%20Story)%20AND%20resolution%20%3D%20Unresolved&maxResults=0", function(tasks){
                tasksCount = tasks.total;
                chart();
            });
        });
    });

    $(window).resize(function(){
        chart();
    });
}