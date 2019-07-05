import {h} from 'preact';
import {connect} from 'react-redux';

import * as FeaturedRunStore from '../../../selectors/featured-run';
import * as RemoteControlActions from '../../actions/remote-control';
import Section from '../section';
import Run from '../../../components/run';
import Button from '../button';

import {CollectionTypes} from '../../../constants';
import style from './featured-run.mod.css';

function refresh(dispatch) {
  return dispatch(RemoteControlActions.pushForceResync(CollectionTypes.ACCOUNTS));
}

const FeaturedRunSection = (props) => {
  const {
    featuredRunId,
    className,
    dispatch
  } = props;

  return (
    <Section
        className={className}
        title="Featured Run"
      >
      <Run
        className={style.run}
        runId={featuredRunId}
      />
      <p>Run ID: <strong>{featuredRunId}</strong></p>

      <div class={style.actions}>
        <Button>Rotate</Button>
        <Button onClick={() => refresh(dispatch)}>Refresh Accounts</Button>
      </div>
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
)(FeaturedRunSection)
