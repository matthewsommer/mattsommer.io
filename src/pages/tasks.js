import React from 'react'
import Link from 'gatsby-link'

const TasksPage = (props) => {
    const tasks = props.data.epics && props.data.epics.edges;
    if (tasks && tasks.length > 0) {
        const headers = Array.from(new Set(tasks.map(task => task.node.jiraIssue.jiraFields['project'] != null ? task.node.jiraIssue.jiraFields['project']["name"] : null).sort()));
        return (
            <div>
                <div className="text-dark h2">Currently I'm...</div>
                {headers.map((project, i) => {
                    return ([
                        tasks.map((task, i) => {
                            const taskNode = task.node;
                            if (taskNode.jiraIssue.jiraFields['project'] != null && taskNode.jiraIssue.jiraFields['project'].name === project) {
                                return (
                                    <div key={i} className='align-top'>
                                        <Link to={'/' + taskNode.slug} className="text-secondary">{taskNode.jiraIssue.jiraFields.issuetype.name} - {taskNode.jiraIssue.jiraFields.summary}</Link>
                                    </div>
                                )
                            }
                        })
                    ])
                })}
            </div>
        )
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