import {h} from 'preact';
import {connect} from 'react-redux';
import classNames from 'classnames';

import Run from '../run';
import {runTime} from '../../util';

import style from './run-update.mod.css';

const RunUpdate = (props) => {
  const {
    update,
    run,
    team,
    game,
    runner,
    className
  } = props;

  if(run == null) return <p>Woops, run's not loaded.</p>;

  return (
    <div class={classNames(style.container, className)} style={{'--color': `#${team.color}`}}>
      <p class={style.text}>
        <strong>{runner.username}</strong> just finished <strong>{game.name}</strong> in <strong>{runTime(run.actual_seconds)}</strong> for <strong>{team.name}</strong>!
      </p>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const {update} = props;
  const {runId} = update;

  const run = state.runs[runId];
  const game = run && state.games[run.game_id];
  const team = run && state.teams[run.team_id];
  const runner = run && state.accounts[run.account_id];

  return {
    run,
    game,
    runner,
    team,
    ready: run && runner && game && team
  }
}

export default connect(
  mapStateToProps
)(RunUpdate);
