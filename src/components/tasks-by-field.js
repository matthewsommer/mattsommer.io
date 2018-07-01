import React from "react"
import Link from 'gatsby-link'
import StatusIcon from "../components/status-icon/status-icon"

const TasksByField = ({ tasks, title, field }) => {
    const headers = Array.from(new Set(tasks.map(task => task.node.jiraIssue.jiraFields[field]["name"]).sort()));
    return (
        <div>
            <h2>{title}</h2>
            {headers.map((project, i) => {
                return ([
                    <h3 key={i}>{project}</h3>,
                    tasks.map((task, i) => {
                        const taskNode = task.node;
                        if (taskNode.jiraIssue.jiraFields[field].name === project) {
                            return (
                                <div key={i}>
                                    <StatusIcon status={taskNode.jiraIssue.jiraFields.status.name}/>
                                    <Link to={'/' + taskNode.slug}>{taskNode.jiraIssue.jiraFields.summary}</Link>
                                </div>
                            )
                        }
                    })
                ])
            })}
        </div>
    );
}

export default TasksByField;