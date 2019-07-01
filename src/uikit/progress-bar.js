import {h} from 'preact';
import classNames from 'classnames';

import style from './progress-bar.mod.css';

const ProgressBar = (props) => {
  const {
    progress,
    className
  } = props;

  return (
    <div class={classNames(style.progress, className)}>
      <div class={style.progressBarContainer}>
        <div class={style.progressBar} style={{'--progress': `${progress}%`}} />
      </div>
    </div>
  );
};

export default ProgressBar;
