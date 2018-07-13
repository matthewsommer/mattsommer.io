import React from 'react'
import Link from 'gatsby-link'
import Moment from 'moment';

const BlogPostsPage = (props) => {
    const tasks = props.data.blogpost.edges;
    Moment.locale('en');
    return (
        <div>
            <h2>Blog Posts</h2>
            {tasks.map((task, i) => {
                const taskNode = task.node;
                return (
                    <div key={i}>
                        <h4><Link to={'/' + taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link></h4>
                        <p>By {taskNode.jiraIssue.jiraFields.assignee.displayName} - {Moment(taskNode.jiraIssue.jiraFields.updated).format('MMMM Do, YYYY')}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default BlogPostsPage

export const query = graphql`
    query BlogPostsQuery {
        blogpost: allJiraIssue(filter: {type: {eq: "Blog Post"}}) {
            edges {
                node {
                    slug
                    jiraIssue {
                        id
                        jiraFields {
                            summary
                            updated
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