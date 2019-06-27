import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
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
import TeamCard from '../components/cards/team-card';

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
    const {eventId, teams, runs} = this.props;

    const team1 = Object.values(teams)[1];
    const team2 = Object.values(teams)[2];
    const team3 = Object.values(teams)[3];

    return (
      <Layout>
        <div class={style.layoutContainer}>
          <div class={style.sidebar}>
            <h1>Upcoming Runs</h1>
            { team1 &&
              <TeamCard key={team1.id} teamId={team1.id} />
            }
            { team2 &&
              <TeamCard key={team2.id} teamId={team2.id} />
            }
            { team3 &&
              <TeamCard key={team3.id} teamId={team3.id} />
            }
          </div>
          <div class={style.mainVideo}>
            <Stream accountId={212} src={stream1} />
          </div>
          <div class={style.subVideos}>
            <Stream accountId={35} src={stream1} />
            <Stream accountId={35} src={stream2} />
            <Stream accountId={35} src={stream1} />
            <Stream accountId={35} src={stream2} />
          </div>

          <Omnibar className={style.omnibar} />
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  eventId: EVENT_ID,
  event: state.events[EVENT_ID],
  teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
