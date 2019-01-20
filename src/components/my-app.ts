import { LitElement, html, css, property, PropertyValues, TemplateResult } from 'lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store, RootState } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateDrawerState
} from '../actions/app.js';

// The following line imports the type only - it will be removed by tsc so
// another import for app-drawer.js is required below.
import { AppDrawerElement } from '@polymer/app-layout/app-drawer/app-drawer.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { downloadIcon, menuIcon, discordIcon } from '../styles/my-icons.js';

interface LinkOptions {
  classList?: String[];
  selectable?: Boolean;
}
interface MenuItem {
  icon?: TemplateResult;
  label: String;
  name?: String;
  path: String;
  target?: String;
}
class MyApp extends connect(store)(LitElement) {
  @property({type: String})
  appTitle = '';
  @property({type: String})
  private _page = '';
  @property({type: Boolean})
  private _drawerOpened = false;

  private _menuItems: Array<MenuItem> = [
    {
      label: 'Home',
      name: 'home',
      path: '/home',
    },
    {
      label: 'User Stats',
      name: 'user',
      path: '/user',
    },
  ];
  private _floatingButtons: Array<MenuItem> = [
    {
      icon: discordIcon,
      label: 'Find a Squad',
      path: 'https://discord.gg/AXqq37r',
      target: '_blank',
    },
    {
      icon: downloadIcon,
      label: 'Download Map',
      path: 'https://steamcommunity.com/sharedfiles/filedetails/?id=725282388',
      target: '_blank',
    },
  ];

