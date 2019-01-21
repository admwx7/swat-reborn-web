import { Action, ActionCreator } from 'redux';
export const UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD';

export interface LeaderboardActionUpdateLeaderboardState extends Action<'UPDATE_LEADERBOARD'> { leaderboard: object[] }; // TODO: make a real object
export type LeaderboardAction = LeaderboardActionUpdateLeaderboardState;

export const updateLeaderboard: ActionCreator<LeaderboardActionUpdateLeaderboardState> = (leaderboard: object[]) => {
  return {
    type: UPDATE_LEADERBOARD,
    leaderboard,
  };
};