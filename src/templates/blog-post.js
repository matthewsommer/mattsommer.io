import React from "react";
import SubtaskList from "../components/subtask-list";
import TasksByField from "../components/tasks-by-field"

export default ({ data }) => {
    const task = data.jiraIssue.jiraIssue;
    const epic = data.epic;
    var stories = [];
    if (data.stories != null) {
        stories = data.stories.edges;
    }
    return (
        <div>
            <h1 style={{ marginBottom: 10 }}>{task.jiraFields.summary}</h1>
            <div>
                <div dangerouslySetInnerHTML={{ __html: task.renderedFields.description}} />
            </div>
        </div>
    );
};

export const query = graphql`
  query BlogPostQuery($id: String!) {
    jiraIssue(id: { eq: $id }) {
        jiraIssue {
            id
            key
            renderedFields {
                description
            }
            jiraFields {
                summary
                description
                issuetype {
                    name
                }
                project {
                    name
                }
                priority {
                    name
                }
                status {
                    name
                }
                issuetype {
                    name
                }
                subtasks {
                    id
                    jiraFields {
                        summary
                        status {
                            name
                        }
                    }
                }
            }
        }
    }
  }
`;