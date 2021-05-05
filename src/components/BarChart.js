import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as d3 from 'd3';
import { AnnotationBracket } from 'react-annotation';
import { useChartDimensions } from '../hooks/useChartDimensions';
import Bar from './Bar';
import XAxisNoLabel from './axes/XAxisNoLabel';
import YAxis from './axes/YAxis';
import Tooltip from './Tooltip';

const chartSettings = {
  marginTop: 50,
  marginRight: 30,
  marginBottom: 50,
  marginLeft: 30,
};

const bracketColor = '#333333';

const BarChart = ({ data, selectedPointRange }) => {
  const [ref, dms] = useChartDimensions(chartSettings);
  dms.height = 0.6 * dms.width;
  dms.boundedHeight = dms.height - dms.marginTop - dms.marginBottom;

  const [hoveredBar, setHoveredBar] = useState(null);

  const xScale = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(data.map((d) => d.gameNumber))
        .rangeRound([0, dms.boundedWidth])
        .padding(0.05),
    [data, dms.boundedWidth],
  );

  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => +d.pointsScoredByGSW)])
        .nice()
        .rangeRound([dms.boundedHeight, 0]),
    [data, dms.boundedHeight],
  );

  const gameBracketWidth = xScale(2) - xScale(1);

  const dataToBeShown = selectedPointRange
    ? _.filter(
        data,
        (d) =>
          d.pointsScoredByCurry >= selectedPointRange[0] &&
          d.pointsScoredByCurry <= selectedPointRange[1],
      )
    : data;

  return (
    <div className="barChart" ref={ref}>
      <svg className="chart" width={dms.width} height={dms.height}>
        {dms.boundedHeight > 0 && dms.boundedWidth > 0 ? (
          <g
            transform={`translate(${[dms.marginLeft, dms.marginTop].join(
              ',',
            )})`}
          >
            {dataToBeShown.map((d) => {
              const height = dms.boundedHeight - yScale(d.pointsScoredByGSW);
              return (
                <Bar
                  key={d.gameNumber}
                  className={d.win ? 'barChart__gameWon' : 'barChart__gameLost'}
                  x={xScale(d.gameNumber)}
                  y={yScale(d.pointsScoredByGSW)}
                  width={xScale.bandwidth()}
                  height={height > 0 ? height : 0}
                  onMouseEnter={() => {
                    setHoveredBar(d);
                  }}
                  onMouseLeave={() => {
                    setHoveredBar(null);
                  }}
                />
              );
            })}
            <XAxisNoLabel
              className="barChart__xAxis"
              scale={xScale}
              xTransform={0}
              yTransform={dms.boundedHeight}
            />
            <YAxis
              className="barChart__yAxis"
              labelClassName="barChart__yAxisLabel"
              label="points scored by GSW"
              scale={yScale}
              xTransform={0}
              yTransform={0}
            />
            <AnnotationBracket
              x={xScale(1)}
              y={dms.boundedHeight}
              color={bracketColor}
              note={{
                label: 'Clippers',
                lineType: null,
                align: 'middle',
                padding: 0,
              }}
              connector={{ type: 'elbow', end: null }}
              subject={{ width: gameBracketWidth * 6, type: 'square' }}
            />
            <AnnotationBracket
              x={xScale(7)}
              y={dms.boundedHeight}
              color={bracketColor}
              note={{
                label: 'Rockets',
                lineType: null,
                align: 'middle',
                padding: 0,
              }}
              connector={{ type: 'elbow', end: null }}
              subject={{ width: gameBracketWidth * 6, type: 'square' }}
            />
            <AnnotationBracket
              x={xScale(13)}
              y={dms.boundedHeight}
              color={bracketColor}
              note={{
                label: 'Blazers',
                lineType: null,
                align: 'middle',
                padding: 0,
              }}
              connector={{ type: 'elbow', end: null }}
              subject={{ width: gameBracketWidth * 4, type: 'square' }}
            />
            <AnnotationBracket
              x={xScale(17)}
              y={dms.boundedHeight}
              color={bracketColor}
              note={{
                label: 'Raptors',
                lineType: null,
                align: 'middle',
                padding: 0,
              }}
              connector={{ type: 'elbow', end: null }}
              subject={{ width: gameBracketWidth * 6, type: 'square' }}
            />
          </g>
        ) : null}
      </svg>
      {hoveredBar ? (
        <Tooltip
          series={hoveredBar.series}
          seriesGameNumber={hoveredBar.seriesGameNumber}
          date={hoveredBar.date}
          venue={hoveredBar.venue}
          opponent={hoveredBar.opponent}
          win={hoveredBar.win}
          pointsScoredByGSW={hoveredBar.pointsScoredByGSW}
          pointsScoredByOpponent={hoveredBar.pointsScoredByOpponent}
          pointsScoredByCurry={hoveredBar.pointsScoredByCurry}
          gameNumber={hoveredBar.gameNumber}
          xScale={xScale}
          yScale={yScale}
          marginLeft={dms.marginLeft}
          marginTop={dms.marginTop}
        />
      ) : null}
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.array,
  selectedPointRange: PropTypes.array,
};

export default BarChart;
