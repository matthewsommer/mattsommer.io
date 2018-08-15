import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Moment from 'moment';

export default function BlogPostsPage({ data }) {
  const tasks = data.blogpost.edges;
  return (
    <div>
      <div className="text-dark h2">Blog Posts</div>
      {tasks.map((taskNode, i) => {
        const { slug } = taskNode.node;
        const task = taskNode.node.jiraIssue;
        return (
          <div key={task.id}>
            <h3 className="">
              <Link to={`/${slug}`} className="text-dark">{task.jiraFields.summary}</Link>
            </h3>
            {Moment(task.jiraFields.customfield_10905).format('MMMM Do, YYYY')}
            {i !== (tasks.length - 1) ? <hr /> : ' '}
          </div>
        );
      })}
    </div>
  );
}

BlogPostsPage.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

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
