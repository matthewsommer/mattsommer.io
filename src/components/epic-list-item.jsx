import React from "react";
import Link from 'gatsby-link'

class Epic extends React.Component {
    render() {
        if (this.props.value != null) {
            return (
                <Link to={this.props.value.id}>{this.props.value.summary}</Link>
            );
        } else {
            return (null);
        }
    }
}

export default Epic;