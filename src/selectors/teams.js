import {createSelector} from '../util';
import _ from 'lodash';

import {timeFromISO} from '../util';

const getRuns = (state) => state.runs;
const getTeams = (state) => state.teams;
const getTeamId = (_, props) => props.teamId;

const getTimeAtMinute = (state) => state.currentTime.startOf('minute');

export const getTeamRuns = createSelector(
  [getRuns, getTeamId],
  (runs, teamId) => {
    return state.runs.filter((run) => run.team_id == teamId)
  }
);

const getTeamOriginalEstimate = createSelector(
  [getTeamRuns],
  (runs) => _.sumBy(runs, 'est_seconds')
);

const getTeamLiveEstimate = createSelector(
  [getTeamRuns],
  (runs) => _.sumBy(runs, (run) => run.actual_seconds || run.est_seconds)
);

const getTeamElapsedTime = createSelector(
  [getTimeAtMinute, getTeamRuns],
  (currentTime, runs) => _.sumBy(runs, (run) => {
    if(run.finished) {
      return run.actual_seconds;
    } else if(run.started_at) {
      return currentTime.diff(timeFromISO(run.started_at)).as('seconds');
    } else {
      return 0;
    }
  })
);


// Returns a value between 0 and 1 representing an estimated level of
// progression through the team's runs.
export const getTeamProgress = createSelector(
  [
    getTeamLiveEstimate,
    getTeamElapsedTime,
    getTeamOriginalEstimate,
  ],
  (liveEstimate, originalEstimate) => {

    totalElapsed / totalEstimate;
  }
);
