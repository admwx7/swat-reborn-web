import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store.js';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const UPDATE_OFFLINE = 'UPDATE_OFFLINE';
export const UPDATE_DRAWER_STATE = 'UPDATE_DRAWER_STATE';
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export interface AppActionUpdatePage extends Action<'UPDATE_PAGE'> {page: string};
export interface AppActionUpdateOffline extends Action<'UPDATE_OFFLINE'> {offline: boolean};
export interface AppActionUpdateDrawerState extends Action<'UPDATE_DRAWER_STATE'> {opened: boolean};
export interface AppActionOpenSnackbar extends Action<'OPEN_SNACKBAR'> {};
export interface AppActionCloseSnackbar extends Action<'CLOSE_SNACKBAR'> {};
export type AppAction = AppActionUpdatePage | AppActionUpdateOffline | AppActionUpdateDrawerState | AppActionOpenSnackbar | AppActionCloseSnackbar;

type ThunkResult = ThunkAction<void, RootState, undefined, AppAction>;

export const navigate: ActionCreator<ThunkResult> = (path: string) => (dispatch) => {
  // Extract the page name from path.
  const page = path === '/' ? 'home' : path.slice(1);

  // Any other info you might want to extract from the path (like page type),
  // you can do here
  dispatch(loadPage(page));

  // Close the drawer - in case the *path* change came from a link in the drawer.
  dispatch(updateDrawerState(false));
};

const loadPage: ActionCreator<ThunkResult> = (page: string) => (dispatch) => {
  switch(page) {
    case 'home':
      import('../views/home-view.js').then((_module) => {
        // Put code in here that you want to run every time when
        // navigating to view1 after my-view1.js is loaded.
      });
      break;
    case 'contributors':
      import('../views/contributors-view.js');
      break;
    case 'user':
      import('../views/user-view.js');
      break;
    default:
      page = '404';
      import('../views/not-found-view.js');
  }

  dispatch(updatePage(page));
};

const updatePage: ActionCreator<AppActionUpdatePage> = (page: string) => {
  return {
    type: UPDATE_PAGE,
    page
  };
};

export const updateDrawerState: ActionCreator<AppActionUpdateDrawerState> = (opened: boolean) => {
  return {
    type: UPDATE_DRAWER_STATE,
    opened
  };
};
