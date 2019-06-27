import React from 'react';
import Presenter from "./presenter.js";
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        isLoggedIn: PropTypes.bool,
    };

    state = {
        onLogin: false,
        onSignUp: false,
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.isLoggedIn) {
            this.setState({
                onLogin: true,
            });
        }
    }

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}
                       openLogin={this._openLogin}
                       closeLogin={this._closeLogin}/>
        );
    }

    _openLogin = () => {
        this.setState({
            ...this.state,
            onLogin: true
        });
    };

    _closeLogin = () => {
        this.setState({
            ...this.state,
            onLogin: false
        });
    };
}

export default Container;