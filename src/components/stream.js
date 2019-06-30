import {h, Component, Fragment, createRef} from 'preact';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as AccountActions from '../actions/accounts';
import Avatar from './accounts/avatar';
import LoadingSpinner from '../uikit/loading-spinner';

import { ASSETS_URL } from '../constants';
import style from './stream.mod.css';

const GLOBAL_PLAYER_OPTIONS = {
  width: "100%",
  height: "100%",
  controls: false
};

class Stream extends Component {
  constructor(props) {
    super(props);

    this.playerContainer = createRef();
    this.playerContainerID = _.uniqueId('stream_player_');
    this.player = null;
  }

  componentDidMount() {
    const { accountId, account, dispatch } = this.props;

    if(account == null) {
      dispatch(AccountActions.fetchAccount(accountId));
    } else {
      this.updateTwitchPlayer();
    }
  }

  componentDidUpdate(prevProps) {
    const { accountId, account, dispatch } = this.props;

    if(prevProps.accountId != accountId && accountId != null) {
      dispatch(AccountActions.fetchAccount(accountId));
    }

    if(account != null) {
      this.updateTwitchPlayer();
    }
  }

  updateTwitchPlayer() {
    const {
      account,
      quality,
      pause,
      volume,
    } = this.props;

    const {twitch} = account;
    const acceptableTwitch = twitch.toLowerCase();

    if(!this.player && !this.playerContainer.current) {
      return null;
    } else if(!this.player) {
      this.player = new Twitch.Player(this.playerContainerID, {...GLOBAL_PLAYER_OPTIONS});
      this.player.setVolume(0);
    }


    this.player.setChannel(acceptableTwitch);
    this.player.setQuality(quality);
    this.player.setVolume(volume);
    setTimeout(() => console.log(this.player.getQualities()), 2000);

    if(pause && !this.player.isPaused()) {
      this.player.pause();
    } else if(!pause && this.player.isPaused()) {
      this.player.play();
    }
  }

  renderStream() {
    const {account, team, game} = this.props;

    return (
      <div
        class={style.playerContainer}
        id={this.playerContainerID}
        ref={this.playerContainer}
      >
      </div>
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
  VERY_LOW: '160p30',
  LOW: '360p30',
  NORMAL: '480p30',
  HIGH: '720p30',
  SOURCE: 'chunked'
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