  static get styles() {
    return [
      css`
      :host {
        display: block;
        background-color: var(--app-background-color);
        color: var(--app-light-text-color);

        --app-drawer-width: 256px;

        --app-primary-color: #aa80ff;
        --app-secondary-color: #FFF200;
        --app-background-color: black;
        --app-dark-text-color: var(--app-secondary-color);
        --app-light-text-color: white;
        --app-section-even-color: rgba(255, 255, 255, 0.25);
        --app-section-odd-color: black;

        --app-header-background-color: var(--app-background-color);
        --app-header-text-color: var(--app-dark-text-color);
        --app-header-selected-color: var(--app-primary-color);

        --app-drawer-background-color: var(--app-background-color);
        --app-drawer-text-color: var(--app-light-text-color);
        --app-drawer-selected-color: var(--app-primary-color);
      }
      app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);
      }
      .toolbar-top {
        background-color: var(--app-header-background-color);
      }
      [main-title] {
        font-size: 32px;
        font-weight: bold;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
        line-height: 28px;
      }
      #floating-menu {
        position: fixed;
        right: 0;
        bottom: 0;
        padding-right: 16px;
        padding-bottom: 16px;
        display: flex;
        flex-direction: column;
      }
      .floating-button svg {
        display: block;
        height: 44px;
        width: 44px;
      }
      .floating-button {
        position: relative;
        margin-bottom: 8px;
        color: var(--app-light-text-color);
        fill: var(--app-light-text-color);
        border-radius: 5px;
      }
      .floating-button:hover:after {
        display: block;
        position: absolute;
        right: 100%;
        top: 50%;
        width: 120px;
        text-align: right;
        transform: translateY(-50%);
        content: attr(aria-label);
        color: inherit;
        padding-right: 6px;
      }
      .floating-button, .floating-button:hover:after {
        background-color: var(--app-background-color);
        border-radius: 6px;
      }
      .floating-button:hover {
        color: var(--app-primary-color);
        fill: var(--app-primary-color);
      }
      .toolbar-list {
        display: none;
      }
      .toolbar-list > a {
        display: inline-block;
        color: var(--app-header-text-color);
        text-decoration: none;
        line-height: 30px;
        padding: 4px 16px;
        fill: var(--app-header-text-color);
      }
      .toolbar-list > a svg {
        margin-bottom: -6px;
      }
      .toolbar-list > a[selected] {
        color: var(--app-header-selected-color);
        border-bottom: 4px solid var(--app-header-selected-color);
        fill: var(--app-header-selected-color);
      }
      .menu-btn {
        background: none;
        border: none;
        fill: var(--app-header-text-color);
        cursor: pointer;
        height: 44px;
        width: 44px;
      }
      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 16px 0 16px 16px;
        background: var(--app-drawer-background-color);
        position: relative;
      }
      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }
      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
        border-right: 4px solid var(--app-header-selected-color);
        font-weight: bold;
      }
      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }
      .main-content {
        padding-top: 64px;
        min-height: 100vh;
      }
      .page {
        display: none;
      }
      .page[active] {
        display: block;
      }
      .footer-link {
        color: var(--app-light-text-color);
      }
      footer {
        padding: 16px;
        background: var(--app-drawer-background-color);
        color: var(--app-drawer-text-color);
        text-align: center;
      }
      footer > p {
        margin-top: 4px;
        margin-bottom: 4px;
        font-size: 10pt;
      }
      /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout */
      @media (min-width: 460px) {
        .toolbar-list {
            display: block;
          }
          .menu-btn {
            display: none;
          }
          .main-content {
            padding-top: 107px;
          }
          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }
      `
    ];
  }
  protected render() {
    // Anything that's related to rendering should be done in here.
    return html`
      <!-- Header -->
      <app-header condenses reveals effects="waterfall">
        <app-toolbar class="toolbar-top">
          <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">${menuIcon}</button>
          <div main-title>${this.appTitle}</div>
        </app-toolbar>

        <!-- This gets hidden on a small screen-->
        <nav class="toolbar-list">
          ${this._menuItems.map(this._generateLink.bind(this, { selectable: true }))}
        </nav>
      </app-header>

      <!-- Drawer content -->
      <app-drawer
          .opened="${this._drawerOpened}"
          @opened-changed="${this._drawerOpenedChanged}">
        <nav class="drawer-list">
          ${this._menuItems.map(this._generateLink.bind(this, { selectable: true }))}
        </nav>
      </app-drawer>

      <section id="floating-menu">
        ${this._floatingButtons.map(this._generateLink.bind(this, { classList: ['floating-button'] }))}
      </section>

      <!-- Main content -->
      <main role="main" class="main-content">
        <home-view class="page" ?active="${this._page === 'home'}"></home-view>
        <contributors-view class="page" ?active="${this._page === 'contributors'}"></contributors-view>
        <user-view class="page" ?active="${this._page === 'user'}"></user-view>
        <not-found-view class="page" ?active="${this._page === '404'}"></not-found-view>
      </main>

      <footer>
        <p>SWAT: Reborn is a downloadable <a class="footer-link" href="https://steamcommunity.com/sharedfiles/filedetails/?id=725282388">Custom Map</a> for Dota 2 by <a href="/contributors" class="footer-link">Many Contributors</a></p>
        <p>Based on an original mod for Warcraft 3: The Frozen Throne, by <a class="footer-link" href="http://redscull.com/swat/readmeafter.html">Red of Redscull</a>
      </footer>
    `;
  }
  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }
  protected firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installMediaQueryWatcher(`(min-width: 460px)`,
      () => store.dispatch(updateDrawerState(false)));
  }
  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }
  private _generateLink(options: LinkOptions, item: MenuItem) {
    return html`<a href="${item.path}" class="${(options.classList || []).join(' ')}" ?selected="${options.selectable && this._page === item.name}" target="${item.target || ''}" aria-label="${item.label}">${item.icon || item.label}</a>`;
  }
  private _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }
  private _drawerOpenedChanged(e: Event) {
    store.dispatch(updateDrawerState((e.target as AppDrawerElement).opened));
  }
  stateChanged(state: RootState) {
    this._page = state.app!.page;
    this._drawerOpened = state.app!.drawerOpened;
  }
}

window.customElements.define('my-app', MyApp);
