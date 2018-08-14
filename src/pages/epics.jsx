import React from 'react';
import PropTypes from 'prop-types';
import TasksByField from '../components/tasks-by-field';

export default function EpicsPage(props) {
    const tasks = props.data.epics.edges;
    return (
        <TasksByField tasks={tasks} title="Epics" field="project" />
    );
}

EpicsPage.propTypes = {
    props: PropTypes.object, // eslint-disable-line react/forbid-prop-types
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
