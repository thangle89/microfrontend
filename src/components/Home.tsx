import React from 'react';
import { Link } from 'react-router-dom';
import { ApplicationState, coreActions } from 'store';
import { connect } from 'react-redux';

interface DispatchProps {
    updateCore: typeof coreActions.updateCore;
}

interface StateProps {
    status: string;
}

const Home: React.FC<StateProps & DispatchProps> = (props) => {
    React.useEffect(() => {
        props.updateCore('loaded')
    }, []);
    return <div>Home Page
        <div>status: {props.status}</div>
        <div>
            <Link to='/myModule'>My module</Link>
        </div>
    </div>;
}

const mapStateToProps = (state: ApplicationState): StateProps => {
    return { status: state.core.status };
}

const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
    updateCore: (status) => dispatch(coreActions.updateCore(status)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Home);