import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-google-charts';

export default function TaskStatsPage({ data }) {
  const tasks = data.epics.edges;
  const openCount = tasks.filter(task => task.node.jiraIssue.jiraFields.status.name === 'Open').length;
  const inProgressCount = tasks.filter(task => task.node.jiraIssue.jiraFields.status.name === 'In Progress').length;
  const closedCount = tasks.filter(task => task.node.jiraIssue.jiraFields.status.name === 'Closed').length;
  const epicsCount = tasks.filter(task => task.node.jiraIssue.jiraFields.issuetype.name === 'Epic').length;
  const storiesCount = tasks.filter(task => task.node.jiraIssue.jiraFields.issuetype.name.includes('Story')).length;
  const taskCount = tasks.length - epicsCount - storiesCount;

  return (
    <div>
      <div className="d-flex flex-md-row flex-column justify-content-between pt-2">
        <Chart
          chartType="PieChart"
          data={[['Task Type', 'Count', { role: 'style' }], ['Epic', epicsCount, '#03477F'], ['Stories', storiesCount, '#045CA5'], ['Tasks', taskCount, '#097EE0']]}
          options={
            {
              legend: { position: 'none' }, title: 'Percentage of Epics, Stories, and Tasks', colors: ['#03477F', '#045CA5', '#097EE0'], is3D: true,
            }
          }
          graph_id="PieChart"
          width="100%"
          height="400px"
          legend_toggle
        />
        <Chart
          chartType="BarChart"
          data={[['Task Type', 'Count', { role: 'style' }], ['Epic', epicsCount, '#03477F'], ['Stories', storiesCount, '#045CA5'], ['Tasks', taskCount, '#097EE0']]}
          options={{ legend: { position: 'none' }, title: 'Total Counts of Epics, Stories, and Tasks' }}
          graph_id="BarChart"
          width="100%"
          height="400px"
          legend_toggle
        />
      </div>
      <div>
        <Chart
          chartType="BarChart"
          data={[['Task Type', 'Count', { role: 'style' }], ['Open', openCount, '#03477F'], ['In Progress', inProgressCount, '#045CA5'], ['Closed', closedCount, '#097EE0']]}
          options={{ legend: { position: 'none' }, title: 'Total Counts of Open, In Progress, and Closed' }}
          graph_id="StatusBarChart"
          width="100%"
          height="400px"
          legend_toggle
        />
      </div>
    </div>
  );
}

TaskStatsPage.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

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
