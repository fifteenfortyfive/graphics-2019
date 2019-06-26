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
import TeamCard from '../components/cards/team-card';

import { EVENT_ID } from '../constants';
import { runTime } from '../util';
import style from './app.mod.css';


class App extends Component {
  componentDidMount() {
    const {eventId, dispatch} = this.props;
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(TeamActions.fetchTeams(eventId));
    dispatch(AccountActions.fetchAccounts());
    dispatch(GameActions.fetchGames());
  }

  render() {
    const {eventId, teams} = this.props;

    const team = Object.values(teams)[1];

    return (
      <Layout>
        <div class={style.layoutContainer}>
          <div class={style.sidebar}>
            { team &&
              <TeamCard key={team.id} teamId={team.id} />
            }
          </div>
          <div class={style.mainVideo}>
            <Stream accountId={212} />
          </div>
          <div class={style.subVideos}>
            <Stream accountId={35} />
          </div>

          <div class={style.omnibar}>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  eventId: EVENT_ID,
  event: state.events[EVENT_ID],
  runs: state.runs,
  teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
