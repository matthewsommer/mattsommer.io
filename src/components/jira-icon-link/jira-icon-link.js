import React from "react";
import styled from 'styled-components';
import Link from 'gatsby-link'

const Img = styled.img`
    margin-right: 5px;
    margin-bottom: 0px;
`;

function importAll(r) {
    return r.keys().map(r);
}

const icons = importAll(require.context('/', false, /\.(png|jpe?g|svg)$/));

class JiraIconLink extends React.Component {
    render() {
        const key = this.props.taskKey
        if (key != null) {
            return <a href={'https://timetopretend.atlassian.net/browse/' + key} target='_blank' className="text-muted">⌗ </a>
        } else {
            return (null)
        }
    }
}

export default JiraIconLink;