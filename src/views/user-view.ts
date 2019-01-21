import { css, html, property, TemplateResult } from 'lit-element';
import { cache } from 'lit-html/directives/cache.js';
import { PageViewElement } from '../components/page-view-element.js';

// These are the shared styles needed by this element.
import { Armors, Classes, Definition, Difficulties, Specializations, Talents, Traits, Weapons } from '../data-structures/swat.js';
import { SharedStyles } from '../styles/shared-styles.js';
import { RootState, store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { updateSteamProfile, updatePlayerInfo, updatePlayerStats } from '../actions/user.js';
import { SteamProfile, PlayerStats, PlayerInfo } from '../data-structures/user.js';

import user from '../reducers/user.js';

store.addReducers({
  user,
});

class UserView extends connect(store)(PageViewElement) {
  @property({ type: Object })
  public steamProfile: SteamProfile | null = null;
  @property({ type: Object })
  public playerInfo: PlayerInfo | null = null;
  @property({ type: Object })
  public playerStats: PlayerStats | null = null;
  get steamId(): string | null {
    return this._steamId;
  }
  set steamId(steamId: string | null) {
    this._steamId = steamId;
    this.fetchData(steamId);
  }

  private _steamId: string | null = null;

  static get styles() {
    return [
      SharedStyles,
      css`
        .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        section {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          padding: 0;
          justify-content: space-around;
          order: 2;
        }
        section > * {
          text-align: center;
        }
        section > h3 {
          flex: 0 0 100%;
          margin: 8px 0 0 0;
        }
        section > *:not(h3) {
          padding: 8px 12px;
        }
        h4 {
          width: 100%;
          margin: 0;
        }
        .build {
          display: flex;
          flex-direction: column;
          flex: 0 0 180px;
        }
        .container > * {
          flex: 0 0 50%;
        }
        .image {
          flex: 0 0 auto;
          padding: 0;
          margin: 0;
        }
        .info {
          flex: 1 1 auto;
          padding: 0;
          margin: 0;
        }
        .info > .name {
          display: block;
          font-size: 24pt;
        }
        .info > .realname, .info > .country {
          font-size: 12pt;
        }
        .info > .country {
          padding-left: 24px;
        }
        .row {
          display: flex;
          justify-content: space-between;
        }
        #profile, #swat-data {
          flex: 0 0 calc(50% - 16px);
          order: 1;
        }
        #history, #builds {
          flex: 0 0 100%;
          background: var(--app-section-even-color);
        }
      `,
    ];
  }
  protected render() {
    return html`
      <input id="input" value="76561197989968419" placeholder="Steam ID" />
      <button @click="${() => { this.steamId = (<any>this.shadowRoot!.querySelector('#input'))!.value; }}">Submit</button>
      <div class="container">
        ${cache(this.steamProfile ?
          html`
            <section id="profile">
              <img class="image" src="${this.steamProfile!.avatarmedium}" />
              <div class="info">
                <span class="name">${this.steamProfile!.personaname}</span>
                <span class="realname">${this.steamProfile!.realname}</span>
                <span class="country">${this.steamProfile!.loccountrycode}</span>
              </div>
            </section>
          ` :
          html``
        )}
        ${cache(this.playerStats ?
          html`
            <section id="history">
              <h3>Game History</h3>
              ${Difficulties.
                map((def: Definition) => {
                  return html`<span>${def.label}: ${this.playerStats!.gamesWon[def.key] || 0} : ${this.playerStats!.gamesLost[def.key] || 0}</span>`;
              })}
            </section>
            <section id="time">
              <h3>Time Played</h3>
              ${Classes.
                filter((def) => {
                  const timePlayed = this.playerStats!.timePlayed[def.key];
                  return timePlayed && timePlayed > 0;
                }).
                map((def) => {
                  const seconds = <number>this.playerStats!.timePlayed[def.key];
                  const minutes = Math.floor(seconds / 60);
                  const hours = Math.floor(minutes / 60);
                  const days = Math.floor(hours / 24);
                  const timestamp = [
                    days.toString() + 'd',
                    (hours % 24).toString().padStart(2, '0').slice(-2) + 'h',
                    (minutes % 60).toString().padStart(2, '0').slice(-2) + 'm',
                    (seconds % 60).toString().padStart(2, '0').slice(-2) + 's',
                  ].join(' ');

                  return html`<span>${def.label}: ${timestamp}</span>`;
              })}
            </section>
            ` :
            html``
        )}
        ${cache(this.playerInfo ?
          html`
            <section id="swat-data">
              <span>Renown: ${this.playerInfo!.playerData.renown}</span>
            </section>
            <section id="ranks">
              <h3>Ranks</h3>
              <h4>Class</h4>
              ${Classes.map(this.__generateRankTemplate.bind(this, this.playerInfo!.rcpd))}
              <h4>Trait</h4>
              ${Traits.map(this.__generateRankTemplate.bind(this, this.playerInfo!.rcpd))}
              <h4>Weapon</h4>
              ${Weapons.map(this.__generateRankTemplate.bind(this, this.playerInfo!.rcpd))}
              <h4>Specialization</h4>
              ${Specializations.map(this.__generateRankTemplate.bind(this, this.playerInfo!.rcpd))}
              <h4>Armor</h4>
              ${Armors.map(this.__generateRankTemplate.bind(this, this.playerInfo!.rcpd))}
              <h4>Talent</h4>
              ${Talents.map(this.__generateRankTemplate.bind(this, this.playerInfo!.rcpd))}
            </section>
            ` :
            html``
        )}
      </div>
    `;
  }
  async fetchData(steamId: string | null = this.steamId) {
    const [steamProfile, playerInfo, playerStats] = await Promise.all([
      this.__fetchSteamAccount(steamId),
      this.__fetchPlayerInfo(steamId),
      this.__fetchPlayerStats(steamId),
    ]);
    store.dispatch(updateSteamProfile(steamProfile));
    store.dispatch(updatePlayerInfo(playerInfo));
    store.dispatch(updatePlayerStats(playerStats));
  }
  /**
   * Fetches the account associated with a given steam id
   * @param steamId
   */
  async __fetchSteamAccount(steamId: string | null): Promise<object | null> {
    if (!steamId) {
      return null;
    }
    try {
      return await (await fetch(`https://us-central1-swat-reborn.cloudfunctions.net/steam-player-summary?steamId=${steamId}`)).json();
    } catch(e) {
      console.error(e);
      return null;
    }
  }
  /**
   * Fetches the stats for a player from the swat servers
   * @param steamId
   */
  async __fetchPlayerInfo(steamId: string | null) {
    if (!steamId) {
      return null;
    }

    try {
      return await (await fetch(`https://us-central1-swat-reborn.cloudfunctions.net/swat-player-info?steamId=${steamId}`)).json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  /**
   * Fetches the stats for a player from the swat servers
   * @param steamId
   */
  async __fetchPlayerStats(steamId: string | null) {
    if (!steamId) {
      return null;
    }

    try {
      return await (await fetch(`https://us-central1-swat-reborn.cloudfunctions.net/swat-player-stats?steamId=${steamId}`)).json();
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  /**
   * Generates a TemplateResult based on the definition and data object
   * @param obj the object to parse the definition out of
   * @param definition the definition to display
   */
  __generateRankTemplate(obj: Record<string, string | number>, definition: Definition): TemplateResult {
    return html`<span>${definition.label}: r${obj[definition.key]}</span>`;
  }

  stateChanged(state: RootState) {
    if (!state || !state.user) {
      return;
    }
    console.log(state.user);

    this.steamProfile = state.user!.steamProfile;
    this.playerInfo = state.user!.playerInfo;
    this.playerStats = state.user!.playerStats;
  }
}

window.customElements.define('user-view', UserView);
