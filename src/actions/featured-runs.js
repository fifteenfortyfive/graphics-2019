// Setting `rotateAt` will cause the stream to rotate once the
// `currentTime` has passed it. If it is unset, the featured stream
// will not rotate until this is explicitly called again.
export function setFeaturedRun(runId, rotateAt) {
  return {
    type: 'SET_FEATURED_RUN',
    data: {
      runId,
      rotateAt: rotateAt || null
    }
  };
}
