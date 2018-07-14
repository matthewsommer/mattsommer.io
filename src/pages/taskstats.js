import React from 'react';
import { render } from 'react-dom';
import { Chart } from 'react-google-charts';

const TaskStatsPage = (props) => {
    const tasks = props.data.epics.edges;
    const openCount = tasks.filter(task => task.node.jiraIssue.jiraFields.status.name == "Open").length;
    const inProgressCount = tasks.filter(task => task.node.jiraIssue.jiraFields.status.name == "In Progress").length;
    const closedCount = tasks.filter(task => task.node.jiraIssue.jiraFields.status.name == "Closed").length;

    const epicsCount = tasks.filter(task => task.node.jiraIssue.jiraFields.issuetype.name == "Epic").length;
    const storiesCount = tasks.filter(task => task.node.jiraIssue.jiraFields.issuetype.name.includes("Story")).length;
    const taskCount = tasks.length - epicsCount - storiesCount;

    return (
        <div className="d-flex flex-md-row flex-column justify-content-between pt-2">
            <Chart
                chartType="PieChart"
                data={[["Task Type", "Count", { "role": "style" }], ["Epic", epicsCount, "#03477F"], ["Stories", storiesCount, "#045CA5"], ["Tasks", taskCount, "#097EE0"]]}
                options={{ legend: { position: "none" }, title: "Percentage of Epics, Stories, and Tasks", colors: ['#03477F', '#045CA5', '#097EE0'], 'is3D': true }}
                graph_id="PieChart"
                width="100%"
                height="400px"
                legend_toggle
            />
            <Chart
                chartType="BarChart"
                data={[["Task Type", "Count", { "role": "style" }], ["Epic", epicsCount, "#03477F"], ["Stories", storiesCount, "#045CA5"], ["Tasks", taskCount, "#097EE0"]]}
                options={{ legend: { position: "none" }, title: "Total Counts of Epics, Stories, and Tasks" }}
                graph_id="BarChart"
                width="100%"
                height="400px"
                legend_toggle
            />
        </div>
    );
};

export default TaskStatsPage

export const query = graphql`
    query TaskStatsQuery {
        epics: allJiraIssue {
            edges {
                node {
                    slug
                    jiraIssue {
                        id
                        jiraFields {
                            summary
                            status {
                                name
                            }
                            issuetype {
                                name
                            }
                            project {
                                name
                            }
                        }
                    }
                }
            }
        }
    }
  `;