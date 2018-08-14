import React from "react";

class PercentCompleteBar extends React.Component {
    render() {
        const subTasks = this.props.subTasks;
        const closedCount = subTasks.filter(task => task.jiraFields.status.name == "Closed").length;
        const percentComplete = (closedCount/subTasks.length) * 100;

        if (subTasks.length > 0) {
            return (
                <span style={{ width: 100 + '%' }}>
                    <span>
                        <div className="progress-bar bg-success mt-1" role="progressbar" style={{ width: percentComplete + '%', height: 0.5 + 'em' }} aria-valuenow="50%" aria-valuemin="0" aria-valuemax="100"></div>
                    </span>
                </span>
            );
        } else {
            return (null);
        }
    }
}

export default PercentCompleteBar;