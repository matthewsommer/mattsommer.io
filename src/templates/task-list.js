import React from "react";

const TaskList = (props) => {
    const tasks = props.data.allJiraIssue.edges;
    return (
        <div>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                        <a href={taskNode.slug}><h4>{taskNode.jiraIssue.jiraFields.summary}</h4></a>
                        <p>{taskNode.jiraIssue.jiraFields.description}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default TaskList

export const query = graphql`
    query TaskFilter($project: String!) {
        allJiraIssue(filter: {project: {eq: $project}}) {
        edges {
            node {
                slug
                jiraIssue {
                    id
                    jiraFields {
                        summary
                        description
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