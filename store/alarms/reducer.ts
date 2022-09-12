import { combineReducers } from "redux";
import cloneDeep from "lodash/cloneDeep";
import { Action } from "./actions";
import { AlarmInfo, initialState } from "./state";

const alarms = (state = initialState.alarms, action: Action): AlarmInfo[] => {
  switch (action.type) {
    case "@@alarms/ADD": {
      return [
        ...state,
        {
          time: { hours: 0, minutes: 0 },
          repeat: [false, false, false, false, false, false, false],
          enabled: true,
          ...action.payload.data,
        },
      ];
    }
    case "@@alarms/REMOVE": {
      const newState = state.slice();
      newState.splice(action.payload.index, 1);
      return newState;
    }
    case "@@alarms/UPDATE_TIME": {
      const newState = state.slice();
      newState[action.payload.index] = {
        ...newState[action.payload.index],
        time: action.payload.time,
      };
      return newState;
    }
    case "@@alarms/UPDATE_ENABLED": {
      const newState = state.slice();
      newState[action.payload.index] = {
        ...newState[action.payload.index],
        enabled: action.payload.enabled,
      };
      return newState;
    }
    case "@@alarms/UPDATE_REPEAT": {
      const newState = cloneDeep(state);
      newState[action.payload.index].repeat[action.payload.dayOfWeek] =
        action.payload.enabled;
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
