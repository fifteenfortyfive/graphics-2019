import {h, Component} from 'preact';
import classNames from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';

import TeamRuns from './omni/team-runs';

import style from './omnibar.mod.css';

class Omnibar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      section: 0
    };
  }

  handleSectionCompleted() {
    const { section } = this.state;
    this.setState({section: section + 1});
  }

  renderSection(index) {
    const {
      runs,
      accounts,
      games,
      teams,
      className
    } = this.props;


    const team = Object.values(teams)[index];
    const firstRuns = _.filter(runs, {team_id: team && team.id});

    const runsWithAssociations = _.map(firstRuns, (run) => ({
      id: run.id,
      run: run,
      runner: accounts[run.account_id],
      game: games[run.game_id],
    }));

    if(team == null || runsWithAssociations.length == 0) return null;

    return <TeamRuns
      key={team.id}
      team={team}
      runs={runsWithAssociations}
      onComplete={this.handleSectionCompleted.bind(this)}
    />;
  }

  render() {
    const {
      runs,
      accounts,
      games,
      teams,
      className
    } = this.props;
    const { section } = this.state;


    return (
      <div class={classNames(style.omnibar, className)}>
        <div class={style.logo}>The 1545</div>
        <div class={style.content}>
          {this.renderSection(section)}
        </div>

        <div class={style.timerBox}>
          <div class={style.timerDescription}>Event Time</div>
          <div class={style.timer}>27:10:43</div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  runs: state.runs,
  accounts: state.accounts,
  games: state.games,
  teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Omnibar);
