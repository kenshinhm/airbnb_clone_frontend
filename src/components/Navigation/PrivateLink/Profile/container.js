import React from 'react';
import Presenter from "./presenter.js";
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        dispatchLogout: PropTypes.func,
    };

    state = {
        onProfile: false,
    };

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}
                       triggerProfile={this._triggerProfile}
            />
        );
    }

    _triggerProfile = () => {
        this.setState({
            onProfile: !this.state.onProfile
        });
    };

}

export default Container;