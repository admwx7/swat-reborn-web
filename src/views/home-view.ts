import { css, html } from 'lit-element';
import { PageViewElement } from '../components/page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../styles/shared-styles.js';

class HomeView extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        section {
          text-align: center;
          padding: 16px;
        }
        section:nth-of-type(even) {
          background: var(--app-section-even-color);
        }
      `,
    ];
  }

  protected render() {
    return html`
      <section>
        <h2>Features</h2>
        <p>Coming Soon</p>
      </section>
      <section>
        <h2>Tips</h2>
        <p>Coming Soon</p>
      </section>
    `;
  }
}

window.customElements.define('home-view', HomeView);
