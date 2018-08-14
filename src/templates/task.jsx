import React from 'react';
import PropTypes from 'prop-types';
import ProjectTypeEpic from '../components/project-type-epic';
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
  const { epic } = data;
  return (
    <div>
      <ProjectTypeEpic project={task.jiraFields.project.name} type={task.jiraFields.issuetype.name} epic={epic && epic.jiraIssue.jiraFields.summary} />
      <div className="text-dark mb-0 h3">{task.jiraFields.summary}</div>
    </div>
  );
  // const { task } = data.data.jiraIssue.jiraIssue;
  // const { epic } = data.data && data.data.epic;
  // let stories = [];
  // let storyList = [];
  // if (data.stories != null) {
  //   stories = data.stories.edges;
  //   storyList = Array.from(data.stories.edges.map(t => t.node.jiraIssue));
  // }
  // return (
  //   <div>
  //     <div className="text-secondary">
  //       {`${task.jiraFields.project.name} ${task.jiraFields.issuetype.name}`}
  //       {epic != null
  //         ? <span>
  //           <span> for
  //               {epic.jiraIssue.jiraFields.project.name}
  //             Epic
  //             </span>
  //           <a href={`/${data.epic.slug}`} className="text-secondary">
  //             {epic.jiraIssue.jiraFields.summary}
  //           </a></span> : ''}
  //     </div>
  //     <h2 className="text-dark mb-0">{task.jiraFields.summary}</h2>
  //     <div>
  //       <PriorityShield priority={task.jiraFields.priority.name} />
  //       <StatusShield status={task.jiraFields.status.name} />
  //       {task.jiraFields.issuetype.name !== 'Epic' ? <ProgressShield subTasks={task.jiraFields.subtasks} parentTask={task} /> : ''}
  //       {task.jiraFields.issuetype.name === 'Epic' ? <ProgressShield subTasks={storyList} parentTask={task} /> : ''}
  //     </div>
  //     <div>
  //       <JiraIconLink taskKey={task.key} />
  //       <RelatedTasks taskLinks={task.jiraFields.issuelinks} />
  //       <TaskLabels labels={task.jiraFields.labels} />
  //       <TaskComponentsList components={task.jiraFields.components} />
  //       {task.renderedFields.description !== '' ? <hr className="mt-2 mb-1" /> : ''}
  //       {task.renderedFields.description !== '' ? <div dangerouslySetInnerHTML={{ __html: task.renderedFields.description }} className="text-secondary mt-2" /> : ''}
  //       <SubtaskList value={task.jiraFields.subtasks} />
  //       <TasksByField tasks={stories} type="Stories" field="project" monoType="true" title="" />
  //     </div>
  //   </div>
  // );
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
