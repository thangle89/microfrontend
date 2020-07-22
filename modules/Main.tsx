
import React from 'react';
import { actionCreators, ApplicationState } from './store';
import { connect } from 'react-redux';

interface DispatchProps {
    updateModule: typeof actionCreators.updateModule;
}

interface StateProps {
    coreStatus: string;
    moduleStatus: string;
}

const Main: React.FC<DispatchProps & StateProps> = (props) => {
    const onClickHandler = () => {
        props.updateModule('loaded');
    }
    return (<div>My dynamic Module
        <div>core status: {props.coreStatus}</div>
        <div>module status: {props.moduleStatus}</div>
        <button onClick={onClickHandler}>Update module status</button>
    </div>)
}

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        coreStatus: state.core.status,
        moduleStatus: state.module.status
     };
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    updateModule: (status) => dispatch(actionCreators.updateModule(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);