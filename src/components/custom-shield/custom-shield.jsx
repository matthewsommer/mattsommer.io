import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Img = styled.img`
    margin-right: 5px;
    margin-bottom: 0px;
`;

export default function CustomShield({ subject, status, color }) {
  const imgSrc = `https://img.shields.io/badge/${subject}-${status}-${color}.svg`;

  if (subject !== null && status !== null && status !== 'Invalid date') {
    return <Img src={imgSrc} />;
  }
  return (null);
}

CustomShield.propTypes = {
  subject: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
