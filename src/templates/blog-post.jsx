import React from 'react';
import PropTypes from 'prop-types';
import Disqus from 'disqus-react';
import Moment from 'moment';
import CustomShield from '../components/custom-shield/custom-shield';
import TaskComponentsList from '../components/task-component-list';
import RelatedTasks from '../components/related-tasks/related-tasks';
import JiraIconLink from '../components/jira-icon-link/jira-icon-link';
import TaskLabels from '../components/task-labels/task-labels';
import StatusShield from '../components/status-shield/status-shield';

function Signature(displayName) {
  return (
    <div>
      <p>Much Love!</p>
      <h2>
        {displayName}
      </h2>
    </div>
  );
}

export default function BlogPost({ data }) {
  const { jiraIssue: task } = data.jiraIssue;
  const disqusShortname = data.jiraIssue.slug.replace('/', '-');
  const disqusConfig = {
    url: `https://mattsommer.io/${data.jiraIssue.slug}`,
    identifier: disqusShortname,
    title: task.jiraFields.summary,
  };

  return (
    <div>
      <div className="text-secondary">
        {task.jiraFields.issuetype.name}
      </div>
      <h1 className="mt-0 mb-0">{task.jiraFields.summary}</h1>
      <CustomShield
        subject="Author"
        status={task.jiraFields.assignee.displayName}
        color="blue"
      />
      <CustomShield
        subject="Published"
        status={Moment(task.jiraFields.customfield_10905).format('MMMM Do, YYYY')}
        color="blue"
      />
      {task.jiraFields.status.name !== 'Closed'
        ? <StatusShield status={task.jiraFields.status.name} /> : ''}
      <JiraIconLink taskKey={task.key} />
      <TaskLabels labels={task.jiraFields.labels} />
      <RelatedTasks taskLinks={task.jiraFields.issuelinks} />
      <TaskComponentsList components={task.jiraFields.components} />
      <hr className="mb-2 mt-2" />
      <div>
        {/* eslint-disable */}
        <div dangerouslySetInnerHTML={{ __html: task.renderedFields.description }} />
        {/* eslint-enable */}
      </div>
      {task.jiraFields.status.name === 'Closed' ? Signature(task.jiraFields.assignee.displayName) : ''}
      <Disqus.DiscussionEmbed shortname="mattsommer-io" config={disqusConfig} />
    </div>
  );
}

BlogPost.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const query = graphql`
  query BlogPostQuery($id: String!) {
    jiraIssue(id: { eq: $id }) {
        slug
        jiraIssue {
            id
            key
            renderedFields {
                description
            }
            jiraFields {
                summary
                description
                labels
                issuetype {
                    name
                }
                project {
                    name
                }
                priority {
                    name
                }
                status {
                    name
                }
                issuetype {
                    name
                }
                components {
                    name
                    description
                }
                customfield_10905
                issuelinks {
                    id
                    inwardIssue {
                        id
                        key
                        jiraFields {
                            summary
                            issuetype {
                                name
                            }
                        }
                    }
                    outwardIssue {
                        id
                        key
                        jiraFields {
                            summary
                            issuetype {
                                name
                            }
                        }
                    }
                }
                assignee {
                    displayName
                }
                subtasks {
                    id
                    jiraFields {
                        summary
                        status {
                            name
                        }
                    }
                }
            }
        }
    }
  }
`;
