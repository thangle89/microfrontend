export interface CommonState {
    status: string;
}

export interface ApplicationCoreState {
    common: CommonState;
    selectors: ModuleSelector;
}

export type ModuleSelector = { [key: string]: Function }

const actionCreators = {
    updateCore: (status: string) => ({
        type: CoreActionTypes.UpdateCore,
        payload: status,
    }),
    updateSelectors: (selectors: ModuleSelector) => ({
        type: CoreActionTypes.UpdateSelectors,
        payload: selectors,
    }),
};

export enum CoreActionTypes {
    UpdateCore = 'Core/Update',
    UpdateSelectors = 'Selectors/Update'
}

export interface CoreUpdateActionType {
    type: typeof CoreActionTypes.UpdateCore;
    payload: string;
}

export interface SelectorsUpdateActionType {
    type: typeof CoreActionTypes.UpdateSelectors;
    payload: ModuleSelector;
}

export const getModuleState = (moduleStateKey: string, moduleKey:string, state: ApplicationCoreState) => {
    if (state.selectors[moduleStateKey] && state[moduleKey]) {
      return state.selectors[moduleStateKey](state[moduleKey]);
    }
    return null;
  }

export const coreActions = { ...actionCreators };