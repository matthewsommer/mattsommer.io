import React from 'react'
import Link from 'gatsby-link'

function importAll(r) {
    return r.keys().map(r);
}

function StatusIcon(status) {
    if (status == 'Open') {
        return <img src={photography[0]} alt="icon" className="status" />;
    } else if (status == 'Closed') {
        return <img src={photography[1]} alt="icon" className="status" />;
    } else if (status == 'In Progress') {
        return <img src={photography[2]} alt="icon" className="status" />;
    }
}

const photography = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

const ReadingPage = (props) => {
    const tasks = props.data.epics.edges;

    return (
        <div>
            <h5>Reading List</h5>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                        {StatusIcon(taskNode.jiraIssue.jiraFields.status.name)}
                        <Link to={'/' + taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link> by {taskNode.jiraIssue.jiraFields.customfield_10100}
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
                    status {
                        name
                    }
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