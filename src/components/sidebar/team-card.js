import { h, render, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as AccountActions from '../../actions/accounts';
import * as RunActions from '../../actions/runs';
import * as TeamActions from '../../actions/teams';
import Run from '../run';
import LoadingSpinner from '../../uikit/loading-spinner';

import { EVENT_ID } from '../../constants';
import style from './team-card.mod.css';


class TeamCard extends Component {
  componentDidMount() {
    const {teamId, team, loadingTeam, runs, dispatch} = this.props;
    dispatch(TeamActions.fetchTeam(teamId));
  }

  render() {
    const {runs, team, games, accounts, loading} = this.props;

    if(loading || team == null) {
      return (
        <div class={style.teamCard}>
          <LoadingSpinner />
        </div>
      );
    }

    const captain = accounts[team.captain_id];
    const nearbyRuns = runs.slice(6, 9);

    return (
      <div class={style.teamCard} style={{'--color': `#${team.color}`}}>
        <div class={style.cardHeader}>
          <div class={style.teamName}>
            {team.name}
          </div>
        </div>

        <div class={style.details}>
          <ul>
            { _.map(nearbyRuns, (run) => {
                const game = games[run.game_id];
                const runner = accounts[run.account_id];

                return <Run
                  key={run.id}
                  className={style.run}
                  game={game}
                  runner={runner}
                  run={run}
                  team={team}
                />;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { teamId } = props;
  const { teams, runs, accounts } = state;

  const teamRuns = _.filter(runs, (r) => r.team_id == teamId);
  const games = _.pick(state.games, _.map(runs, 'game_id'));

  const loading =
      state.fetching[`teams.${teamId}`] ||
      state.fetching[`games`] ||
      state.fetching[`accounts`];

  return {
    team: teams[teamId],
    runs: teamRuns,
    games,
    accounts,
    loading
  }
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamCard);
