import {h} from 'preact';
import ReactPlayer from 'react-player';

import { ASSETS_URL } from '../constants';

import style from './layout.mod.css';

const Stream = (props) => {
  return (
    <div class={style.stream}>
      <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
    </div>
  );
}

// Arbitrarily decided. We don't really show larger than 720, so that makes
// sense as the "HIGH" quality. 240 is still larger than the smallest we
// would display, so it can be "LOW". "NORMAL" is probably useless.
Stream.Qualities = {
  LOW: '240',
  NORMAL: '480',
  HIGH: '720'
}

export default Stream;
