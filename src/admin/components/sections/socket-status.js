import {h} from 'preact';
import classNames from 'classnames';
import {connect} from 'react-redux';

import * as SocketStatusStore from '../../selectors/socket';

import style from './socket-status.mod.css';

const SocketStatusSection = (props) => {
  const {
    isConnected,
    className
  } = props;

  return (
    <div class={classNames(style.section, className)}>
      <h1 class={style.sectionTitle}>Socket Connection Status</h1>

      <div class={style.sectionContent}>
        { isConnected
          ? <p style={{color: 'green'}}>Connected</p>
          : <p style={{color: 'red'}}>Not Connected</p>
        }
      </div>
    </div>
  );
};

export default connect((state) => ({
  isConnected: SocketStatusStore.isConnected(state)
}))(SocketStatusSection);
