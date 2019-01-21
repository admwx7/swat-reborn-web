import { CharacterBuild, Achievement } from './swat.js';

export interface SteamProfile {
  avatar: string;
  avatarfull: string;
  avatarmedium: string;
  commentpermission: number;
  communityvisibilitiystate: number;
  lastlogoff: number;
  loccityid: number;
  loccountrycode: number;
  locstatecode: number;
  personaname: string;
  personastate: number;
  personastateflags: number;
  primaryclanid: string;
  profilestate: number;
  profileurl: string;
  realname: string;
  steamid: string;
  timecreated: number;
}
export interface PlayerInfo {
  builds: Array<CharacterBuild>;
  playerData: Record<'difficultiesBeaten' | 'renown' | 'renownXP', number>;
  rcpd: Record<string, number>;
  steamId: string;
}
export interface PlayerStats {
  achievementScore: number;
  achievements: Array<Achievement>;
  gamesLost: Record<string, number>;
  gamesWon: Record<string, number>;
  timePlayed: Record<string, number>;
}
