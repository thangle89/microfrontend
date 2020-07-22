import { Reducer } from 'redux';

interface CoreSate {
    status: string;
}

export interface ApplicationState {
    core: CoreSate;
    module: ModuleState;
}

interface ModuleState {
    status: string;
}

export const actionCreators = {
    updateModule: (status: string) => ({
        type: ModuleActionTypes.UpdateModule,
        payload: status,
    }),
};

export enum ModuleActionTypes {
    UpdateModule = 'Module/Update',
}
export interface ModuleUpdateActionType {
    type: typeof ModuleActionTypes.UpdateModule;
    payload: string;
}

export const reducer: Reducer<ModuleState> = (
    state: ModuleState = { status: 'unload' },
    action: ModuleUpdateActionType
) => {
    switch (action.type) {
        case ModuleActionTypes.UpdateModule:

            return {
                status: action.payload,
            };
    }
    return state;
};