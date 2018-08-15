import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

function ListItem(props) {
  const { task } = props;
  return (
    <div className="pt-2">
      <div><Link to={`/${task.slug}`} className="text-secondary h5">{task.jiraIssue.jiraFields.summary}</Link></div>
      <div>{`By ${task.jiraIssue.jiraFields.customfield_10100}`}</div>
    </div>
  );
}

ListItem.propTypes = {
  task: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function HeaderGroup(props) {
  const { header } = props;
  const { tasks } = props;
  const listItems = tasks.map(t => <ListItem key={t.slug} task={t} />);
  return (
    <div>
      <div className="text-dark h2">{header}</div>
      {listItems}
    </div>
  );
}

HeaderGroup.propTypes = {
  header: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function ReadingPage({ data }) {
  const { edges: tasks } = data.reading;
  const headers = [
    { name: 'In Progress', label: 'Currently Reading' },
    { name: 'Closed', label: 'Have Read' },
    { name: 'Open', label: 'Want to Read' }];

  const taskList = Array.from(tasks.map(t => t.node));
  const section = headers.map(header => (
    <div key={header.label}>
      <HeaderGroup
        header={header.label}
        tasks={taskList.filter(t => t.jiraIssue.jiraFields.status.name === header.name)}
      />
    </div>));

  return (
    <div>
      <div className="h2 text-dark">Reading List</div>
      {section}
    </div>
  );
}

ReadingPage.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};


export const query = graphql`
    query ReadingQuery {
        reading: allJiraIssue(filter: {type: {eq: "Reading"}, project: {eq: "Education"}}) {
            edges {
                node {
                slug
                jiraIssue {
                    id
                    jiraFields {
                    summary
                    status {
                        name
                    }
                    customfield_10100
                    priority {
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
