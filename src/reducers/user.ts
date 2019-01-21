import { Reducer } from 'redux';
import {
  UPDATE_STEAM_PROFILE,
  UPDATE_PLAYER_INFO,
  UPDATE_PLAYER_STATS,
} from '../actions/user.js';
import { RootAction } from '../store.js';
import { SteamProfile, PlayerInfo, PlayerStats } from '../data-structures/user.js';

export interface UserState {
  steamProfile: SteamProfile | null;
  playerInfo: PlayerInfo | null;
  playerStats: PlayerStats | null;
}

const INITIAL_STATE: UserState = {
  steamProfile: null,
  playerInfo: null,
  playerStats: null,
};

const app: Reducer<UserState, RootAction> = (state: UserState = INITIAL_STATE, action: RootAction) => {
  switch (action.type) {
    case UPDATE_STEAM_PROFILE:
      return {
        ...state,
        steamProfile: action.steamProfile,
      };
    case UPDATE_PLAYER_INFO:
      return {
        ...state,
        playerInfo: action.playerInfo,
      };
    case UPDATE_PLAYER_STATS:
      return {
        ...state,
        playerStats: action.playerStats,
      };
    default:
      return state;
  }
};

export default app;
