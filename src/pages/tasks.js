import React from 'react'
import TasksByField from "../components/tasks-by-field"

const TasksPage = (props) => {
    return (
        <TasksByField tasks={props.data.epics.edges} title="What I'm Currently Working On..." field="project" monoType="false"/>
    );
};

export default TasksPage

export const query = graphql`
    query TasksQuery {
        epics: allJiraIssue(filter: {status: {eq: "In Progress"}}) {
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
                        }
                    }
                }
            }
        }
    }
  `;