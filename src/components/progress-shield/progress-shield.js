import React from "react";
import styled from 'styled-components';

const Img = styled.img`
    margin-right: 5px;
    margin-bottom: 0px;
`;

function importAll(r) {
    return r.keys().map(r);
}

const icons = importAll(require.context('/', false, /\.(png|jpe?g|svg)$/));

class ProgressShield extends React.Component {
    render() {
        const subTasks = this.props.subTasks;
        const parentTask = this.props.parentTask;
        const closedCount = subTasks.filter(task => task.jiraFields.status.name == "Closed").length;
        const percentComplete = (closedCount/subTasks.length).toFixed(2) * 100;
        
        if(parentTask.jiraFields.status.name === 'Closed') {
            return (<Img src={'https://Img.shields.io/badge/Progress-100%25-brightgreen.svg'}></Img>);
        }
        if (percentComplete != null && percentComplete >= 0 && percentComplete <= 100) {
            return (<Img src={'https://Img.shields.io/badge/Progress-' + percentComplete + '%25-brightgreen.svg'}></Img>);
        } else {
            return (<Img src={'https://Img.shields.io/badge/Progress-0%25-brightgreen.svg'}></Img>);
        }
    }
}

export default ProgressShield;