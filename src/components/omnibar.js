import {h, Component, createRef} from 'preact';
import classNames from 'classnames';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as RunUpdateActions from '../actions/run-updates';
import GamesList from './omni/games-list';
import TeamsList from './omni/teams-list';
import RunUpdate from './omni/run-update';
import Sequenced from '../uikit/anim/sequenced';
import {StretchReveal} from '../uikit/masks';

import style from './omnibar.mod.css';

class Omnibar extends Component {
  constructor(props) {
    super(props);
    this.updateOverlayRef = createRef();
    this.timeline = new TimelineMax({paused: true, autoRemoveChildren: true});

    this.timeline
        .eventCallback("onComplete", this.handleRunUpdateDisplayed.bind(this));
  }

  componentDidUpdate(prevProps) {
    const {runUpdate} = this.props;
    // When the next update changes, show it
    if(runUpdate && prevProps.runUpdate != runUpdate) {
      this.showRunUpdate();
    }
  }

  showRunUpdate() {
    const {runUpdate, dispatch} = this.props;

    this.timeline
        .set(this.updateOverlayRef.current, {zIndex: 1})
        .set("#updateClipRect", {scaleX: 0})
        .to("#updateClipRect", 1.2, {scaleX: 1, ease: "Power4.easeInOut"})
        .to("#updateClipRect", 1.2, {scaleX: 0, ease: "Power4.easeInOut"}, "+=5")
        .play();
  }

  handleRunUpdateDisplayed() {
    const {runUpdate, dispatch} = this.props;

    dispatch(RunUpdateActions.runUpdateHandled(runUpdate.updateId));
  }

  render() {
    const {
      runs,
      accounts,
      games,
      teams,
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
          <div ref={this.updateOverlayRef} class={style.updateOverlay}>
            <StretchReveal
                pathId="updateClipPath"
                rectId="updateClipRect"
                objectId="updateObject"
              >
              { runUpdate &&
                <RunUpdate
                  className={style.updateContent}
                  update={runUpdate}
                />
              }
            </StretchReveal>
          </div>
          <Sequenced>
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
  teams: state.teams,
  runUpdate: state.runUpdateQueue[0],
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Omnibar);
