import React from 'react';
import Navigation from 'components/Navigation/presenter.js';
import * as PropTypes from "prop-types";
import {dispatchLogout} from "redux/user/actions.js";
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => {
    const {user: {isLoggedIn}} = state;
    return {
        isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchLogout: () => {
            dispatch(dispatchLogout());
        }
    };
};

class Container extends React.Component {

    static propTypes = {
        dispatchLogout: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
    };

    render() {
        return (
            <Navigation {...this.props}/>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);