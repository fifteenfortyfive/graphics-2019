export function setFeaturedRun(runId) {
  return {
    type: 'SET_FEATURED_RUN',
    data: {
      runId,
    }
  };
}
