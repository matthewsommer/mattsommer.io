import React from 'react'
import Link from 'gatsby-link'

const EpicsPage = (props) => {
    const tasks = props.data.epics.edges;
    const projects = Array.from(new Set(tasks.map(task => task.node.jiraIssue.jiraFields.project.name).sort()));
    return (
        <div>
            <h2>Epics</h2>
            {projects.map((project, i) => {
                return ([
                    <h3 key={i}>{project}</h3>,
                    tasks.map((task, i) => {
                        const taskNode = task.node;
                        if (taskNode.jiraIssue.jiraFields.project.name === project) {
                            return (
                                <div key={i}>
                                    <Link to={'/' + taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link>
                                </div>
                            )
                        }
                    })
                ])
            })}

        </div>
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