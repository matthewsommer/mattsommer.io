import React from 'react'
import Link from 'gatsby-link'

const TaskStatsPage = (props) => {
    const tasks = props.data.epics.edges;

    return (
        <div>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                        <Link to={taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link>
                    </div>
                )
            })}
        </div>
    );
};

export default TaskStatsPage

export const query = graphql`
    query TaskStatsQuery {
        epics: allJiraIssue(filter: {type: {eq: "Story"}}) {
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
                        }
                    }
                }
            }
        }
    }
  `;