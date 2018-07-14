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
        if (this.props.progress != null) {
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

export default ProgressShield;