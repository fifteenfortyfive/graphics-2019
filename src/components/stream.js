import {h, Component, Fragment} from 'preact';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';

import * as AccountActions from '../actions/accounts';
import Avatar from './accounts/avatar';
import LoadingSpinner from '../uikit/loading-spinner';

import { ASSETS_URL } from '../constants';
import style from './stream.mod.css';

class Stream extends Component {
  componentDidMount() {
    const { accountId, account, dispatch } = this.props;
    if(account == null) {
      dispatch(AccountActions.fetchAccount(accountId));
    }
  }

  componentDidUpdate(prevProps) {
    const { accountId, account, dispatch } = this.props;

    if(prevProps.accountId != accountId && accountId != null) {
      dispatch(AccountActions.fetchAccount(accountId));
    }
  }

  renderStream() {
    const {account, team, game, src, withDetail} = this.props;
    return (
      <Fragment>
        { src &&
          <img
            class={style.streamImg}
            src={src}
          />
        }
      </Fragment>
    );
  }

  render() {
    const {account, team, game, src, loadingAccount} = this.props;

    return (
      <div class={style.stream}>
        { loadingAccount || account == null || team == null || game == null
          ? <LoadingSpinner />
          : this.renderStream()
        }
      </div>
    );
  }
}

// Arbitrarily decided. We don't really show larger than 720, so that makes
// sense as the "HIGH" quality. 240 is still larger than the smallest we
// would display, so it can be "LOW". "NORMAL" is probably useless.
Stream.Qualities = {
  LOW: '240',
  NORMAL: '480',
  HIGH: '720'
}


const mapStateToProps = (state, props) => {
  const {accountId} = props;
  const teamsA = Object.values(state.teams);
  const gamesA = Object.values(state.games);

  return {
    ...state,
    account: state.accounts[accountId],
    team: teamsA[accountId % teamsA.length],
    game: gamesA[accountId % gamesA.length],
    loadingAccount: state.fetching[`accounts.${accountId}`]
  };
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream);
