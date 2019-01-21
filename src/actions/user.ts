import { Action, ActionCreator } from 'redux';
import { SteamProfile, PlayerInfo, PlayerStats } from '../data-structures/user.js';
export const UPDATE_STEAM_PROFILE = 'UPDATE_STEAM_PROFILE';
export const UPDATE_PLAYER_INFO = 'UPDATE_PLAYER_INFO';
export const UPDATE_PLAYER_STATS = 'UPDATE_PLAYER_STATS';

export interface UserActionUpdateSteamProfileState extends Action<'UPDATE_STEAM_PROFILE'> { steamProfile: SteamProfile | null };
export interface UserActionUpdatePlayerInfoState extends Action<'UPDATE_PLAYER_INFO'> { playerInfo: PlayerInfo | null };
export interface UserActionUpdatePlayerStatsState extends Action<'UPDATE_PLAYER_STATS'> { playerStats: PlayerStats | null };

export type UserAction = UserActionUpdateSteamProfileState | UserActionUpdatePlayerInfoState | UserActionUpdatePlayerStatsState;

export const updateSteamProfile: ActionCreator<UserActionUpdateSteamProfileState> = (steamProfile: SteamProfile | null) => {
  return {
    type: UPDATE_STEAM_PROFILE,
    steamProfile,
  };
};
export const updatePlayerInfo: ActionCreator<UserActionUpdatePlayerInfoState> = (playerInfo: PlayerInfo | null) => {
  return {
    type: UPDATE_PLAYER_INFO,
    playerInfo,
  };
};
export const updatePlayerStats: ActionCreator<UserActionUpdatePlayerStatsState> = (playerStats: PlayerStats | null) => {
  return {
    type: UPDATE_PLAYER_STATS,
    playerStats,
  };
};