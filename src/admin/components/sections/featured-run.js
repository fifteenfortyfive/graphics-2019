import {h} from 'preact';
import {connect} from 'react-redux';

import {getStreamState} from '../../selectors/stream';
import * as FeaturedRunStore from '../../../selectors/featured-run';
import Section from '../section';
import Run from '../../../components/run';

const FeaturedRun = (props) => {
  const {
    featuredRunId,
    className
  } = props;

  return (
    <Section
        className={className}
        title="Featured Run"
      >
      <p>Run ID: <strong>{featuredRunId}</strong></p>
      <Run runId={featuredRunId} />
    </Section>
  );
};


const mapStateToProps = (state, props) => {
  return {
    featuredRunId: FeaturedRunStore.getFeaturedRunId(state)
  };
};

export default connect(
  mapStateToProps
)(FeaturedRun)
