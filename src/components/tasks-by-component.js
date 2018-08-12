import React from "react"
import Link from 'gatsby-link'
import StatusIcon from "../components/status-icon/status-icon"

const TasksByComponent = ({ tasks, title, field, monoType = 'true' }) => {
    if (tasks.length > 0) {
        const tasksWithComponent = tasks.filter(task => task.node.jiraIssue.jiraFields[field] != null && task.node.jiraIssue.jiraFields.components.length > 0);
        const componentsArray = Array.from(new Set(tasksWithComponent.map(task => task.node.jiraIssue.jiraFields[field])));
        var merged = [].concat.apply([], componentsArray);
        const headers = Array.from(new Set(merged.map(item => item.name))).sort();
        return (
            <div>
                <div className="text-dark h2">{title}</div>
                {headers.map((component, i) => {
                    return ([
                        <div key={i} className="text-dark h2 mb-0 mt-4">{component}</div>,
                        tasksWithComponent.map((task, i) => {
                            const taskNode = task.node;
                            if (taskNode.jiraIssue.jiraFields[field].findIndex(task => task.name === component) != -1) {
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
        return (<div />);
    }
}

export default TasksByComponent;