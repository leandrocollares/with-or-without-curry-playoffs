import React from 'react';
import PropTypes from 'prop-types';

const Bar = ({ className, x, y, width, height, ...otherProps }) => (
  <rect
    className={className}
    x={x}
    y={y}
    width={width}
    height={height}
    {...otherProps}
  />
);

Bar.propTypes = {
  className: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Bar;
