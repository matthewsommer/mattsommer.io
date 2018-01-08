
google.charts.load('current', {packages:['wordtree']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
var data = google.visualization.arrayToDataTable(
    [ ['Phrases'],
    ['MattSommer.io Jira'],
    ['MattSommer.io GitHub-Pages'],
    ]
);
var options = {
    maxFontSize: 18,
    wordtree: {
    format: 'implicit',
    word: 'MattSommer.io'
    }
};
var chart = new google.visualization.WordTree(document.getElementById('wordtree_basic'));
chart.draw(data, options);
}