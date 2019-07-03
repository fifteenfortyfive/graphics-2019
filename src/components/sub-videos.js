import {h, Component} from 'preact';
import classNames from 'classnames';
import { connect } from 'react-redux';
import Timeline from 'gsap/TimelineMax';
import _ from 'lodash';

import * as FeaturedStreamActions from '../actions/featured-runs';
import RunnerStream from './runner-stream';
import Stream from './stream';
import LoadingSpinner from '../uikit/loading-spinner';

import {getActiveRunIds, getSortedTeams} from '../selectors/active-runs';

import style from './sub-videos.mod.css';

// Evenly split feature time across the 7 teams.
// Could be dynamic but meh.
const ROTATION_TIME = Math.floor(10 * 1000);

class SubVideos extends Component {
  constructor(props) {
    super(props);

    this.rotationIntervalID = null;

    this.rotateFeatured = this._rotateFeatured.bind(this);

    this.state = {
      featuredIndex: 0,
      featuredId: null
    };
  }

  componentDidMount() {
    const {activeRunIds, dispatch} = this.props;
    const {featuredIndex} = this.state;

    dispatch(FeaturedStreamActions.setFeaturedRun(activeRunIds[featuredIndex]));

    this.rotationIntervalID = setInterval(() => this.rotateFeatured(), ROTATION_TIME);
  }

  componentWillUnmount() {
    clearInterval(this.rotationIntervalID);
    this.rotationIntervalID = null;
  }

  componentDidUpdate(prevProps, prevState) {
    const {featuredIndex, activeRunIds} = this.props;
    const prevFeatured = prevProps.activeRunIds[prevProps.featuredIndex];
    const currFeatured = activeRunIds[featuredIndex];

    if(featuredIndex != prevProps.featuredIndex || prevFeatured != currFeatured) {
      dispatch(FeaturedStreamActions.setFeaturedRun(currFeatured));
    }
  }

  _rotateFeatured() {
    const {activeRunIds, dispatch} = this.props;
    const newFeaturedIndex = (this.state.featuredIndex + 1) % activeRunIds.length;
    const newFeaturedRunId = activeRunIds[newFeaturedIndex];

    this.setState({
      featuredIndex: newFeaturedIndex
    });

    dispatch(FeaturedStreamActions.setFeaturedRun(newFeaturedRunId));
  }

  renderElement(runId) {
    const {featuredRunId} = this.props;

    return (
      <RunnerStream
        runId={runId}
        isFeatured={runId == featuredRunId}
        includeFeaturedIndicator={true}
        quality={Stream.Qualities.LOW}
        volume={0}
      />
    );
  }

  render() {
    const {
      activeRunIds,
      featuredRunId,
      className
    } = this.props;

    return (
      <div class={classNames(style.container, className)}>
        { _.map(activeRunIds, (runId) => {
            return (
              <div key={runId} class={style.element}>
                {this.renderElement(runId)}
              </div>
            );
          })
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const featuredRunId = state.featuredRunId;

  return {
    featuredRunId,
    activeRunIds: getActiveRunIds(state)
  };
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubVideos);
