import {h, Component} from 'preact';
import classNames from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';

import TeamsList from './omni/teams-list';
import GamesList from './omni/games-list';
import Sequenced from '../uikit/anim/sequenced';

import style from './omnibar.mod.css';

class Omnibar extends Component {
  render() {
    const {
      runs,
      accounts,
      games,
      teams,
      className
    } = this.props;


    return (
      <div class={classNames(style.omnibar, className)}>
        <div class={style.logo}>
          <div class={style.logoText}>The 1545</div>
        </div>

        <div class={style.content}>
          <Sequenced onLoop={() => console.log("looped")}>
            <GamesList />
            <TeamsList />
          </Sequenced>
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
