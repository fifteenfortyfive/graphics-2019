import {createSelector} from 'reselect';

const getRuns = (state) => state.runs;

export const getFeaturedRunId = (state) => state.featuredRunId;

export const getFeaturedRun = createSelector(
  [getRuns, getFeaturedRunId],
  (runs, runId) => runs[runId]
);
