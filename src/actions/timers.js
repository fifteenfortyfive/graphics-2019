let intervalID = null;

export function startTimers(dispatch, interval = 1000) {
  intervalID = setInterval(() => dispatch(tick()), interval);
}

export function stopTimers(interval) {
  clearInterval(intervalID);
  intervalID = null;
}


export function tick() {
  return {
    type: "TIMER_TICK",
  }
}
