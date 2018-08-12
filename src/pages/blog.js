import React from 'react'
import Link from 'gatsby-link'
import Moment from 'moment'
import CustomShield from '../components/custom-shield/custom-shield'
import TaskLabels from '../components/task-labels/task-labels'

const BlogPostsPage = (props) => {
    const tasks = props.data.blogpost.edges;
    return (
        <div>
            <div className="text-dark h2">Blog Posts</div>
            {tasks.map((taskNode, i) => {
                const slug = taskNode.node.slug
                const task = taskNode.node.jiraIssue
                return (
                    <div key={i}>
                        <h3 className=""><Link to={'/' + slug} className="text-dark">{task.jiraFields.summary}</Link></h3>
                        {Moment(task.jiraFields.customfield_10905).format('MMMM Do, YYYY')}
                        {i != (tasks.length - 1) ? <hr /> : ' '}
                    </div>
                )
            })}
        </div>
    );
};

export default BlogPostsPage

export const query = graphql`
    query BlogPostsQuery {
        blogpost: allJiraIssue(filter: {type: {eq: "Blog Post"}, status: {eq: "Closed"}}, sort: {fields: [jiraIssue___jiraFields___customfield_10905], order: DESC}) {
            edges {
                node {
                    slug
                    jiraIssue {
                        id
                        jiraFields {
                            summary
                            updated
                            customfield_10905
                            labels
                            assignee {
                                displayName
                            }
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