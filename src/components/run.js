import {h, Component, Fragment} from 'preact';
import {connect} from 'react-redux';
import classNames from 'classnames';

import Avatar from './accounts/avatar';
import ProgressBar from '../uikit/progress-bar';

import { runTime, runTimeFromStart } from '../util';
import style from './run.mod.css';

class Run extends Component {
  renderMidRow() {
    const {
      midRow,
      game,
      team
    } = this.props;

    switch(midRow) {
      case "team":
        return (
          <div class={style.teamName} style={{'--color': `#${team.color}`}}>{team.name}</div>
        );
      case "game":
      default:
        return (
          <div class={style.gameName}>{game.name}</div>
        );
    }
  }

  renderTimeRow() {
    const {
      run,
    } = this.props;

    if(run.actual_seconds) {
      return (
        <div class={style.detail}>
          <span class={style.muted}>FINISHED: </span>
          <span class={style.estimate}>{runTime(run.actual_seconds)}</span>
        </div>
      );
    } else if(run.started_at) {
      return (
        <div class={style.detail}>
          <span class={style.muted}>IN PROGRESS: </span>
          <span class={style.estimate}>{runTimeFromStart(run.started_at)}</span>
        </div>
      );
    } else {
      return (
        <div class={style.detail}>
          <span class={style.muted}>ESTIMATE: </span>
          <span class={style.estimate}>{runTime(run.est_seconds)}</span>
        </div>
      );
    }

  }

  render() {
    const {
      game,
      runner,
      run,
      team,
      midRow = "game",
      showProgressBar = false,
      ready,
      className
    } = this.props;

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
                {this.renderMidRow()}
                {this.renderTimeRow()}
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
  }
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
