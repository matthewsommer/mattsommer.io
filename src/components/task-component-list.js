import React from "react";

class TaskComponentsList extends React.Component {
    render() {
        if (this.props.components != null && this.props.components.length > 0) {
            return (
                <div className="mt-2">
                    <span className="text-secondary">Links: </span>
                    {this.props.components.map((component, i) => {
                        return (
                            <span>
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