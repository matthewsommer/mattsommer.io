import React from "react";
import styled from 'styled-components';

const Img = styled.img`
    margin-right: 5px;
`;

class StatusShield extends React.Component {
    render() {
        if (this.props.status != null) {
            if (this.props.status === "In Progress") {
                return (
                    <Img src='https://img.shields.io/badge/Status-In--Progress-blue.svg'></Img>
                );
            } else if (this.props.status === "Open") {
                return (
                    <Img src='https://img.shields.io/badge/Status-To--Do-red.svg'></Img>
                );
            } else if (this.props.status === "Closed") {
                return (
                    <Img src='https://img.shields.io/badge/Status-Closed-brightgreen.svg'></Img>
                );
            }
            return (
                <div>
                    <Img src='https://img.shields.io/badge/Priority-Highest-red.svg'></Img>
                    <Img src='https://img.shields.io/badge/Priority-High-orange.svg'></Img>
                    <Img src='https://img.shields.io/badge/Priority-Medium-blue.svg'></Img>
                    <Img src='https://img.shields.io/badge/Priority-Medium-blue.svg'></Img>
                    <Img src='https://img.shields.io/badge/Priority-Medium-lightgrey.svg'></Img>
                    <Img src='https://img.shields.io/badge/Progress-50%25-brightgreen.svg'></Img>
                </div>
            );
        } else {
            return (null);
        }
    }
}

export default StatusShield;