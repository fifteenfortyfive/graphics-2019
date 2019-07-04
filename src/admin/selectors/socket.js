import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';

const getSocket = (state) => state.socket;

export const isConnected = createSelector(
  [getSocket],
  (socket) => socket.connected
);
