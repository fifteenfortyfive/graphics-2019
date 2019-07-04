import {h, Fragment} from 'preact';
import classNames from 'classnames';
import {connect} from 'react-redux';

import * as StreamStateStore from '../../selectors/stream';
import * as EventStore from '../../../selectors/events';
import Section from '../section';
import LoadingSpinner from '../../../uikit/loading-spinner';

import {EVENT_ID} from '../../../constants';
import {runTime} from '../../../util';

const RawStateSection = (props) => {
  const {
    event,
    tick,
    ready,
    className
  } = props;

  return (
    <Section
        className={className}
        title="Event Time"
      >
      { ready
        ? <Fragment>
            <h1>{event.name}</h1>

            <p>{runTime(tick)}</p>
          </Fragment>
        : <LoadingSpinner color="black" />
      }
    </Section>
  );
};

const mapStateToProps = (state) => {
  const event = EventStore.getEvent(state, {eventId: EVENT_ID});

  return {
    event,
    tick: state.tick,
    ready: event
  };
};

export default connect(
  mapStateToProps
)(RawStateSection);
