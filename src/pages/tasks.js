import React from 'react'
import TasksByField from "../components/tasks-by-field"

const TasksPage = (props) => {
    const tasks = props.data.epics && props.data.epics.edges;
    if (tasks && tasks.length > 0) {
        return (
            <TasksByField tasks={tasks} title="Presently I'm..." field="project" monoType="false" />
        );
    } else {
        return (
            <div>
                It's a mystery, for now.
            </div>
        );
    }
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