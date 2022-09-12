import { combineReducers } from "redux";
import { Action } from "./actions";
import { State, initialState } from "./state";

const timeToFallAsleepMinutes = (
  state = initialState.timeToFallAsleepMinutes,
  action: Action
): number => {
  switch (action.type) {
    case "@@settings/UPDATE_TIME_TO_FALL_ASLEEP": {
      return action.payload.data;
    }
    default:
      return state;
  }
};

const remCycleLengthMinutes = (
  state = initialState.remCycleLengthMinutes,
  action: Action
): number => {
  switch (action.type) {
    case "@@settings/UPDATE_REM_CYCLE_LENGTH": {
      return action.payload.data;
    }
    default:
      return state;
  }
};

export const reducer = combineReducers({
  timeToFallAsleepMinutes,
  remCycleLengthMinutes,
});
