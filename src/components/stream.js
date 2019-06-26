import {h, Component} from 'preact';
import { connect } from 'preact-redux';
import ReactPlayer from 'react-player';

import * as AccountActions from '../actions/accounts';

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

  render() {
    const {account, loadingAccount} = this.props;

    if(loadingAccount || account == null) {
      return "Loading Stream Data";
    }

    const {twitch} = account;
    // For some reason ReactPlayer can't deal with capital letters?
    const acceptableTwitch = twitch.toLowerCase();

    return (
      //  <ReactPlayer
      //    className={style.stream}
      //    url={`https://twitch.tv/${acceptableTwitch}`}
      //    playing
      //    config={{
      //      controls: false
      //    }}
      //  />
      <div class={style.stream} />
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

  return {
    ...state,
    account: state.accounts[accountId],
    loadingAccount: state.fetching[`accounts.${accountId}`]
  };
};

const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream);
