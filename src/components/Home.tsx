import React from 'react';
import { Link } from 'react-router-dom';
import { ApplicationState } from 'store';
import { connect } from 'react-redux';
import { coreActions, getModuleState } from 'core/store';

interface DispatchProps {
    updateCore: typeof coreActions.updateCore;
}

interface StateProps {
    status: string;
    moduleStatus: string;
}

const Home: React.FC<StateProps & DispatchProps> = (props) => {
    React.useEffect(() => {
        if(!props.status)
        props.updateCore('loaded')
    }, [props.status]);
    return <div>Home Page
        <div>common store status: {props.status}</div>
        <div>Module status: {props.moduleStatus}</div>
        <div>
            <Link to='/myModule'>My module</Link>
        </div>
    </div>;
}

const mapStateToProps = (state: ApplicationState): StateProps => {
    return {
        status: state.common.status,
        moduleStatus: getModuleState('module','getStatus', state),
    };
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    updateCore: (status) => dispatch(coreActions.updateCore(status)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);