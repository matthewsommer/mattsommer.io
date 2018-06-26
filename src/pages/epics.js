import React from 'react'
import Link from 'gatsby-link'

const EpicsPage = (props) => {
    const tasks = props.data.epics.edges;

    return (
        <div>
            <h5>Epics</h5>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                    
                        <Link to={taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link>
                        <p>{taskNode.author}</p>
                        <p>{taskNode.description}</p>
                    </div>
                )
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