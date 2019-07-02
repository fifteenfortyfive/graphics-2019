import {h, Component} from 'preact';
import classNames from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';
import {DateTime} from 'luxon';

import * as RunUpdateActions from '../actions/run-updates';
import GamesList from './omni/games-list';
import TeamsList from './omni/teams-list';
import RunUpdate from './omni/run-update';
import LiveTimer from './live-timer';
import Sequenced from '../uikit/anim/sequenced';

import {RunUpdateTypes} from '../constants';
import style from './omnibar.mod.css';

class Omnibar extends Component {
  constructor(props) {
    super(props);

    this.startedAt = DateTime.utc().toISO();
  }

  handleRunUpdateDisplayed(updateId) {
    const {dispatch} = this.props;

    dispatch(RunUpdateActions.runUpdateHandled(updateId));
  }

  render() {
    const {
      runUpdate,
      className,
      dispatch
    } = this.props;


    return (
      <div class={classNames(style.omnibar, className)}>
        <div class={style.logo}>
          <div class={style.logoText}>The 1545</div>
        </div>

        <div class={style.content}>
          <div class={style.updateOverlay}>
            { runUpdate &&
              <RunUpdate
                className={style.updateContent}
                update={runUpdate}
                onComplete={this.handleRunUpdateDisplayed.bind(this)}
              />
            }
          </div>
          <Sequenced>
            <GamesList />
            <TeamsList />
          </Sequenced>
        </div>

        <div class={style.timerBox}>
          {/*<div class={style.timerDescription}>Event Time</div>*/}
          <LiveTimer
            className={style.timer}
            startedAt={this.startedAt}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  runUpdate: state.runUpdateQueue[0],
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Omnibar);
