import { ApplicationState, initialState, Shipment } from 'store';
import { Reducer, Dispatch } from 'redux';
import fetch from 'isomorphic-fetch';
import { ShipmentsActionTypes, ShipmentsActions } from './type';

const actionCreators = {
  addShipments: (shipments: Shipment[]) => ({
    type: ShipmentsActionTypes.Add,
    payload: shipments
  }),
  // TODO: add thunk action to call api for database update
  updateName: (shipment: Shipment) => ({
    type: ShipmentsActionTypes.UpdateName,
    payload: shipment
  })
};

const thunkActionCreators = {
  getInitialState: () => async (dispatch: Dispatch) => {
    // TODO: export api call to service
    const data = await fetch('/db.json').then(response => response.json());
    dispatch(actionCreators.addShipments(data.shipments));
  }
};

export const shipmentActions = { ...actionCreators, ...thunkActionCreators };

export const reducer: Reducer<ApplicationState> = (
  state: ApplicationState = initialState,
  action: ShipmentsActions
) => {
  const currentShiments = { ...state.shipments };
  switch (action.type) {
    case ShipmentsActionTypes.Add:
      const currentIds = state.shipmentIds.slice();
      action.payload.forEach(shipment => {
        currentShiments[shipment.id] = shipment;
        currentIds.push(shipment.id);
      });
      return {
        ...state,
        shipments: currentShiments,
        shipmentIds: currentIds
      };
    case ShipmentsActionTypes.UpdateName:
      const updateShipmented = { ...currentShiments[action.payload.id], name: action.payload.name };
      currentShiments[action.payload.id] = updateShipmented;
      return {
        ...state,
        shipments: currentShiments,
      }
  }
  return state;
};
