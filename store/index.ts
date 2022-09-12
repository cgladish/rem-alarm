import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { Dispatch as _Dispatch } from "redux";
import { Action as AlarmsAction } from "./alarms/actions";
import { reducer as alarmsReducer } from "./alarms/reducer";
import { Action as SettingsAction } from "./settings/actions";
import { reducer as settingsReducer } from "./settings/reducer";
import { preloadedState } from "./rootState";

const reducer = combineReducers({
  alarms: alarmsReducer,
  settings: settingsReducer,
});

export const store = configureStore({ reducer, preloadedState });

export type Action = AlarmsAction | SettingsAction;

export type Dispatch = _Dispatch<Action>;

export * from "./rootState";
