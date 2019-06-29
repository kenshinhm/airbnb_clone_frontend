import React from 'react';
import Navigation from 'components/Navigation/presenter.js';
import * as PropTypes from "prop-types";
import {dispatchLogout} from "redux/user/actions.js";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

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

    state = {
        searchQuery: '',
    };

    render() {
        return (
            <Navigation {...this.props}
                        {...this.state}
                        searchInputOnChange={this._searchInputOnChange}
                        searchInputOnKeyPress={this._searchInputOnKeyPress}
            />
        );
    }

    _searchInputOnChange = evt => {
        this.setState({
            searchQuery: evt.target.value,
        });
    };

    _searchInputOnKeyPress = evt => {

        if (evt.key === 'Enter') {
            this.setState({
                searchQuery: '',
            });
            this.props.history.push(`/rooms/${this.state.searchQuery}`);
            // window.location.reload();
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));