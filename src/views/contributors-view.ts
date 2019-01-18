import { html } from 'lit-element';
import { PageViewElement } from '../components/page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from '../styles/shared-styles.js';

class ContributorsView extends PageViewElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  protected render() {
    return html`
      <section>
        <h2>Contributors</h2>
      </section>
    `;
  }
}

window.customElements.define('contributors-view', ContributorsView);
