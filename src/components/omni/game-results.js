import {h, Component, createRef} from 'preact';
import {TimelineMax} from 'gsap/TimelineMax';
import _ from 'lodash';
import style from './team-runs.mod.css';

import Run from '../run';
import SlideCycle from '../../uikit/anim/slide-cycle';


class GameResults extends Component {
  constructor(props) {
    super(props);

    this.container  = createRef();
    this.header     = createRef();
    this.banner     = createRef();
    this.timeline       = new TimelineMax({paused: true});
    this.childTimeline  = new TimelineMax();
  }

  componentDidMount() {
    const {play, onComplete} = this.props;
    this.timeline
        // In
        .set(this.header.current, {opacity: 0})
        .set(this.header.current, {x: -320})
        .to(this.header.current, 0.2, {opacity: 1})
        .to(this.header.current, 0.3, {x: 0, ease: "Power2.easeOut"})
        // Children
        .add(this.childTimeline, "-=0.1")
        // Out
        .to(this.header.current, 0.5, {x: -320, ease: "Power2.easeIn"})
        .eventCallback("onComplete", onComplete)
        .play(play);
  }

  render() {
    const {
      runs,
      game,
    } = this.props;

    return (
      <div class={style.content} ref={this.container} style={{'--color': `#${game.color}`}}>
        <div ref={this.header} class={style.teamHeader}>
          <p>{game.name}</p>
        </div>
        { runs && runs.length > 0 &&
          <SlideCycle
              class={style.content}
              timeline={this.childTimeline}
            >
            { _.map(runs, (run) => (
                <Run
                  className={style.run}
                  key={run.id}
                  run={run.run}
                  runner={run.runner}
                  team={run.team}
                  game={run.game}
                  midRow="team"
                />
              ))
            }
          </SlideCycle>
        }
      </div>
    );
  }
};

export default GameResults;
