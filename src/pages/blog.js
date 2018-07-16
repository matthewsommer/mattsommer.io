import React from 'react'
import Link from 'gatsby-link'
import Moment from 'moment'
import CustomShield from '../components/custom-shield/custom-shield'

const BlogPostsPage = (props) => {
    const tasks = props.data.blogpost.edges;

    return (
        <div>
            <h2>Blog</h2>
            {tasks.map((taskNode, i) => {
                const slug = taskNode.node.slug
                const task = taskNode.node.jiraIssue

                return (
                    <div key={i}>
                        <h4><Link to={'/' + slug} className="text-dark">{task.jiraFields.summary}</Link></h4>
                        <p>Posted by {task.jiraFields.assignee.displayName} on {Moment(task.jiraFields.customfield_10905).format('MMMM Do, YYYY')}</p>
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