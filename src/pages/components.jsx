import React from 'react';
import PropTypes from 'prop-types';
import TasksByComponent from '../components/tasks-by-component';

export default function ComponentsPage({ data }) {
  return (
    <TasksByComponent tasks={data.epics.edges} title="Tasks by Skill" field="components" />
  );
}

ComponentsPage.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const query = graphql`
    query AllQuery {
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
