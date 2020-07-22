import { Reducer } from 'redux';


const initialState: CoreSate = {
  status: 'uninitialize',
}

interface CoreSate {
  status: string;
}

export interface ApplicationState {
  core: CoreSate;
  module: any;
}


const actionCreators = {
  updateCore: (status: string) => ({
    type: CoreActionTypes.UpdateCore,
    payload: status,
  }),
};

export enum CoreActionTypes {
  UpdateCore = 'Core/Update',
}

export interface CoreUpdateActionType {
  type: typeof CoreActionTypes.UpdateCore;
  payload:  string;
}


const thunkActionCreators = {
  // getInitialState: () => async (dispatch: Dispatch) => {
  //   // TODO: export api call to service
  //   const data = await fetch('/db.json').then(response => response.json());
  //   dispatch(actionCreators.addShipments(data.shipments));
  // }
};

export const coreActions = { ...actionCreators, ...thunkActionCreators };

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