import createCachedSelector from 're-reselect';

const getTimeUnit = (_, {unit}) => unit;
export const getCurrentTime = (state) => state.currentTime;

export const getCurretTimeWithAccuracy = createCachedSelector(
  [getCurrentTime, getTimeUnit],
  (time, unit) => {
    return time.startOf(unit);
  }
)(getTimeUnit);
