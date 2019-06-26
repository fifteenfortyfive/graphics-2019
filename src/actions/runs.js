import { commonThunk, denulled } from '../actions';

export function fetchRuns(eventId, {teamId, runIds}) {
  return commonThunk({
    method: 'get',
    path: `/api/v1/events/${eventId}/runs`,
    name: 'runs',
    query: denulled({
      team_id: teamId,
      run_ids: runIds
    })
  }, (dispatch, response) => {
    dispatch(receiveRuns(response.runs))
  });
}

export function fetchRun(runId) {
  return fetchRuns([runId]);
}



export function receiveRuns(runs) {
  return {
    type: 'RECEIVE_RUNS',
    data: {
      runs
    }
  };
}
