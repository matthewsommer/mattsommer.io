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

class PriorityShield extends React.Component {
    render() {
        if (this.props.priority != null) {
            if (this.props.priority === "P1-Highest") {
                return <Img src={icons[0]} alt="P1-Highest Priority" />;
            } else if (this.props.priority === "P2-High") {
                return <Img src={icons[1]} alt="P2-High" />;
            } else if (this.props.priority === "P3-Medium") {
                return <Img src={icons[2]} alt="P3-Medium" />;
            } else if (this.props.priority === "P4-Low") {
                return <Img src={icons[3]} alt="P4-Low" />;
            } else if (this.props.priority === "P5-Undefined") {
                return <Img src={icons[4]} alt="P5-Undefined" />;
            }
        } else {
            return (null);
        }
    }
}

export default PriorityShield;