import { combineReducers } from "redux";
import { Action } from "./actions";
import { AlarmInfo, initialState } from "./state";

const alarms = (state = initialState.alarms, action: Action): AlarmInfo[] => {
  switch (action.type) {
    case "@@alarms/ADD": {
      return [...state, action.payload.data];
    }
    case "@@alarms/REMOVE": {
      const newState = state.slice();
      newState.splice(action.payload.index, 1);
      return newState;
    }
    case "@@alarms/UPDATE": {
      const newState = state.slice();
      newState.splice(action.payload.index, 1, action.payload.data);
      return newState;
    }
    case "@@alarms/MOVE": {
      const alarm = state[action.payload.index];
      const newState = state.slice();
      newState.splice(action.payload.index, 1);
      newState.splice(action.payload.newIndex, 0, alarm);
      return newState;
    }
    default:
      return state;
  }
};

export const reducer = combineReducers({ alarms });
