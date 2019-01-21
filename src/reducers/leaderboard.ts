import { Reducer } from 'redux';
import {
  UPDATE_LEADERBOARD,
} from '../actions/leaderboard';
import { RootAction } from '../store.js';

export interface LeaderboardState {
  leaderboard: object[];
}

const INITIAL_STATE: LeaderboardState = {
  leaderboard: [],
};

const app: Reducer<LeaderboardState, RootAction> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.leaderboard
      };
    default:
      return state;
  }
};

export default app;
