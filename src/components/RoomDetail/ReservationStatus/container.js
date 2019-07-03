import React from 'react';
import Presenter from './presenter.js';
import * as PropTypes from "prop-types";
import moment from "moment";
import {extendMoment} from "moment-range";
import momentPropTypes from 'react-moment-proptypes';

class Container extends React.Component {

    static propTypes = {
        onDatesUpdate: PropTypes.func,
        startDate: momentPropTypes.momentObj,
        endDate: momentPropTypes.momentObj,
        reservations: PropTypes.array,
        device: PropTypes.string,
    };

    state = {
        reservationLists: [],
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillMount() {

        let reservationLists = [];

        if (this.props.reservations) {

            const reservations = this.props.reservations;

            for (let i = 0; i < reservations.length; i++) {
                reservationLists.push(
                    [
                        moment(reservations[i].start_date),
                        moment(reservations[i].end_date),
                    ]
                );
            }
        }

        this.setState({
            reservationLists
        });
    }

    _isDayBlocked = day => {

        let ret = false;
        const reservations = this.state.reservationLists;

        for (let i = 0; i < reservations.length; i++) {

            const range = extendMoment(moment).range(reservations[i]);

            if (range.contains(day)) {
                ret = true;
                break;
            }
        }

        return ret;

    };

    render() {

        return (
            <Presenter {...this.props}
                       isDayBlocked={this._isDayBlocked}/>
        );
    }
}

export default Container;