import {h, Component, createRef} from 'preact';
import {connect} from 'react-redux';
import TimelineMax from 'gsap/TimelineMax';

import Stream from './stream';
import FeaturedIndicator from '../uikit/featured-indicator';

import style from './runner-stream.mod.css';

class RunnerStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatingOut: false,
    }

    this.container = createRef();
    this.timeline = new TimelineMax({paused: true, autoRemoveChildren: true})
  }

  componentDidMount() {
    const {isFeatured} = this.props;

    if(!isFeatured) {
      this.timeline
          .set(this.container.current, {yPercent: 80, opacity: 0})
          .play();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {runId, isFeatured} = this.props;
    const {animatingOut} = this.state;
    const becameFeatured = (!isFeatured && nextProps.isFeatured);

    if(runId != nextProps.runId) {
      this.setState({ animatingOut: true });
      this.animateOut();
      return false;
    } else if(becameFeatured) {
      this.setState({ animatingOut: true });
      this.animateOut();
      return false;
    }

    return !nextState.animatingOut;
  }

  componentDidUpdate(prevProps) {
    const {isFeatured} = this.props;
    const lostFeatured = !isFeatured && prevProps.isFeatured;

    if(lostFeatured) {
      this.prepareAnimateIn();
    }
  }

  prepareAnimateIn() {
    this.timeline
        .set(this.container.current, {yPercent: 80, opacity: 0})
        .play();
  }

  animateIn() {
    this.timeline
        .fromTo(this.container.current, 1.2, {yPercent: 80, opacity: 0}, {yPercent: 0, opacity: 1, ease: "Power3.easeOut"})
        .play();
  }

  animateOut() {
    this.timeline
        .to(this.container.current, 1.2, {yPercent: 80, opacity: 0, ease: "Power3.easeIn"})
        .addCallback(() => this.setState({animatingOut: false}))
        .play();
  }

  render() {
    const {runId, isFeatured, includeFeaturedIndicator} = this.props;
    return (
      <div class={style.container}>
        { includeFeaturedIndicator &&
          <FeaturedIndicator
            className={style.featuredIndicator}
            runId={runId}
          />
        }
        { !isFeatured &&
          <div ref={this.container} class={style.streamHolder}>
            <Stream {...this.props} onStreamReady={() => this.animateIn()} />
          </div>
        }
      </div>
    );
  }
};

export default RunnerStream;
