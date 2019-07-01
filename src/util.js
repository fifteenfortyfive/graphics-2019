import {DateTime} from 'luxon';
import Duration from 'luxon/src/duration';
import { createSelectorCreator } from 'reselect'
import _ from 'lodash'


export function runTime(seconds) {
  return Duration.fromMillis(seconds * 1000).toFormat("hh:mm:ss");
}

export function runTimeFromStart(startString) {
  return DateTime.utc()
      .diff(DateTime.fromISO(startString, {zone: 'utc'}))
      .toFormat("hh:mm:ss");
}

export function simpleDate(date) {
  return DateTime.fromISO(date).toLocaleString({
    year: 'numeric',
    month: 'long',
  });
}

export function fullDate(date) {
  return DateTime.fromISO(date).toLocaleString({
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
}

export function simpleDateTime(date) {
  return DateTime.fromISO(date).toLocaleString({
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });
}


export function getThumbnailURL(urlTemplate, width, height) {
  return urlTemplate
      .replace("{width}", width)
      .replace("{height}", height);
};

// Override of reselect's default memoized selector to just memoize
// everything instead.
export const createSelector = createSelectorCreator(
  _.memoize,
  (...args) => args.reduce(
    (acc, val) => acc + '-' + JSON.stringify(val),
    ''
  )
);
