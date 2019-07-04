import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';

export const isLoggedIn = (state) => state.sessionId != null;
