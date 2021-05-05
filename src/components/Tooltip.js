import React from 'react';
import PropTypes from 'prop-types';
import XYPopper from './XYPopper';

const Tooltip = ({
  series,
  seriesGameNumber,
  date,
  venue,
  opponent,
  win,
  pointsScoredByGSW,
  pointsScoredByOpponent,
  pointsScoredByCurry,
  gameNumber,
  xScale,
  yScale,
  marginLeft,
  marginTop,
}) => {
  const x = xScale(gameNumber) + xScale.bandwidth() / 2 + 2 * marginLeft;

  const y = yScale(pointsScoredByGSW) + marginTop;

  const opponentName = opponent.substr(opponent.indexOf(' ') + 1);

  const homeTeam = opponent.substr(0, opponent.indexOf(' ')) !== '@';

  return (
    <XYPopper x={x} y={y}>
      <div className="tooltip">
        <div className="tooltip__seriesInfo">{`${series} | Game ${seriesGameNumber}`}</div>
        <div className="tooltip__gameInfo">{`${date} | ${venue}`}</div>
        <div className="tooltip__grid">
          {homeTeam ? (
            <>
              <span>{opponentName}</span>
              <span>{pointsScoredByOpponent}</span>
              <span>Golden State Warriors</span>
              <span
                className={
                  win ? 'tooltip__grid__gameWon' : 'tooltip__grid__gameLost'
                }
              >
                {pointsScoredByGSW}
              </span>
            </>
          ) : (
            <>
              <span>Golden State Warriors</span>
              <span
                className={
                  win ? 'tooltip__grid__gameWon' : 'tooltip__grid__gameLost'
                }
              >
                {pointsScoredByGSW}
              </span>
              <span>{opponentName}</span>
              <span>{pointsScoredByOpponent}</span>
            </>
          )}
        </div>
        <div>{`Curry scored ${pointsScoredByCurry} points`}</div>
      </div>
    </XYPopper>
  );
};

Tooltip.propTypes = {
  series: PropTypes.string,
  seriesGameNumber: PropTypes.number,
  date: PropTypes.string,
  venue: PropTypes.string,
  opponent: PropTypes.string,
  win: PropTypes.bool,
  pointsScoredByGSW: PropTypes.number,
  pointsScoredByOpponent: PropTypes.number,
  pointsScoredByCurry: PropTypes.number,
  gameNumber: PropTypes.number,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
};

export default Tooltip;
