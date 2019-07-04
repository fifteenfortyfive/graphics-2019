import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';

import {DateTime} from 'luxon';

const getTimeUnit = (_, {unit}) => unit;
const getCurrentTimeRaw = (state) => state.currentTime;

export const getCurrentTime = createSelector(
  [getCurrentTimeRaw],
  (rawTime) => {
    if(typeof(rawTime) === "string") {
      return DateTime.fromISO(rawTime)
    } else {
      return rawTime;
    }
  }
);

export const getCurretTimeWithAccuracy = createCachedSelector(
  [getCurrentTime, getTimeUnit],
  (time, unit) => {
    return time.startOf(unit);
  }
)(getTimeUnit);
