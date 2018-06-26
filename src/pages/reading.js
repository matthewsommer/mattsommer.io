import React from 'react'
import Link from 'gatsby-link'

const ReadingPage = (props) => {
    const tasks = props.data.epics.edges;

    return (
        <div>
            <h5>Reading List</h5>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                        <Link to={taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link> by {taskNode.jiraIssue.jiraFields.customfield_10100}
                    </div>
                )
            })}
        </div>
    );
};

export default ReadingPage

export const query = graphql`
    query ReadingQuery {
        epics: allJiraIssue(filter: {type: {eq: "Reading"}, project: {eq: "Education"}}) {
            edges {
                node {
                slug
                jiraIssue {
                    id
                    jiraFields {
                    summary
                    customfield_10100
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