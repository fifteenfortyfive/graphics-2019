import {h, Component} from 'preact';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Timeline from 'gsap/TimelineMax';
import _ from 'lodash';

import Stream from './stream';
import LoadingSpinner from '../uikit/loading-spinner';
import FeaturedIndicator from '../uikit/featured-indicator';

import style from './sub-videos.mod.css';

class SubVideos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      className
    } = this.props;

    return (
      <div class={classNames(style.container, className)}>
        <div class={style.element}>
          <Stream
            accountId={94}
            quality={Stream.Qualities.VERY_LOW}
          />
        </div>
        <div class={style.element}>
          <Stream
            accountId={52}
            quality={Stream.Qualities.VERY_LOW}
          />
        </div>
        <div class={style.element}>
          <Stream
            accountId={59}
            quality={Stream.Qualities.VERY_LOW}
          />
        </div>
        <div class={style.element}>
          <Stream
            accountId={62}
            quality={Stream.Qualities.VERY_LOW}
          />
        </div>
        <div class={classNames(style.element, style.featured)}>
          <FeaturedIndicator />
        </div>
        <div class={style.element}>
          <Stream
            accountId={165}
            quality={Stream.Qualities.VERY_LOW}
          />
        </div>
        <div class={style.element}>
          <Stream
            accountId={35}
            quality={Stream.Qualities.VERY_LOW}
          />
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  runs: state.runs
});

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubVideos);
