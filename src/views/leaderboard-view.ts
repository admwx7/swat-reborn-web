import { css, html, property, PropertyValues } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { PageViewElement } from '../components/page-view-element.js';
import { store, RootState } from '../store.js';
// import { Definition, Difficulties } from '../data-structures/swat';
import { SharedStyles } from '../styles/shared-styles.js';
import { updateLeaderboard } from '../actions/leaderboard.js';
import leaderboard from '../reducers/leaderboard.js';

store.addReducers({
  leaderboard
});

class LeaderboardView extends connect(store)(PageViewElement) {
  @property({ type: Object })
  public leaderboard: object | null = null;

  static get styles() {
    return [
      SharedStyles,
      css`
      `,
    ];
  }
  protected render() {
    return html`
    `;
  }
  /**
   * Fetches the account associated with a given steam id
   */
  async fetchData() {
    try {
      const leaderboard = await (await fetch(`https://us-central1-swat-reborn.cloudfunctions.net/swat-leaderboards`)).json();
      store.dispatch(updateLeaderboard(leaderboard));
    } catch(e) {
      console.error(e);
    }
  }

  stateChanged(state: RootState) {
    if (!state || !state.leaderboard) {
      return;
    }
    
    this.leaderboard = state.leaderboard!.leaderboard;
  }
  async update(changedProps: PropertyValues) {
    if (changedProps.has('active') && this.active) {
      try {
        await this.fetchData()
      } catch(e) { }
    }
    super.update(changedProps);
  }
}

window.customElements.define('leaderboard-view', LeaderboardView);
