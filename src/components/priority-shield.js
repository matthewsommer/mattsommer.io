import React from "react";
import styled from 'styled-components';

const Img = styled.img`
    margin-right: 5px;
`;

class PriorityShield extends React.Component {
    render() {
        if (this.props.priority != null) {
            if (this.props.priority === "P1-Highest") {
                return (
                    <Img src='https://Img.shields.io/badge/Priority-Highest-red.svg'></Img>
                );
            } else if (this.props.priority === "P2-High") {
                return (
                    <Img src='https://Img.shields.io/badge/Priority-High-orange.svg'></Img>
                );
            } else if (this.props.priority === "P3-Medium") {
                return (
                    <Img src='https://Img.shields.io/badge/Priority-Medium-blue.svg'></Img>
                );
            } else if (this.props.priority === "P3-Medium") {
                return (
                    <Img src='https://Img.shields.io/badge/Priority-Medium-blue.svg'></Img>
                );
            } else if (this.props.priority === "P4-Low") {
                return (
                    <Img src='https://Img.shields.io/badge/Priority-Low-blue.svg'></Img>
                );
            } else if (this.props.priority === "P5-Undefined") {
                return (
                    <Img src='https://Img.shields.io/badge/Priority-Medium-lightgrey.svg'></Img>
                );
            }
            return (
                <div>
                    <Img src='https://Img.shields.io/badge/Progress-50%25-brightgreen.svg'></Img>
                </div>
            );
        } else {
            return (null);
        }
    }
}

export default PriorityShield;