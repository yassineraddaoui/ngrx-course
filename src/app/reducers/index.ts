import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import { routerReducer } from "@ngrx/router-store";
import { AuthActions } from "../auth/action-types";
export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (LOGGABLE_ACTIONS.includes(action.type)) {
      console.log("state before: ", state);
      console.log("action", action);
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];

const LOGGABLE_ACTIONS :string[] = [
  AuthActions.login.type,
  AuthActions.logout.type
];
