import { createContext, Dispatch, Reducer } from "react";

type State = {};

type Action = {
  type: ActionType;
  payload?: any;
};

export enum ActionType {}

export const defaultAppState: State = {};

export const appReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    default:
      throw new Error();
  }
};

export const AppContext = createContext<
  State & {
    dispatch: Dispatch<Action>;
  }
>({
  ...defaultAppState,
  dispatch: () => {},
});
