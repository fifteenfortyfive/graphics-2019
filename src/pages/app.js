import { h, render, Component } from 'preact';
import { connect } from 'preact-redux';
import _ from 'lodash';

import * as EventActions from '../actions/events';
import * as TeamActions from '../actions/teams';
import Layout from '../components/layout';
import Stream from '../components/stream';

import { EVENT_ID } from '../constants';
import style from './app.mod.css';


class App extends Component {
  componentDidMount() {
    const {eventId, dispatch} = this.props;
    dispatch(EventActions.fetchEvent(eventId));
    dispatch(TeamActions.fetchTeams(eventId));
  }

  render() {
    const {eventId, teams} = this.props;

    return (
      <Layout>
        { _.map(teams, (team) => {
            return <div style={{color: `#${team.color}`}}>{team.name}</div>
          })
        }
        <Stream />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
  eventId: EVENT_ID,
  event: state.events[EVENT_ID],
  teams: state.teams
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
