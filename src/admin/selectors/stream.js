import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';

export const getStreamState = (state) => state.streamState;
