import React from "react"
import Link from 'gatsby-link'
import StatusIcon from "../components/status-icon/status-icon"

const TasksByField = ({ tasks, title, type = "", field, monoType = 'true' }) => {
    if (tasks.length > 0) {
        const headers = Array.from(new Set(tasks.map(task => task.node.jiraIssue.jiraFields[field] != null ? task.node.jiraIssue.jiraFields[field]["name"] : null).sort()));
        return (
            <div>
                <div className="text-secondary h2">{title}</div>
                {headers.map((project, i) => {
                    return ([
                        <div key={i} className="text-dark h2 mb-0 mt-4">{project} {type}</div>,
                        tasks.map((task, i) => {
                            const taskNode = task.node;
                            if (taskNode.jiraIssue.jiraFields[field] != null && taskNode.jiraIssue.jiraFields[field].name === project) {
                                return (
                                    <div key={i} className='align-top'>
                                        <StatusIcon status={taskNode.jiraIssue.jiraFields.status.name} />
                                        <Link to={'/' + taskNode.slug} className="text-secondary">{monoType === 'false' ? taskNode.jiraIssue.jiraFields.issuetype.name + ' - ' : ''}{taskNode.jiraIssue.jiraFields.summary}</Link>
                                    </div>
                                )
                            }
                        })
                    ])
                })}
            </div>
        );
    } else {
        return (
            <div>
                It's a mystery, for now.
            </div>
        );
    }
}

export default TasksByField;