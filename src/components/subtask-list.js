import React from "react"
import StatusIcon from "../components/status-icon/status-icon"

class SubtaskList extends React.Component {
    render() {
        if (this.props.value.length > 0) {
            return (
                <div>
                    <h3 className="text-dark">Tasks</h3>
                    {this.props.value.map((task, i) => {
                        return ([
                            <div key={i}><StatusIcon status={task.jiraFields.status.name} />{task.jiraFields.summary}</div>
                        ]);
                    })}
                </div>
            );
        } else {
            return (null);
        }
    }
}

export default SubtaskList;