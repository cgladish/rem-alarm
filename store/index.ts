import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { Dispatch as _Dispatch } from "redux";
import { Action as AlarmsAction } from "./alarms/actions";
import { reducer as alarmsReducer } from "./alarms/reducer";
import { preloadedState } from "./rootState";

const reducer = combineReducers({
  alarms: alarmsReducer,
});

export const store = configureStore({ reducer, preloadedState });

export type Action = AlarmsAction;

export type Dispatch = _Dispatch<Action>;

export * from "./rootState";
