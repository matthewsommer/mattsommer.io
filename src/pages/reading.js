import React from 'react'
import Link from 'gatsby-link'

const ReadingPage = (props) => {
    const tasks = props.data.reading.edges;
    const statuses = [{ name: "In Progress", label: "Currently Reading" }, { name: "Closed", label: "Have Read" }, { name: "Open", label: "Want to Read" }]
    return (
        <div>
            <div className="text-dark h2">Reading List</div>
            {statuses.map((status, i) => {
                return ([
                    <div className="text-dark h2 mb-0 mt-4">{status.label}</div>,
                    tasks.map((taskNode, i) => {
                        const task = taskNode.node.jiraIssue
                        const slug = taskNode.node.slug
                        if (task.jiraFields.status != null && task.jiraFields.status.name === status.name) {
                            return (
                                <div className="pt-2">
                                    <Link to={'/' + slug} className="text-secondary"><h4>{task.jiraFields.summary}</h4></Link>
                                    By {task.jiraFields.customfield_10100}
                                </div>
                            )
                        }
                    })
                ])
            })}
        </div>
    );
};

export default ReadingPage

export const query = graphql`
    query ReadingQuery {
        reading: allJiraIssue(filter: {type: {eq: "Reading"}, project: {eq: "Education"}}) {
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
                    customfield_10100
                    priority {
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