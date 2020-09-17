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

export interface CommonState {
    status: string;
}
export type ModuleSelector = { [key: string]: Function }
export interface ApplicationCoreState {
    common: CommonState;
    selectors: ModuleSelector;
}

export const coreActions = { ...actionCreators };