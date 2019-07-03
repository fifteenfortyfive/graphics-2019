import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';
import _ from 'lodash';

import {timeFromISO} from '../util';

import {getCurrentTime} from './time';

const getRuns = (state) => Object.values(state.runs);
const getTeams = (state) => Object.values(state.teams);
export const getTeamId = (_, props) => props.teamId;
export const getTeam = (state, props) => state.teams[props.teamId];

export const getSortedTeams = createSelector(
  [getTeams],
  (teams) => _.sortBy(teams, 'id')
);

export const getTeamRuns = createCachedSelector(
  [getRuns, getTeamId],
  (runs, teamId) => {
    return _.filter(runs, (run) => run.team_id == teamId);
  }
)(getTeamId);


const getTeamOriginalEstimate = createCachedSelector(
  [getTeamRuns],
  (runs) => _.sumBy(runs, 'est_seconds')
)(getTeamId);

const getTeamLiveEstimate = createCachedSelector(
  [getTeamRuns],
  (runs) => _.sumBy(runs, (run) => run.actual_seconds || run.est_seconds)
)(getTeamId);

const getTeamCurrentRunTime = createCachedSelector(
  [getTeamRuns, getCurrentTime],
  (runs, currentTime) => {
    return _.sumBy(runs, (run) => {
      if(run.finished) {
        return run.actual_seconds;
      } else if(run.started_at) {
        return currentTime.diff(timeFromISO(run.started_at)).as('seconds');
      } else {
        return 0;
      }
    });
  }
)(getTeamId);


// Returns true if all of the team's runs have been marked as finished.
export const isTeamFinished = createCachedSelector(
  [getTeamRuns],
  (runs) => {
    return _.every(runs, 'finished');
  }
)(getTeamId);


// Returns a value between 0 and 100 representing an estimated level of
// progression through the team's runs.
export const getTeamProgress = createCachedSelector(
  [
    getTeamCurrentRunTime,
    getTeamLiveEstimate,
    isTeamFinished
  ],
  (currentRunTime, liveEstimate, isFinished) => {
    // If not all the runs are finished, even if the team goes over estimate,
    // they cannot be 100% complete.
    const percent = isFinished
        ? 1.00
        : Math.min(0.99, currentRunTime / liveEstimate);

    return percent * 100;
  }
)(getTeamId);
