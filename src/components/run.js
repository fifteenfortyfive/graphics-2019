import {h, Fragment} from 'preact';
import {connect} from 'react-redux';
import classNames from 'classnames';

import Avatar from './accounts/avatar';
import ProgressBar from '../uikit/progress-bar';

import { runTime } from '../util';
import style from './run.mod.css';

const Run = (props) => {
  const {
    game,
    runner,
    run,
    team,
    midRow = "game",
    showProgressBar = false,
    ready,
    className
  } = props;

  if(!ready) return null;

  const progress = 36;

  return (
    <div class={classNames(style.run, className)}>
      { ready
        ? <Fragment>
            <div class={style.runnerAvatar}>
              <Avatar src={runner.avatar_object_id} size={48} />
            </div>
            <div class={style.runInfo}>
              <div class={style.runnerName}>{runner.username}</div>
              { midRow == "team" &&
                <div class={style.teamName} style={{'--color': `#${team.color}`}}>{team.name}</div>
              }
              { midRow == "game" &&
                <div class={style.gameName}>{game.name}</div>
              }
              <div class={style.detail}>
                <span class={style.muted}>ESTIMATE: </span>
                <span class={style.estimate}>{runTime(run.est_seconds)}</span>
              </div>
              { showProgressBar &&
                <ProgressBar
                  className={style.progress}
                  progress={progress}
                />
              }
            </div>
          </Fragment>
        : null
      }
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
    runner,
    team,
    ready: run && runner && game && team
  }
}

export default connect(
  mapStateToProps
)(Run);
