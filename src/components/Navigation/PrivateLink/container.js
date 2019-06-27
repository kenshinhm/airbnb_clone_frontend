import React from 'react';
import Presenter from "./presenter.js";

class Container extends React.Component {

    render() {
        return (
            <Presenter {...this.props}/>
        );
    }
}

export default Container;