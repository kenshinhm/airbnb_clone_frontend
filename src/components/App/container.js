import React from 'react';
import Presenter from './presenter';
import {connect} from "react-redux";
import {dispatchResize} from "redux/dom/actions.js";

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchResize: (width) => dispatch(dispatchResize(width)),
    };
};


class App extends React.Component {

    componentDidMount() {
        window.addEventListener('resize', this._resize);
        this._resize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._resize);
    }

    _resize = () => {
        const width = window.outerWidth;
        this.props.dispatchResize(width);
    };

    render() {
        return (
            <Presenter {...this.props}/>
        );
    }
}

export default connect(null, mapDispatchToProps)(App);