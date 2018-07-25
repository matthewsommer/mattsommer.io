import React from "react"
import Link from 'gatsby-link'
import StatusIcon from "../components/status-icon/status-icon"

const TasksByField = ({ tasks, title, type = "", field, monoType = 'true' }) => {
    if (tasks.length > 0) {
        const headers = Array.from(new Set(tasks.map(task => task.node.jiraIssue.jiraFields[field] != null ? task.node.jiraIssue.jiraFields[field]["name"] : null).sort()));
        return (
            <div>
                <div className="text-secondary">{title}</div>
                {headers.map((project, i) => {
                    return ([
                        <h5 key={i} className="text-dark mt-1 mb-1">{project} {type}</h5>,
                        tasks.map((task, i) => {
                            const taskNode = task.node;
                            if (taskNode.jiraIssue.jiraFields[field] != null && taskNode.jiraIssue.jiraFields[field].name === project) {
                                return (
                                    <div key={i}>
                                        <StatusIcon status={taskNode.jiraIssue.jiraFields.status.name} />
                                        <Link to={'/' + taskNode.slug} className="text-dark">{monoType === 'false' ? taskNode.jiraIssue.jiraFields.issuetype.name + ' - ' : ' '}  {taskNode.jiraIssue.jiraFields.summary}</Link>
                                    </div>
                                )
                            }
                        })
                    ])
                })}
            </div>
        );
    } else {
        return (null);
    }
}

export default TasksByField;