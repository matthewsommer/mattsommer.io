import React from 'react';
import PropTypes from 'prop-types';
import TaskBreadCrumb from '../components/task-bread-crumb';
import SubtaskList from '../components/subtask-list';
import TasksByField from '../components/tasks-by-field';
import TaskComponentsList from '../components/task-component-list';
import StatusShield from '../components/status-shield/status-shield';
import PriorityShield from '../components/priority-shield/priority-shield';
import ProgressShield from '../components/progress-shield/progress-shield';
import RelatedTasks from '../components/related-tasks/related-tasks';
import JiraIconLink from '../components/jira-icon-link/jira-icon-link';
import TaskLabels from '../components/task-labels/task-labels';

export default function Task({ data }) {
  const { jiraIssue: task } = data.jiraIssue;
  const { name: projectName } = task.jiraFields.project;
  const { name: typeName } = task.jiraFields.issuetype;
  const { epic } = data;
  const { stories: storyNodes } = data;
  const storyList = storyNodes && Array.from(storyNodes.edges.map(s => s.node.jiraIssue));
  return (
    <div>
      <TaskBreadCrumb projectName={projectName} typeName={typeName} epic={epic} />
      <div className="text-dark mb-0 h3">
        {task.jiraFields.summary}
      </div>
      <div>
        <PriorityShield priority={task.jiraFields.priority.name} />
        <StatusShield status={task.jiraFields.status.name} />
        {task.jiraFields.issuetype.name !== 'Epic' && task.jiraFields.subtasks ? <ProgressShield subTasks={task.jiraFields.subtasks} parentTask={task} /> : ''}
        {task.jiraFields.issuetype.name === 'Epic' && storyList ? <ProgressShield subTasks={storyList} parentTask={task} /> : ''}
      </div>
      <div>
        <JiraIconLink taskKey={task.key} />
        <RelatedTasks taskLinks={task.jiraFields.issuelinks} />
        <TaskLabels labels={task.jiraFields.labels} />
        <TaskComponentsList components={task.jiraFields.components} />
        {task.renderedFields.description !== '' ? <hr className="mt-2 mb-1" /> : ''}
        {/* eslint-disable */}
        {task.renderedFields.description !== '' ? <div dangerouslySetInnerHTML={{ __html: task.renderedFields.description }} className="text-secondary mt-2" /> : ''}
        {/* eslint-enable */}
        <SubtaskList value={task.jiraFields.subtasks} />
        {storyNodes === null ? '' : <TasksByField tasks={storyNodes && storyNodes.edges} type="Stories" field="project" monoType="true" title="" />}
      </div>
    </div>
  );
}

Task.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export const query = graphql`
  query TaskQuery($id: String!, $epicKey: String, $key: String) {
    jiraIssue(id: { eq: $id }) {
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
                components {
                    name
                    description
                }
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

    epic: jiraIssue(key: {eq: $epicKey}) {
        slug
        jiraIssue {
            id
            jiraFields {
                summary
                project {
                    name
                }
            }
        }
    }

    stories: allJiraIssue(filter: {epic: {eq: $key}}) {
        edges {
            node {
                slug
                jiraIssue {
                    id
                    jiraFields {
                        summary
                        status {
                            id
                            name
                        }
                        project {
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
