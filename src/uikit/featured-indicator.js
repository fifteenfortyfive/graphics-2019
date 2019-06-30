import {h} from 'preact';

import style from './featured-indicator.mod.css';

const FeaturedIndicator = (props) => {
  return (
    <div class={style.container}>
      <div class={style.spinner}>
        ^^^
      </div>
    </div>
  );
};

export default FeaturedIndicator;
