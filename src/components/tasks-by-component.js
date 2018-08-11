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
                <div className="text-secondary h2">{title}</div>
                {headers.map((component, i) => {
                    return ([
                        <h3 key={i} className="text-dark mt-2">{component}</h3>,
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