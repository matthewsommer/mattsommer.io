import React from "react";
import styled from 'styled-components';

const Img = styled.img`
    margin-right: 5px;
    margin-bottom: 0px;
`;

class CustomShield extends React.Component {
    render() {
        const subject = this.props.subject;
        const status = this.props.status;
        const color = this.props.color;
        const imgSrc = 'https://img.shields.io/badge/' + subject + '-' + status + '-' + color + '.svg';

        if(subject != null && status != null && status != "Invalid date") {
            return (<Img src={imgSrc}></Img>);
        } else {
            return (null);
        }
    }
}

export default CustomShield;