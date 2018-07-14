import React from 'react'
import TasksByComponent from "../components/tasks-by-component"

const ComponentsPage = (props) => {
    return (
        <TasksByComponent tasks={props.data.epics.edges} title="Tasks by Skill" field="components"/>
    );
};

export default ComponentsPage

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