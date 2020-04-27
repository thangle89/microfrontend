import { Shipment } from 'store';

export enum ShipmentsActionTypes {
    Add = 'Shipments/Add',
    UpdateName = 'Shipments/Name/Update'
  }

  export interface AddShipmentsActionType {
    type: typeof ShipmentsActionTypes.Add;
    payload: Shipment[];
  }

  export interface UpdateNameShipmentsActionType {
    type: typeof ShipmentsActionTypes.UpdateName;
    payload: Shipment;
  }

  export type ShipmentsActions = AddShipmentsActionType | UpdateNameShipmentsActionType;