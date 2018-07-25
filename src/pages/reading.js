import React from 'react'
import Link from 'gatsby-link'
import CustomShield from '../components/custom-shield/custom-shield'
import PriorityShield from "../components/priority-shield/priority-shield"
import StatusShield from "../components/status-shield/status-shield"

const ReadingPage = (props) => {
    const tasks = props.data.reading.edges;
    const statuses = [{name: "In Progress", label: "Currently Reading..."},{name: "Closed", label: "Have Read..."},{name: "Open", label: "Want to Read..."}]
    return (
        <div>
            <div className="text-secondary">My Reading List</div>
            {statuses.map((status, i) => {
                return ([
                    <div key={i} className="text-secondary">{status.label}</div>,
                    <hr className="mt-0 mb-0 pb-0" />,
                    tasks.map((taskNode, i) => {
                        const task = taskNode.node.jiraIssue
                        const slug = taskNode.node.slug
                        if (task.jiraFields.status != null && task.jiraFields.status.name === status.name) {
                            return (
                                <div key={i} className="mt-2">
                                    <h4 className="mb-0 mt-0"><Link to={'/' + slug} className="text-dark">{task.jiraFields.summary}</Link></h4>
                                    <div className="pb-3">
                                        <CustomShield subject="Author" status={task.jiraFields.customfield_10100} color="blue"/>
                                        <PriorityShield priority={task.jiraFields.priority.name}/>
                                        <StatusShield status={task.jiraFields.status.name}/>
                                    </div>
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