import { commonThunk, denulled } from '../../actions';

export function pushAction(action) {
  return commonThunk({
    method: 'POST',
    path: '/api/live/push/action',
    name: 'push.action',
    body: remoteAction(action)
  });
}

export function pushForceResync(collection) {
  return commonThunk({
    method: 'POST',
    path: '/api/live/push/action',
    name: 'push.resync',
    body: forceResync(collection)
  });
}


export function remoteAction(action) {
  return {
    type: 'REMOTE_ACTION',
    action,
  };
}

export function forceResync(collection) {
  return {
    type: 'FORCE_RESYNC',
    data: {
      collection
    }
  };
}
