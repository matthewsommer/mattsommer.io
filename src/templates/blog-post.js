import React from "react";
import Disqus from 'disqus-react';

export default ({ data }) => {
    const task = data.jiraIssue.jiraIssue;

    const disqusShortname = data.jiraIssue.slug.replace("/","-");

    const disqusConfig = {
        url: 'https://mattsommer.io/',
        identifier: disqusShortname,
        title: task.jiraFields.summary,
    };

    return (
        <div>
            <h1 style={{ marginBottom: 10 }}>{task.jiraFields.summary}</h1>
            <div>
                <div dangerouslySetInnerHTML={{ __html: task.renderedFields.description}} />
            </div>
            <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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