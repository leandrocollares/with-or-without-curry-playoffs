import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

const XAxis = ({
  className,
  labelClassName,
  label,
  scale,
  xTransform,
  yTransform,
}) => {
  const axisRef = useRef(null);

  useEffect(() => {
    d3.select(axisRef.current).call(d3.axisBottom(scale));
  }, [scale]);

  return (
    <g
      ref={axisRef}
      transform={`translate(${xTransform}, ${yTransform})`}
      className={className}
    >
      <text x={scale.range()[1] / 2} y="45" className={labelClassName}>
        {label}
      </text>
    </g>
  );
};

XAxis.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string,
  scale: PropTypes.func,
  xTransform: PropTypes.number,
  yTransform: PropTypes.number,
};

export default XAxis;
