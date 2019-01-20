import { css, html, property, TemplateResult } from 'lit-element';
import { asyncReplace } from 'lit-html/directives/async-replace';
import { PageViewElement } from '../components/page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../styles/shared-styles.js';

type Definition = Record<'key' | 'label', string>;
const swatArmors: Array<Definition> = [
  {
    key: 'light',
    label: 'Compact',
  },
  {
    key: 'medium',
    label: 'Standard',
  },
  {
    key: 'heavy',
    label: 'Large',
  },
  {
    key: 'advanced',
    label: 'Advanced',
  },
];
const swatClasses: Array<Definition> = [
  {
    key: 'sniper',
    label: 'Covert Sniper',
  },
  {
    key: 'medic',
    label: 'Field Medic',
  },
  {
    key: 'tactician',
    label: 'Tactician',
  },
  {
    key: 'psychologist',
    label: 'Psychologist',
  },
  {
    key: 'maverick',
    label: 'Maverick',
  },
  {
    key: 'ho',
    label: 'Heavy Ordance',
  },
  {
    key: 'demolitions',
    label: 'Demolitions',
  },
  {
    key: 'cyborg',
    label: 'Cyborg',
  },
  {
    key: 'pyrotechnician',
    label: 'Pyrotechnician',
  },
  {
    key: 'watchman',
    label: 'Watchman',
  },
];
const swatSpecs: Array<Definition> = [
  {
    key: '',
    label: 'Weaponry',
  },
  {
    key: '',
    label: 'Power Armor',
  },
  {
    key: '',
    label: 'Energy Cells',
  },
  {
    key: '',
    label: 'Cybernetics',
  },
  {
    key: '',
    label: 'Triage',
  },
  {
    key: '',
    label: 'Chemistry',
  },
  {
    key: '',
    label: 'Leadership',
  },
  {
    key: '',
    label: 'Pack Rat',
  },
  {
    key: '',
    label: 'Espionage',
  },
];
const swatTalents: Array<Definition> = [
  {
    key: 'wiring',
    label: 'Wiring',
  },
  {
    key: 'running',
    label: 'Running',
  },
  {
    key: 'spotting',
    label: 'Spotting',
  },
  {
    key: 'toughness',
    label: 'Toughness',
  },
  {
    key: 'tinkering',
    label: 'Tinkering',
  },
  {
    key: 'hacking',
    label: 'Hacking',
  },
  {
    key: 'courage',
    label: 'Courage',
  },
];
const swatTraits: Array<Definition> = [
  {
    key: 'skilled',
    label: 'Skilled',
  },
  {
    key: 'gifted',
    label: 'Gifted',
  },
  {
    key: 'survivalist',
    label: 'Survivalist',
  },
  {
    key: 'dragoon',
    label: 'Dragoon',
  },
  {
    key: 'acrobat',
    label: 'Acrobat',
  },
  {
    key: 'swift_learner',
    label: 'Swift Learner',
  },
  {
    key: 'healer',
    label: 'Healer',
  },
  {
    key: 'flower_child',
    label: 'Flower Child',
  },
  {
    key: 'chem_reliant',
    label: 'Chem. Reliant',
  },
  {
    key: 'rad_resistant',
    label: 'Rad. Resistant',
  },
  {
    key: 'gadgeteer',
    label: 'Gadgeteer',
  },
  {
    key: 'prowler',
    label: 'Powler',
  },
  {
    key: 'energizer',
    label: 'Energizer',
  },
  {
    key: 'reckless',
    label: 'Reckless',
  },
  {
    key: 'engineer',
    label: 'Engineer',
  },
];
const swatWapons: Array<Definition> = [
  {
    key: 'assault_rifle',
    label: 'Assault Rifle',
  },
  {
    key: 'sniper_rifle',
    label: 'Sniper Rifle',
  },
  {
    key: 'chaingun',
    label: 'Chaingun',
  },
  {
    key: 'rocket_launcher',
    label: 'Rocket Launcher',
  },
  {
    key: 'flamethrower',
    label: 'Flamethrower',
  },
  {
    key: 'laser_rifle',
    label: 'Laser Rifle',
  },
];
const swatDifficulties: Array<Definition> = [
  {
    key: 'defense',
    label: 'Defense',
  },
  {
    key: 'normal',
    label: 'Normal',
  },
  {
    key: 'hard',
    label: 'Hard',
  },
  {
    key: 'insane',
    label: 'Insane',
  },
  {
    key: 'pin',
    label: 'Perfect Insane',
  },
  {
    key: 'nightmare',
    label: 'Nightmare',
  },
  {
    key: 'extinction',
    label: 'Extinction',
  },
];

