import React from "react"
import SubtaskList from "../components/subtask-list"
import TasksByField from "../components/tasks-by-field"
import TaskComponentsList from "../components/task-component-list"
import StatusShield from "../components/status-shield/status-shield"
import PriorityShield from "../components/priority-shield/priority-shield"
import ProgressShield from "../components/progress-shield/progress-shield"
import PercentCompleteBar from "../components/percent-complete-bar/percent-complete-bar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import RelatedTasks from '../components/related-tasks/related-tasks'

export default ({ data }) => {
    const task = data.jiraIssue.jiraIssue;
    const epic = data.epic;
    var stories = [];
    var storyList = [];
    if (data.stories != null) {
        stories = data.stories.edges;
        storyList = Array.from(data.stories.edges.map(task => task.node.jiraIssue));
    }
    return (
        <div>
            <div className="text-secondary">
                {task.jiraFields.project.name + " " + task.jiraFields.issuetype.name}
                {epic != null ? <span><span className=""> for {epic.jiraIssue.jiraFields.project.name} Epic </span><a href={'../' + data.epic.slug} className="text-secondary">{epic.jiraIssue.jiraFields.summary}</a></span> : ""}
            </div>
            <h2 className="text-dark">{task.jiraFields.summary}</h2>
            <div>
                <PriorityShield priority={task.jiraFields.priority.name}/>
                <StatusShield status={task.jiraFields.status.name}/>
                {task.jiraFields.issuetype.name != 'Epic' ? <ProgressShield subTasks={task.jiraFields.subtasks} parentTask={task}/> : ""}
                {task.jiraFields.issuetype.name === 'Epic' ? <ProgressShield subTasks={storyList} parentTask={task}/> : ""}
                <a href={'https://timetopretend.atlassian.net/browse/' + task.key} target='_blank' className="text-muted"><FontAwesomeIcon icon={faDatabase} className="align-middle" /></a>
                {/* <PercentCompleteBar subTasks={storyList}/> */}
                {/* <PercentCompleteBar subTasks={task.jiraFields.subtasks}/> */}
                <RelatedTasks taskLinks={task.jiraFields.issuelinks} />
                <TaskComponentsList components={task.jiraFields.components}/>
                <div dangerouslySetInnerHTML={{ __html: task.renderedFields.description}} className="text-secondary mt-2" />
                <ul>
                    {/* <li><b>Components:</b> {task.components.map((component, i) => { return (<a href={component.description} target='_blank' key={i}>{component.name}, </a>) })}</li> */}
                    {/* <li><b>Labels:</b> {task.labels.map((label, i) => { return label + " " })}</li> */}
                </ul>
                <SubtaskList value={task.jiraFields.subtasks} />
                <TasksByField tasks={stories} type="Stories" field="project" monoType="true"/>
            </div>
        </div>
    );
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