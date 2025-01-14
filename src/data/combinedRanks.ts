import { navyRanks } from './navyRanks';
import { armyRanks } from './armyRanks';
import { airForceRanks } from './airForceRanks';
import type { RankData } from '../types';

export const getAllRanks = (): RankData[] => {
  return [
    ...navyRanks,
    ...armyRanks,
    ...airForceRanks
  ];
};
