import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const XAxisNoLabel = ({ className, scale, xTransform, yTransform }) => {
  const axisRef = useRef(null);

  useEffect(() => {
    d3.select(axisRef.current).call(d3.axisBottom(scale).ticks(0));
  }, [scale]);

  return (
    <g
      ref={axisRef}
      transform={`translate(${xTransform}, ${yTransform})`}
      className={className}
    />
  );
};

XAxisNoLabel.propTypes = {
  className: PropTypes.string,
  scale: PropTypes.func,
  xTransform: PropTypes.number,
  yTransform: PropTypes.number,
};

export default XAxisNoLabel;