class UserView extends PageViewElement {
  @property({ type: String })
  public steamId?: string;

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
        ${asyncReplace(this.__fetchSteamAccount(this.steamId))}
        ${asyncReplace(this.__fetchPlayerStats(this.steamId))}
        ${asyncReplace(this.__fetchPlayerInfo(this.steamId))}
      </div>
    `;
  }
  /**
   * Fetches the account associated with a given steam id
   * @param steamId
   */
  async * __fetchSteamAccount(steamId?: string) {
    if (!steamId) {
      return;
    }
    try {
      const profile = await (await fetch(`https://us-central1-swat-reborn.cloudfunctions.net/steam-player-summary?steamId=${steamId}`)).json();
      yield html`
        <section id="profile">
          <img class="image" src="${profile.avatarmedium}" />
          <div class="info">
            <span class="name">${profile.personaname}</span>
            <span class="realname">${profile.realname}</span>
            <span class="country">${profile.loccountrycode}</span>
          </div>
        </section>
      `;
    } catch(e) {
      console.error(e);
      yield html``;
    }
  }
  /**
   * Fetches the stats for a player from the swat servers
   * @param steamId
   */
  async * __fetchPlayerInfo(steamId?: string) {
    if (!steamId) {
      return;
    }

    try {
      const info = await (await fetch(`https://us-central1-swat-reborn.cloudfunctions.net/swat-player-info?steamId=${steamId}`)).json();
      if (info.playerData.renownXP === 0) {
        throw new Error('account has no XP, very likely a bad steamID');
      }
      yield html`
        <section id="swat-data">
          <span>Renown: ${info.playerData.renown}</span>
        </section>
        <section id="ranks">
          <h3>Ranks</h3>
          <h4>Class</h4>
          ${swatClasses.map(this.__generateRankTemplate.bind(this, info.rcpd))}
          <h4>Trait</h4>
          ${swatTraits.map(this.__generateRankTemplate.bind(this, info.rcpd))}
          <h4>Weapon</h4>
          ${swatWapons.map(this.__generateRankTemplate.bind(this, info.rcpd))}
          <h4>Specialization</h4>
          ${swatSpecs.map(this.__generateRankTemplate.bind(this, info.rcpd))}
          <h4>Armor</h4>
          ${swatArmors.map(this.__generateRankTemplate.bind(this, info.rcpd))}
          <h4>Talent</h4>
          ${swatTalents.map(this.__generateRankTemplate.bind(this, info.rcpd))}
        </section>
        `;
    } catch (e) {
      console.error(e);
      yield html``;
      yield html``;
    }
    // <section id="builds">
    //   <h3>Builds</h3>
    //   ${info.builds.map((build: Record<string, string>) => {
    //     return html`
    //       <div class="build">
    //         <div class="row">
    //           <span>${swatClasses.find((def) => {
    //             return def.key === build.class;
    //           })!.label}</span>
    //           <span>r${build.rank}</span>
    //         </div>
    //         <div class="row">
    //           <span>Weapon</span>
    //           <span>${build.weapon}</span>
    //         </div>
    //         <div class="row">
    //           <span>Armor</span>
    //           <span>${build.armor}</span>
    //         </div>
    //         <div class="row">
    //           <span>Trait</span>
    //           <span>${build.trait}</span>
    //         </div>
    //         <div class="row">
    //           <span>Spec</span>
    //           <span>${build.spec}</span>
    //         </div>
    //         <div class="row">
    //           <span>Talent</span>
    //           <span>${build.talent}</span>
    //         </div>
    //       </div>
    //     `;
    //   })}
    // </section>
  }
  /**
   * Fetches the stats for a player from the swat servers
   * @param steamId
   */
  async * __fetchPlayerStats(steamId?: string) {
    if (!steamId) {
      return;
    }

    try {
      const stats = await (await fetch(`https://us-central1-swat-reborn.cloudfunctions.net/swat-player-stats?steamId=${steamId}`)).json();
      yield html`
        <section id="history">
          <h3>Game History</h3>
          ${swatDifficulties.
            map((def) => {
              return html`<span>${def.label}: ${stats.gamesWon[def.key] || 0} / ${stats.gamesLost[def.key] || 0}</span>`;
          })}
        </section>
        <section id="time">
          <h3>Time Played</h3>
          ${swatClasses.
            filter((def) => {
              const timePlayed = stats.timePlayed[def.key];
              return timePlayed && timePlayed > 0;
            }).
            map((def) => {
              const seconds = <number>stats.timePlayed[def.key];
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
      `;
    } catch (e) {
      console.error(e);
      yield html``;
    }
  }
  /**
   * Generates a TemplateResult based on the definition and data object
   * @param obj the object to parse the definition out of
   * @param definition the definition to display
   */
  __generateRankTemplate(obj: Record<string, string>, definition: Definition): TemplateResult {
    return html`<span>${definition.label}: r${obj[definition.key]}</span>`;
  }
}

window.customElements.define('user-view', UserView);