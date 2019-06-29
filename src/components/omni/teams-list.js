import {h, Component, Fragment} from 'preact';
import {TimelineMax} from 'gsap/TimelineMax';
import { connect } from 'react-redux';
import _ from 'lodash';

import TeamRuns from './team-runs';
import Sequenced from '../../uikit/anim/sequenced';

class TeamsList extends Component {
  renderSection(team, index) {
    const {
      runs,
      accounts,
      games
    } = this.props;

    const teamRuns = _.filter(runs, {team_id: team && team.id});
    const runsWithAssociations = _.map(teamRuns, (run) => ({
      id: run.id,
      run: run,
      runner: accounts[run.account_id],
      game: games[run.game_id],
      team: team,
    }));

    return <TeamRuns
      key={team.id}
      team={team}
      runs={runsWithAssociations}
    />;
  }

  render() {
    const {
      teams,
      onComplete
    } = this.props;

    return (
      <Sequenced
          onLoop={onComplete}
        >
        { _.map(teams, (team) => {
            return this.renderSection(team);
          })
        }
      </Sequenced>
    );
  }
};

const mapStateToProps = (state) => ({
  runs: state.runs,
  accounts: state.accounts,
  games: state.games,
  teams: Object.values(state.teams)
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamsList);
