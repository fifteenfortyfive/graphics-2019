import {h, Component, createRef} from 'preact';
import {connect} from 'react-redux';
import TimelineMax from 'gsap/TimelineMax';

import Stream from './stream';

import style from './runner-stream.mod.css';

class RunnerStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatingOut: false,
      hasAnimatedIn: false,
    }

    this.container = createRef();
    this.timeline = new TimelineMax({paused: true, autoRemoveChildren: true})
  }

  componentDidMount() {
    this.timeline
        .set(this.container.current, {yPercent: 80, opacity: 0})
        .play();
  }

  componentShouldUpdate(nextProps) {
    const {runId} = props;
    if(runId != nextProps.runId) {
      this.setState({ animatingOut: true });
      this.animateOut();
      return false;
    }
  }

  animateIn() {
    this.timeline
        .to(this.container.current, 0.8, {yPercent: 0, opacity: 1, ease: "Power3.easeOut"})
        .play();
  }

  animateOut() {
    this.timeline
        .to(this.container.current, 0.8, {yPercent: 80, opacity: 0, ease: "Power3.easeOut"})
        .addCallback(() => this.setState({animatingOut: false}))
        .play();
  }

  render() {
    return (
      <div ref={this.container} class={style.container}>
        <Stream {...this.props} onStreamReady={() => this.animateIn()} />
      </div>
    );
  }
};

export default RunnerStream;
