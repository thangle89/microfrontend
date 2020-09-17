import { Reducer } from 'redux';
import { CoreUpdateActionType, CoreActionTypes, CommonState, ModuleSelector, SelectorsUpdateActionType, ApplicationCoreState } from 'core/store';

const initialState: CommonState = {
  status: 'uninitialize',
}

export interface ApplicationState extends ApplicationCoreState {
  [key: string]: any;
}

export const reducer: Reducer<CommonState> = (
  state: CommonState = initialState,
  action: CoreUpdateActionType
) => {
  switch (action.type) {
    case CoreActionTypes.UpdateCore:

      return {
        status: action.payload,
      };
  }
  return state;
};

export const selectorsReducer: Reducer<ModuleSelector> = (
  state: ModuleSelector = {},
  action: SelectorsUpdateActionType,
) => {
  switch (action.type) {
    case CoreActionTypes.UpdateSelectors:

      return {
        ...state,
        ...action.payload,
      };
  }
  return state;
};