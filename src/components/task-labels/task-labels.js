import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons'

class TaskLabels extends React.Component {
    render() {
        const labels = this.props.labels
        if (labels != null && labels.length > 0) {
            return (
                <span className="mt-0 text-secondary">
                    <FontAwesomeIcon icon={faTags} className="pr-1 pt-1 text-muted" />
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