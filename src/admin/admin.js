import { h, render, Component, Fragment } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as AuthStore from './selectors/auth';
import * as AccountActions from '../actions/accounts';
import * as EventActions from '../actions/events';
import * as GameActions from '../actions/games';
import * as RunActions from '../actions/runs';
import * as TeamActions from '../actions/teams';
import * as StreamSyncActions from './actions/stream-sync';
import LoginForm from './components/login-form';
import SocketStatusSection from './components/sections/socket-status';
import EventTimeSection from './components/sections/event-time';
import FeaturedRunSection from './components/sections/featured-run';
import RawStateSection from './components/sections/raw-state';
import LoadingSpinner from '../uikit/loading-spinner';

import { EVENT_ID } from '../constants';
import style from './admin.mod.css';


class App extends Component {
  componentDidMount() {
    const {eventId, dispatch} = this.props;
    StreamSyncActions.bindSocketToDispatch(dispatch);

    dispatch(EventActions.fetchEvent(eventId));
    dispatch(TeamActions.fetchTeams(eventId));
    dispatch(AccountActions.fetchAccounts());
    dispatch(GameActions.fetchGames());
    dispatch(RunActions.fetchRuns(EVENT_ID, {}));
  }

  componentWillUnmount() {
    TimerActions.stopTimers();
  }

  render() {
    const {
      isAuthenticated,
      ready,
      dispatch
    } = this.props;

    if(!ready) {
      return (
        <div class={style.container}>
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <div class={style.body}>
        <div class={style.container}>
          { isAuthenticated
            ? <Fragment>
                <SocketStatusSection className={style.socketStatus} />
                <EventTimeSection className={style.eventTime} />
                <FeaturedRunSection className={style.featuredRun} />
                <RawStateSection className={style.rawState} />
              </Fragment>
            : <LoginForm dispatch={dispatch} />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const ready =
      !state.fetching[`events.${EVENT_ID}`] &&
      !state.fetching[`runs`] &&
      !state.fetching[`accounts`] &&
      !state.fetching[`teams`] &&
      !state.fetching[`games`];

  const isAuthenticated = AuthStore.isLoggedIn(state);

  return {
    eventId: EVENT_ID,
    isAuthenticated,
    ready,
  };
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
