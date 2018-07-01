import React from 'react'
import TasksByField from "../components/tasks-by-field"

const EpicsPage = (props) => {
    return (
        <TasksByField tasks={props.data.epics.edges} title="Epics" field="project"/>
    );
};

export default EpicsPage

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
                        }
                    }
                }
            }
        }
    }
  `;