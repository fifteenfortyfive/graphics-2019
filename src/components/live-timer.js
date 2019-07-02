import {h} from 'preact';
import {connect} from 'react-redux';

import {runTimeFromStart} from '../util';

const LiveTimer = (props) => {
  const {
    elapsedTime,
    className
  } = props;

  return <span class={className}>{elapsedTime}</span>;
}

// tick is included to make sure the component re-renders
// on every tick.
const mapStateToProps = (state, props) => {
  const {startedAt} = props;

  return {
    elapsedTime: runTimeFromStart(startedAt),
    tick: state.tick,
  };
};

export default connect(
  mapStateToProps,
)(LiveTimer);
