import {h} from 'preact';
import {connect} from 'react-redux';
import classNames from 'classnames';

import Avatar from '../accounts/Avatar';

import {runTime} from '../../util';
import style from './run-game-row.mod.css';

const RunGameRow = (props) => {
  const {
    run,
    game,
    runner,
    className
  } = props;

  return (
    <div
        class={classNames(style.row, className, {
          [style.completed]: run.actual_seconds
        })}
      >
      <div class={style.game}>{game.name}</div>
      <div class={style.run}>
        <span class={style.runTime}>{runTime(run.est_seconds)}</span>
        <span class={style.runBy}> by {runner.username}</span>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const {runId} = props;

  const run = state.runs[runId];
  const game = state.games[run.game_id];
  const runner = state.accounts[run.account_id];

  return {
    run,
    game,
    runner,
  }
};

export default connect(
  mapStateToProps
)(RunGameRow);
