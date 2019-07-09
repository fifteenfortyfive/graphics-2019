import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';
import _ from 'lodash';

import {timeFromISO} from '../util'

import {getCurrentTimeToMinute} from './time';
import {getRunsByTeam} from './runs';

// This is only updated once a minute because it's fairly expensive. The next
// best option is every second, which is way too frequent.
//
// Returns a map of teamId => [{runId, estimatedStartTime, isStarted}]
export const getEstimatedRunSchedulesByTeam = createSelector(
  [getCurrentTimeToMinute, getRunsByTeam],
  (currentTime, runsByTeam) => {
    return _.mapValues(runsByTeam, (runs, teamId) => {
      let lastEndedAt = currentTime;
      const mapped = _.map(runs, (run, index) => {
        if(run.started_at != null) {
          lastEndedAt = lastEndedAt.plus({seconds: run.actual_seconds});
          return {
            runId: run.id,
            estimatedStartTime: timeFromISO(run.started_at),
            isStarted: true,
          };
        } else {
          if(index == 0) lastEndedAt = currentTime;
          const result = {
            runId: run.id,
            estimatedStartTime: lastEndedAt,
            isStarted: false
          };

          lastEndedAt = lastEndedAt.plus({seconds: run.est_seconds});
          return result;
        }
      });

      return mapped;
    });
  }
);

const getRequestedCount = (_, props) => props.count;

export const getUpcomingRuns = createSelector(
  [getEstimatedRunSchedulesByTeam, getRequestedCount],
  (runsByTeam, count) => {
    const sortedNextRuns = _.chain(runsByTeam)
        .flatMap()
        .reject('isStarted')
        .sortBy((r) => r.estimatedStartTime.toMillis())
        .value();

    if(count) {
      return sortedNextRuns.slice(0, count);
    } else {
      return sortedNextRuns;
    }
  }
);
