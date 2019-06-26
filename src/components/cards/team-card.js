import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import * as AccountActions from '../../actions/accounts';
import * as RunActions from '../../actions/runs';
import * as TeamActions from '../../actions/teams';

import { EVENT_ID } from '../../constants';
import { runTime } from '../../util';
import style from './team-card.mod.css';


class TeamCard extends Component {
  componentDidMount() {
    const {teamId, team, loadingTeam, runs, dispatch} = this.props;

    const accountIds = _.map(runs, 'account_id');

    dispatch(TeamActions.fetchTeam(teamId));
    dispatch(RunActions.fetchRuns(EVENT_ID, {teamId}));
  }

  render() {
    const {runs, team, games, accounts, loading} = this.props;

    if(loading) return "loading";

    const captain = accounts[team.captain_id];

    return (
      <div class={style.teamCard}>
        <div class={style.cardHeader} style={`--color: #${team.color}`}>
          {team.name} / {captain.username}
        </div>

        <ul class="has-text-white">
          { _.map(runs, (run) => {
              const game = games[run.game_id];
              const runner = accounts[run.account_id];
              return (
                <li>
                  <strong>{game.name}</strong><br/>
                  <span>{runner.username}</span><br />
                  <span>{runTime(run.est_seconds)} / {runTime(run.pb_seconds)}</span>
                </li>
              );
            })
          }
        </ul>
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
