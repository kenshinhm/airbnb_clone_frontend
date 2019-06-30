import React from 'react';
import Presenter from "./presenter.js";

class RoomByCity extends React.Component {

    _isMounted = false;
    state = {
        count: 0,
    };

    _setState = (state, callback) => {
        if (this._isMounted) {
            if (callback) {
                this.setState(state, callback);
            } else {
                this.setState(state);
            }
        }
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
    }

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}
                       updateApi={this._updateApi}/>
        );
    }

    _updateApi = (data) => {
        this._setState({
            count: data.count
        });
    };
}

export default RoomByCity;