import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'

class TaskComponentsList extends React.Component {
    render() {
        if (this.props.components != null && this.props.components.length > 0) {
            return (
                <div className="mt-1">
                    <span className="text-secondary"><FontAwesomeIcon icon={faLink} className="align-middle pb-1" /></span>
                    {this.props.components.map((component, i) => {
                        return (
                            <span key={i}>
                                <a href={component.description} key={i} target="_blank" className="text-secondary">{component.name}</a>{i != (this.props.components.length - 1) ? ', ' : ' '}
                            </span>
                        );
                    })}
                </div>
            );
        } else {
            return (<span></span>);
        }
    }
}

export default TaskComponentsList;