import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootState";
import { State } from "./state";

export const getState = (rootState: RootState): State => rootState.alarms;
export const getAlarms = createSelector([getState], (state) => state.alarms);
