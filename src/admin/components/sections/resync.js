import {h, Component} from 'preact';
import {connect} from 'react-redux';

import * as RemoteControlActions from '../../actions/remote-control';
import Section from '../section';
import Button from '../button';

import {CollectionTypes} from '../../../constants';

class ResyncSection extends Component {
  refresh(collection) {
    const {dispatch} = this.props;
    dispatch(RemoteControlActions.pushForceResync(collection));
  }

  render() {
    const {
      className,
      dispatch
    } = this.props;

    return (
      <Section
          className={className}
          title="Force Data Resync"
        >
        <p>Use these buttons to force the layout to reload all of that kind of data without having to refresh the whole page.</p>

        <Button
            onClick={() => this.refresh(CollectionTypes.ACCOUNTS)}
          >
          Refresh Accounts
        </Button>
        <Button
            onClick={() => this.refresh(CollectionTypes.EVENT)}
          >
          Refresh Event
        </Button>
        <Button
            onClick={() => this.refresh(CollectionTypes.GAMES)}
          >
          Refresh Games
        </Button>
        <Button
            onClick={() => this.refresh(CollectionTypes.RUNS)}
          >
          Refresh Runs
        </Button>
        <Button
            onClick={() => this.refresh(CollectionTypes.TEAMS)}
          >
          Refresh Teams
        </Button>
      </Section>
    );
  }
};

export default connect()(ResyncSection);
