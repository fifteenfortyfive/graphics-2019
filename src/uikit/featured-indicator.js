import {h} from 'preact';
import {connect} from 'react-redux';
import classNames from 'classnames';

import style from './featured-indicator.mod.css';

const FeaturedIndicator = (props) => {
  const {
    game,
    run,
    runner,
    team,
    className
  } = props;

  return (
    <div class={classNames(style.container, className)} style={{'--color': `#${team.color}`}}>
      <div class={style.content}>
        <p>{runner.username}</p>
        <p>{game.name}</p>
        <p>{team.name}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const {runId} = props;

  const run = state.runs[runId];

  const game = run && state.games[run.game_id];
  const team = run && state.teams[run.team_id];
  const runner = run && state.accounts[run.account_id];

  return {
    run,
    game,
    team,
    runner
  };
}

export default connect(
  mapStateToProps
)(FeaturedIndicator);
