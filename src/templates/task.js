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
            <div>{task.jiraFields.project.name + " " + task.jiraFields.issuetype.name}</div>
            <h1 style={{ marginBottom: 10 }}>{task.jiraFields.summary}</h1>
            {epic != null ? <a href={'../' + data.epic.slug}>{epic.jiraIssue.jiraFields.summary}</a> : ""}
            <div>
                {task.jiraFields.description != null ? <h3 style={{ marginBottom: 10, marginTop: 15 }}>Description</h3> : ""}
                {/* {task.renderedFields.description} */}
                <div dangerouslySetInnerHTML={{ __html: task.renderedFields.description}} />
                <h3 style={{ marginBottom: 10, marginTop: 15 }}>Details</h3>
                <ul>
                    <li><a href={'https://timetopretend.atlassian.net/browse/' + task.key} target='_blank'>Jira Link: {task.key}</a></li>
                    <li><b>Priority:</b> {task.jiraFields.priority.name}</li>
                    <li><b>Status:</b> {task.jiraFields.status.name}</li>
                    {/* <li><b>Components:</b> {task.components.map((component, i) => { return (<a href={component.description} target='_blank' key={i}>{component.name}, </a>) })}</li> */}
                    {/* <li><b>Labels:</b> {task.labels.map((label, i) => { return label + " " })}</li> */}
                </ul>
                <SubtaskList value={task.jiraFields.subtasks} />
                <TasksByField tasks={stories} type="Stories" field="project"/>
            </div>
        </div>
    );
};

export const query = graphql`
  query TaskQuery($id: String!, $epicKey: String, $key: String) {
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

    epic: jiraIssue(key: {eq: $epicKey}) {
        slug
        jiraIssue {
            id
            jiraFields {
                summary
            }
        }
    }

    stories: allJiraIssue(filter: {epic: {eq: $key}}) {
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