import { h, render, Component } from 'preact';
import { connect } from 'react-redux';
import classNames from 'classnames';
import _ from 'lodash';

import * as AccountActions from '../../actions/accounts';
import * as RunActions from '../../actions/runs';
import * as TeamActions from '../../actions/teams';
import Run from '../run';
import RunGameRow from './run-game-row';
import LoadingSpinner from '../../uikit/loading-spinner';

import { EVENT_ID } from '../../constants';
import style from './team-card.mod.css';


class TeamCard extends Component {
  componentDidMount() {
    const {teamId, dispatch} = this.props;
    dispatch(TeamActions.fetchTeam(teamId));
  }

  render() {
    const {
      ready,
      team,
      currentRun,
      currentRunIndex,
      sortedRuns,
      className
    } = this.props;

    if(!ready) {
      return (
        <div class={style.teamCard}>
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <div class={classNames(style.teamCard, className)} style={{'--color': `#${team.color}`}}>
        <div class={style.cardHeader}>
          <h1 class={style.teamName}>{team.name}</h1>
          <p class={style.gameCount}>
            Game {currentRunIndex+1}/{sortedRuns.length}
          </p>
        </div>
        <div class={style.details}>
          <div class={style.section}>
            <Run
              className={style.run}
              runId={currentRun.id}
              showProgressBar={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { teamId } = props;

  const team = state.teams[teamId];

  const runs = _.chain(Object.values(state.runs))
    .filter((r) => r.team_id == teamId)
    .value();

  const sortedRuns = _.sortBy(runs, 'index');
  const currentRunIndex = _.findIndex(sortedRuns, {'finished': false});
  const currentRun = sortedRuns[currentRunIndex];

  return {
    team,
    sortedRuns,
    currentRunIndex,
    currentRun,
    ready: !!team
  }
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamCard);
