import {h} from 'preact';
import classNames from 'classnames';

import Avatar from './accounts/avatar';

import { runTime } from '../util';
import style from './run.mod.css';

const Run = (props) => {
  const {game, runner, run, className} = props;

  if(game == null || runner == null || run == null) return null;

  return (
    <div class={classNames(style.run, className)}>
      <div class={style.runnerAvatar}>
        <Avatar src={runner.avatar_object_id} size={48} />
      </div>
      <div class={style.runInfo}>
        <div class={style.runnerName}>{runner.username}</div>
        <div class={style.gameName}>{game.name}</div>
        <div class={style.detail}>
          <span class={style.estimate}>{runTime(run.est_seconds)}</span>
          <span class={style.pb}>{runTime(run.pb_seconds)}</span>
        </div>
      </div>
    </div>
  );
};

export default Run;
