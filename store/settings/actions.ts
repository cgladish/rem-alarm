export type UPDATE_TIME_TO_FALL_SLEEP = {
  type: "@@settings/UPDATE_TIME_TO_FALL_ASLEEP";
  payload: { data: number };
};

export type UPDATE_REM_CYCLE_LENGTH = {
  type: "@@settings/UPDATE_REM_CYCLE_LENGTH";
  payload: { data: number };
};

export type Action = UPDATE_TIME_TO_FALL_SLEEP | UPDATE_REM_CYCLE_LENGTH;
