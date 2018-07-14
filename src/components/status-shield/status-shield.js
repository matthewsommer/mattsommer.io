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

class StatusShield extends React.Component {
    render() {
        if (this.props.status != null) {
            if (this.props.status === "Open") {
                return <Img src={icons[0]} alt="Open" />;
            } else if (this.props.status === "In Progress") {
                return <Img src={icons[1]} alt="In Progress" />;
            } else if (this.props.status === "Closed") {
                return <Img src={icons[2]} alt="Closed" />;
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