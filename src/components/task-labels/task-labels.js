import React from "react";

class TaskLabels extends React.Component {
    render() {
        const labels = this.props.labels
        if (labels != null && labels.length > 0) {
            return (
                <span className="mt-0 text-secondary">
                    {labels.map((label, i) => {
                        return (
                            <span key={i}>{label}{i != (labels.length - 1) ? ', ' : ' '}</span>
                        );
                    })}
                </span>
            );
        } else {
            return (<span></span>);
        }
    }
}

export default TaskLabels;