import {h} from 'preact';
import classNames from 'classnames';
import {connect} from 'react-redux';
import ReactJson from 'react-json-view';

import * as StreamStateStore from '../../selectors/stream';

import style from './socket-status.mod.css';

const RawStateSection = (props) => {
  const {
    streamState,
    className
  } = props;

  return (
    <div class={classNames(style.section, className)}>
      <h1 class={style.sectionTitle}>Raw State</h1>

      <div class={style.sectionContent}>
        <ReactJson
          src={streamState}
          name="streamState"
          collapsed
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    streamState: StreamStateStore.getStreamState(state)
  };
};

export default connect(
  mapStateToProps
)(RawStateSection);
