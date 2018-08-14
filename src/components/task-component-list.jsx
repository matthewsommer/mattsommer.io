import React from 'react';
import PropTypes from 'prop-types';

export default function TaskComponentsList({ components }) {
  return (
    <div className="mt-1">
      {components.map((component, i) => (
        <span key={component.name}>
          <a href={component.description} key={component.name} target="_blank" rel="noopener noreferrer" className="text-secondary">{component.name}</a>
          {i !== (components.length - 1) ? ', ' : ' '}
        </span>))}
    </div>
  );
}

TaskComponentsList.propTypes = {
  components:
    PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
};
