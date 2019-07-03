import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';
import _ from 'lodash';

import {timeFromISO} from '../util';

import {getCurrentTime} from './time';

const getRuns = (state) => Object.values(state.runs);
const getRunId = (_, props) => props.runId;
export const getRun = (state, props) => state.runs[props.runId];

export const getRunProgress = createCachedSelector(
  [getRun, getCurrentTime],
  (run, currentTime) => {
    const {finished, started_at, est_seconds} = run;
    if(finished) {
      return 100;
    } else if(started_at == null) {
      return 0;
    } else {
      const elapsed = currentTime.diff(timeFromISO(started_at)).as('seconds');
      return Math.min(0.99, elapsed / est_seconds) * 100;
    }
  }
)(getRunId);
