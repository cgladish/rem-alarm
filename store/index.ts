import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reducer as alarmsReducer } from "./alarms/reducer";
import { preloadedState } from "./rootState";

const reducer = combineReducers({
  alarms: alarmsReducer,
});

export const store = configureStore({ reducer, preloadedState });

export type Dispatch = typeof store.dispatch;

export * from "./rootState";
