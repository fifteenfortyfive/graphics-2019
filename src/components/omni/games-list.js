import {h, Component, Fragment} from 'preact';
import {TimelineMax} from 'gsap/TimelineMax';
import { connect } from 'react-redux';
import _ from 'lodash';

import GameResults from './game-results';
import Sequenced from '../../uikit/anim/sequenced';

class GamesList extends Component {
  renderSection(game, index) {
    const {
      runs,
      accounts,
      teams,
    } = this.props;

    const gameRuns = _.filter(runs, {game_id: game && game.id});
    const runsWithAssociations = _.map(gameRuns, (run) => ({
      id: run.id,
      run: run,
      runner: accounts[run.account_id],
      team: teams[run.team_id],
      game: game,
    }));

    return <GameResults
      key={game.id}
      game={game}
      runs={runsWithAssociations}
    />;
  }

  render() {
    const {
      games,
      onComplete
    } = this.props;

    return (
      <Sequenced
          onLoop={onComplete}
        >
        { _.map(games, (game) => {
            return this.renderSection(game);
          })
        }
      </Sequenced>
    );
  }
};

const mapStateToProps = (state) => ({
  runs: state.runs,
  accounts: state.accounts,
  games: Object.values(state.games),
  teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamesList);
