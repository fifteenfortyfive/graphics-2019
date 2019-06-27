import {h} from 'preact';
import classNames from 'classnames';
import { connect } from 'preact-redux';
import _ from 'lodash';

import Run from './run';

import style from './omnibar.mod.css';

const Omnibar = (props) => {
  const {
    runs,
    accounts,
    games,
    teams,
    className
  } = props;


  const team = Object.values(teams)[4];
  const firstRuns = _.filter(runs, {team_id: team && team.id});

  return (
    <div class={classNames(style.omnibar, className)}>
      <div class={style.logo}>The 1545</div>
      <div class={style.content}>
        <div class={style.teamHeader} style={`--color: #${team && team.color}`}>
          <p>{team && team.name}</p>
        </div>
        { _.map(firstRuns, (run) => {
            return <Run
              className={style.run}
              run={run}
              runner={accounts[run.account_id]}
              game={games[run.game_id]}
            />
          })
        }
      </div>

      <div class={style.timerBox}>
        <div class={style.timerDescription}>Event Time</div>
        <div class={style.timer}>27:10:43</div>
      </div>
    </div>
  );
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
