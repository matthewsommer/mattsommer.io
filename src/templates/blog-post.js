import React from "react"
import Disqus from 'disqus-react'
import Moment from 'moment'
import CustomShield from '../components/custom-shield/custom-shield'
import TaskComponentsList from "../components/task-component-list"
import RelatedTasks from '../components/related-tasks/related-tasks'

export default ({ data }) => {
    const task = data.jiraIssue.jiraIssue;

    const disqusShortname = data.jiraIssue.slug.replace("/","-");

    const disqusConfig = {
        url: 'https://mattsommer.io/' + data.jiraIssue.slug,
        identifier: disqusShortname,
        title: task.jiraFields.summary,
    };

    return (
        <div>
            <div className="text-secondary">
                {task.jiraFields.issuetype.name}
            </div>
            <h1 className="mt-0 mb-0">{task.jiraFields.summary}</h1>
            <CustomShield subject="Author" status={task.jiraFields.assignee.displayName} color="blue"/>
            <CustomShield subject="Published" status={Moment(task.jiraFields.customfield_10905).format('MMMM Do, YYYY')} color="blue"/>
            <RelatedTasks taskLinks={task.jiraFields.issuelinks} />
            <TaskComponentsList components={task.jiraFields.components}/>
            <hr className="mb-2 mt-2"/>
            <div>
                <div dangerouslySetInnerHTML={{ __html: task.renderedFields.description}} />
            </div>
            <h2>{task.jiraFields.assignee.displayName}</h2>
            <hr/>
            <Disqus.DiscussionEmbed shortname={'mattsommer-io'} config={disqusConfig} />
        </div>
    );
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