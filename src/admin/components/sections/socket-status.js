import {h} from 'preact';
import classNames from 'classnames';
import {connect} from 'react-redux';

import * as SocketStatusStore from '../../selectors/socket';
import Section from '../section';

import style from './socket-status.mod.css';

const SocketStatusSection = (props) => {
  const {
    isConnected,
    className
  } = props;

  return (
    <Section
        className={className}
        title="Connection Status"
      >
      { isConnected
        ? <p style={{color: 'green'}}>Connected</p>
        : <p style={{color: 'red'}}>Not Connected</p>
      }
    </Section>
  );
};

export default connect((state) => ({
  isConnected: SocketStatusStore.isConnected(state)
}))(SocketStatusSection);
