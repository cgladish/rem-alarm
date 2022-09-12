import { RootState } from "../rootState";
import { State } from "./state";

export const getState = (rootState: RootState): State => rootState.settings;
