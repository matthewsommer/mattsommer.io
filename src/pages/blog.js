import React from 'react'
import Link from 'gatsby-link'
import Moment from 'moment';

const BlogPostsPage = (props) => {
    const tasks = props.data.blogpost.edges;
    Moment.locale('en');
    return (
        <div>
            <h2>Blog</h2>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                        <h4><Link to={'/' + taskNode.slug} className="text-dark">{taskNode.jiraIssue.jiraFields.summary}</Link></h4>
                        <p>Posted by {taskNode.jiraIssue.jiraFields.assignee.displayName} on {Moment(taskNode.jiraIssue.jiraFields.customfield_10905).format('MMMM Do, YYYY')}</p>
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