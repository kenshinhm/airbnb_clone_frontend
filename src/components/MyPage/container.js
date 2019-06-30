import React from 'react';
import Presenter from "./presenter.js";
import api from 'api.js';

class MyPage extends React.Component {

    _isMounted = false;
    state = {
        loading: true,
        reservations: []
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

    componentWillMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        api.get('/users/reservations/')
           .then(response => {
               if (response.status === 200) {
                   this._setState({
                       reservations: response.data,
                       loading: false
                   });
               } else {
                   console.log(`${response.status}: ${response.statusText}`);
               }
           })
           .catch(err => console.log(err));
    }

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}/>
        );
    }
}

export default MyPage;