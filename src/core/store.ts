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
    payload: string;
}

export const coreActions = { ...actionCreators };