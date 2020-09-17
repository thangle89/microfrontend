
import React from 'react';
import { actionCreators, ApplicationState } from './store';
import { connect } from 'react-redux';
import { coreActions } from './core/store';

interface DispatchProps {
    updateModule: typeof actionCreators.updateModule;
    updateCore: typeof coreActions.updateCore;
}

interface StateProps {
    coreStatus: string;
    moduleStatus: string;
}

const Main: React.FC<DispatchProps & StateProps> = (props) => {
    const onClickHandler = () => {
        props.updateModule('loaded');
    }

    const updateCoreHandler = () => {
        props.updateCore('common is updated from module');
    };
    return (<div>My dynamic Module
        <div>core status: {props.coreStatus}</div>
        <div>module status: {props.moduleStatus}</div>
        <button onClick={onClickHandler}>Update module status</button> <span>  |  </span>
        <button onClick={updateCoreHandler}>Update core status</button>
    </div>)
}

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        coreStatus: state.common.status,
        moduleStatus: state.module.status
     };
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    updateModule: (status) => dispatch(actionCreators.updateModule(status)),
    updateCore: (status) => dispatch(coreActions.updateCore(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);