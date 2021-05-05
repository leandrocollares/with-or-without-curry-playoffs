import React, { useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { useChartDimensions } from '../hooks/useChartDimensions';
import Bar from './Bar';
import XAxis from './axes/XAxis';
import YAxis from './axes/YAxis';

const chartSettings = {
  marginTop: 50,
  marginRight: 30,
  marginBottom: 50,
  marginLeft: 30,
};

const numberOfThresholds = 4;

const Histogram = ({ data, setSelectedPointRange }) => {
  const brushRef = useRef(null);

  const [ref, dms] = useChartDimensions(chartSettings);
  dms.height = 0.55 * dms.width;
  dms.boundedHeight = dms.height - dms.marginTop - dms.marginBottom;

  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.pointsScoredByCurry))
        .range([0, dms.boundedWidth])
        .nice(numberOfThresholds),
    [data, dms.boundedWidth],
  );

  const binGenerator = useMemo(
    () =>
      d3
        .histogram()
        .domain(xScale.domain())
        .thresholds(xScale.ticks(numberOfThresholds))
        .value((d) => d.pointsScoredByCurry),
    [xScale],
  );

  const bins = useMemo(() => binGenerator(data), [data, binGenerator]);

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, d3.max(bins, (d) => d.length)])
        .nice()
        .range([dms.boundedHeight, 0]),
    [bins, dms.boundedHeight],
  );

  const bars = useMemo(
    () =>
      bins.map((d) => ({
        x: xScale(d.x0),
        y: yScale(d.length),
        height: dms.boundedHeight - yScale(d.length),
        width: xScale(d.x1) - xScale(d.x0),
      })),
    [bins, dms.boundedHeight, xScale, yScale],
  );

  const brushed = () => {
    let bounds = null;

    if (d3.event.selection) {
      const [x1, x2] = d3.event.selection;
      bounds = [xScale.invert(x1), xScale.invert(x2)];
      setSelectedPointRange(bounds);
    }
  };

  const brushStarted = () => {
    const [x1, x2] = d3.event.selection;
    if (x1 === x2) {
      setSelectedPointRange(null);
    }
  };

  useEffect(() => {
    if (dms.boundedHeight > 0 && dms.boundedWidth > 0) {
      const brush = d3
        .brushX()
        .extent([
          [0, 0],
          [dms.boundedWidth, dms.boundedHeight],
        ])
        .on('start', brushStarted)
        .on('brush', brushed);

      d3.select(brushRef.current).call(brush);
    }
  }, [brushRef, dms.boundedWidth, dms.boundedHeight]);

  return (
    <div className="histogram" ref={ref}>
      <svg className="chart" width={dms.width} height={dms.height}>
        <g
          transform={`translate(${[dms.marginLeft, dms.marginTop].join(',')})`}
        >
          {dms.boundedHeight > 0 && dms.boundedWidth > 0
            ? bars.map((d) => (
                <Bar
                  key={d.x}
                  className="histogram__rect"
                  x={d.x}
                  y={d.y}
                  width={d.width}
                  height={d.height}
                />
              ))
            : null}
          <XAxis
            className="histogram__xAxis"
            labelClassName="histogram__xAxisLabel"
            label="points scored by Curry"
            scale={xScale}
            xTransform={0}
            yTransform={dms.boundedHeight}
          />
          <YAxis
            className="histogram__yAxis"
            labelClassName="histogram__yAxisLabel"
            label="number of games"
            xTransform={0}
            yTransform={0}
            scale={yScale}
          />
          <g ref={brushRef} className="brush" />
        </g>
      </svg>
    </div>
  );
};

Histogram.propTypes = {
  data: PropTypes.array,
  setSelectedPointRange: PropTypes.func,
};

export default Histogram;
