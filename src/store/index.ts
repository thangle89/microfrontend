export const initialState: ApplicationState = {
  shipments: {},
  shipmentIds: []
};

export interface ApplicationState {
  shipments: { [key: string]: Shipment };
  shipmentIds: string[];
}

export interface Cargo {
  type: string;
  description: string;
  volume: number;
}

export interface Service {
  type: string;
}

export interface Shipment {
  id: string;
  name: string;
  cargo: Cargo[];
  mode: string;
  type: string;
  destination: string;
  origin: string;
  services: Service[];
  total: number;
  status: string;
  userId: string;
}
