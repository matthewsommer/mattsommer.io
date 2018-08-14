import React from 'react';
import PropTypes from 'prop-types';
import TasksByField from '../components/tasks-by-field';

export default function EpicsPage(data) {
  const { tasks } = data.epics.edges;
  return (
    <TasksByField tasks={tasks} title="Epics" field="project" />
  );
}

EpicsPage.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const query = graphql`
    query EpicsQuery {
        epics: allJiraIssue(filter: {type: {eq: "Epic"}}) {
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
                            project {
                                name
                            }
                            issuetype {
                                name
                            }
                            components {
                                name
                              }
                        }
                    }
                }
            }
        }
    }
  `;
