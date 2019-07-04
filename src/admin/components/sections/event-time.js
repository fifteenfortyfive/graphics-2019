import {h, Fragment} from 'preact';
import classNames from 'classnames';
import {connect} from 'react-redux';

import * as StreamStateStore from '../../selectors/stream';
import * as EventStore from '../../../selectors/events';
import LoadingSpinner from '../../../uikit/loading-spinner';

import {EVENT_ID} from '../../../constants';
import {runTime} from '../../../util';
import style from './socket-status.mod.css';

const RawStateSection = (props) => {
  const {
    event,
    tick,
    ready,
    className
  } = props;

  return (
    <div class={classNames(style.section, className)}>
      { ready
        ? <Fragment>
            <h1 class={style.sectionTitle}>{event.name}</h1>

            <div class={style.sectionContent}>
              {runTime(tick)}
            </div>
          </Fragment>
        : <LoadingSpinner color="black" />
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  const streamState = StreamStateStore.getStreamState(state);
  const event = EventStore.getEvent(streamState, {eventId: EVENT_ID});

  return {
    event,
    tick: state.streamState.tick,
    ready: event
  };
};

export default connect(
  mapStateToProps
)(RawStateSection);
