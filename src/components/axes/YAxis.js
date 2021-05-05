import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const YAxis = ({
  className,
  labelClassName,
  label,
  scale,
  xTransform,
  yTransform,
}) => {
  const axisRef = useRef(null);

  useEffect(() => {
    d3.select(axisRef.current).call(d3.axisLeft(scale).ticks(5));
  }, [scale]);

  return (
    <g
      ref={axisRef}
      transform={`translate(${xTransform}, ${yTransform})`}
      className={className}
    >
      <text x="0" y="-30" className={labelClassName}>
        {label}
      </text>
    </g>
  );
};

YAxis.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string,
  scale: PropTypes.func,
  xTransform: PropTypes.number,
  yTransform: PropTypes.number,
};

export default YAxis;
