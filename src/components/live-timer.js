import {h} from 'preact';
import {connect} from 'react-redux';

import {diffSeconds, runTime, timeFromISO} from '../util';

const LiveTimer = (props) => {
  const {
    elapsedTime,
    className
  } = props;

  return <span class={className}>{elapsedTime}</span>;
}

const mapStateToProps = (state, props) => {
  const {startedAt} = props;
  const {currentTime} = state;

  return {
    elapsedTime: runTime(diffSeconds(currentTime, timeFromISO(startedAt))),
  };
};

export default connect(
  mapStateToProps,
)(LiveTimer);
