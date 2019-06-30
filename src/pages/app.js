import { h, render, Component } from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as AccountActions from '../actions/accounts';
import * as EventActions from '../actions/events';
import * as GameActions from '../actions/games';
import * as RunActions from '../actions/runs';
import * as TeamActions from '../actions/teams';
import Layout from '../components/layout';
import Stream from '../components/stream';
import Run from '../components/run';
import Omnibar from '../components/omnibar';
import SubVideos from '../components/sub-videos';
import TeamCard from '../components/cards/team-card';
import LoadingSpinner from '../uikit/loading-spinner';

import { EVENT_ID } from '../constants';
import { runTime } from '../util';
import style from './app.mod.css';

import stream1 from '../res/stream1.jpg';
import stream2 from '../res/stream2.jpg';


class App extends Component {
  componentDidMount() {
    const {eventId, dispatch} = this.props;
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(TeamActions.fetchTeams(eventId));
    dispatch(AccountActions.fetchAccounts());
    dispatch(GameActions.fetchGames());
    dispatch(RunActions.fetchRuns(EVENT_ID, {}));
  }

  render() {
    const {eventId, teams, runs, ready} = this.props;

    const team1 = Object.values(teams)[1];
    const team2 = Object.values(teams)[2];
    const team3 = Object.values(teams)[3];

    return (
      <Layout>
        <div class={style.layoutContainer}>
          <div class={style.mainVideo}>
            <Stream
              accountId={212}
              quality={Stream.Qualities.HIGH}
            />
          </div>

          <div class={style.sidebar}>
          </div>

          <SubVideos class={style.subVideos} />

          <div class={style.other}></div>

          <Omnibar className={style.omnibar} />
        </div>
      </Layout>
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

  return {
    eventId: EVENT_ID,
    event: state.events[EVENT_ID],
    teams: state.teams,
    ready
  }
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
