import React from "react"
import Link from 'gatsby-link'

const TaskList = (props) => {
    const tasks = props.data.allJiraIssue.edges;
    return (
        <div>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                        <Link to={'/' + taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link>
                        <p>{taskNode.jiraIssue.jiraFields.description}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default TaskList

export const query = graphql`
    query TaskStatusFilter($status: String!) {
    allJiraIssue(filter: {status: {eq: $status}}) {
        edges {
            node {
                slug
                jiraIssue {
                    id
                    jiraFields {
                        summary
                        project {
                            name
                        }
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