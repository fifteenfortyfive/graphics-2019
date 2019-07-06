import {h} from 'preact';
import {connect} from 'react-redux';
import classNames from 'classnames';

import * as EventStore from '../selectors/events';

import {runTime} from '../util';

const EventTimer = (props) => {
  const {
    eventTimeSeconds,
    eventState,
    className
  } = props;

  return (
    <div class={classNames(className)}>
      {runTime(eventTimeSeconds)}
    </div>
  );
}

const mapStateToProps = (state, props) => {
  const {startedAt} = props;

  return {
    eventTimeSeconds: EventStore.getEventTimeSeconds(state, props),
    eventState: EventStore.getEventState(state, props)
  };
};

export default connect(
  mapStateToProps,
)(EventTimer);
