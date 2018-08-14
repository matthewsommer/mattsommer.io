import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Img = styled.img`
    margin-right: 5px;
    margin-bottom: 0px;
`;

function importAll(r) {
  return r.keys().map(r);
}

const icons = importAll(require.context('/', false, /\.(png|jpe?g|svg)$/));

export default function StatusShield({ status }) {
  if (status === 'Open') {
    return <Img src={icons[0]} alt="Open" />;
  }
  if (status === 'In Progress') {
    return <Img src={icons[1]} alt="In Progress" />;
  }
  if (status === 'Closed') {
    return <Img src={icons[2]} alt="Closed" />;
  }
  return (
    <div>
      <Img src="https://img.shields.io/badge/Priority-Highest-red.svg" />
      <Img src="https://img.shields.io/badge/Priority-High-orange.svg" />
      <Img src="https://img.shields.io/badge/Priority-Medium-blue.svg" />
      <Img src="https://img.shields.io/badge/Priority-Medium-blue.svg" />
      <Img src="https://img.shields.io/badge/Priority-Medium-lightgrey.svg" />
      <Img src="https://img.shields.io/badge/Progress-50%25-brightgreen.svg" />
    </div>
  );
}

StatusShield.propTypes = {
  status: PropTypes.string.isRequired,
};
