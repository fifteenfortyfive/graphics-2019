import {createSelector} from '../util';
import _ from 'lodash';

const getRuns = (state) => state.runs;
const getTeams = (state) => state.teams;

export const getSortedRunsByTeam = createSelector(
  [getRuns],
  (runs) => _.chain(Object.values(runs))
      .sortBy('index')
      .groupBy('team_id')
      .value()
);

export const getSortedTeams = createSelector(
  [getTeams],
  (teams) => _.sortBy(teams, 'id')
);


export const getActiveRunIds = createSelector(
  [getSortedRunsByTeam, getSortedTeams],
  (sortedRunsByTeam, teams) => {
    return _.chain(teams)
      .map((team) => {
        const runs = sortedRunsByTeam[team.id];
        return _.find(runs, {'finished': false});
      })
      .map('id')
      .value();
  }
);
