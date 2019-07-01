import ReconnectingWebSocket from 'reconnecting-websocket';
import queryString from 'query-string';

import * as RunActions from './runs';
import * as RunUpdateActions from './run-updates';

const SOCKET_PATH = '/api/live/stream';
function getSocketURL() {
  const {socket_host} = queryString.parse(window.location.search);

  if(socket_host) return socket_host;

  const {host, protocol} = window.location;

  const wsProto = protocol == 'https' ? 'wss' : 'ws';

  return `${wsProto}://${host}${SOCKET_PATH}`;
};
const SOCKET = new ReconnectingWebSocket(getSocketURL());


export function bindSocketToDispatch(dispatch) {
  SOCKET.onopen = function(event) {
    console.log("Stream Socket connected");
    dispatch(streamSocketOpened());
  };
  SOCKET.onclose = function(event) {
    console.log("Stream Socket closed. Reconnecting...");
    dispatch(streamSocketClosed());
  };
  SOCKET.onerror = function(event) {
    console.log("Stream Socket errored. Reconnecting...");
    dispatch(streamSocketClosed());
  };
  SOCKET.onmessage = function(event) {
    handleSocketUpdate(dispatch, event);
  };
};



function handleSocketUpdate(dispatch, event) {
  const data = JSON.parse(event.data);

  const {type} = data;

  switch(type) {
    case 'run_started':
    case 'run_finished':
    case 'run_resumed':
    case 'run_restarted':
      dispatch(RunActions.fetchRun(data.run_id));
      dispatch(RunUpdateActions.receiveRunUpdate(data));
      return;
    default:
      return;
  }
};



export function streamSocketOpened() {
  return {
    type: 'STREAM_SOCKET_OPENED'
  };
};

export function streamSocketClosed() {
  return {
    type: 'STREAM_SOCKET_CLOSED'
  };
};