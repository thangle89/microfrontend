import { Reducer } from 'redux';
import { CoreUpdateActionType, CoreActionTypes } from 'core/store';

const initialState: CoreSate = {
  status: 'uninitialize',
}

interface CoreSate {
  status: string;
}
export interface ApplicationState {
  core: CoreSate;
  [key: string]: any;
}

export const reducer: Reducer<CoreSate> = (
  state: CoreSate = initialState,
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