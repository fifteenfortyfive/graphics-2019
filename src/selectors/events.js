import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';
import _ from 'lodash';

import {timeFromISO} from '../util';

import {getCurrentTime} from './time';

const getEvents = (state) => Object.values(state.events);
const getEventId = (_, props) => props.eventId;
export const getEvent = (state, props) => state.events && state.events[props.eventId];
