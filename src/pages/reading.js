import React from 'react'
import TasksByField from "../components/tasks-by-field"

const ReadingPage = (props) => {
    return (
        <TasksByField tasks={props.data.reading.edges} title="My Reading List" field="priority" />
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
                    }
                }
                }
            }
        }
    }
  `;