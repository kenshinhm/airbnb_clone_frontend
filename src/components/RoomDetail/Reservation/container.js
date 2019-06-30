import React from 'react';
import Presenter from './presenter.js';
import api from "api.js";
import {connect} from 'react-redux';
import * as PropTypes from "prop-types";
import moment from "moment";
import {extendMoment} from "moment-range";
import momentPropTypes from "react-moment-proptypes";


const mapStateToProps = (state, ownProps) => {
    const {user: {isLoggedIn}} = state;
    return {
        isLoggedIn,
    };
};

class Container extends React.Component {

    static propTypes = {
        roomId: PropTypes.string,
        startDate: momentPropTypes.momentObj,
        endDate: momentPropTypes.momentObj,
        reservations: PropTypes.array,
    };

    state = {
        guestPickerClicked: false,
        stringGuests: "인원",
        guestCount: 0,

        startDate: null,
        endDate: null,
        focusedInput: null,

        reservationLists: [],
    };

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

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.startDate) {
            this.setState({
                startDate: nextProps.startDate
            });
        }
        if (nextProps.endDate) {
            this.setState({
                endDate: nextProps.endDate
            });
        }
    }

    render() {

        return (
            <Presenter {...this.props}
                       {...this.state}
                       onClickGuestPicker={this._onClickGuestPicker}
                       onUpdateGuestPicker={this._onUpdateGuestPicker}
                       onDatesChange={this._onDatesChange}
                       onFocusChange={this._onFocusChange}
                       onClickSubmit={this._onClickSubmit}
                       isDayBlocked={this._isDayBlocked}
            />
        );
    }

    _onClickGuestPicker = (evt) => {
        if (evt) {
            evt.preventDefault();
        }

        this.setState({
            guestPickerClicked: !this.state.guestPickerClicked,
        });
    };

    _onUpdateGuestPicker = ({guestCount, stringGuests}) => {
        this.setState({
            stringGuests,
            guestCount,
        });
    };

    _onDatesChange = ({startDate, endDate}) => {
        this.setState({
            startDate,
            endDate
        });
        this.props.onDatesUpdate(startDate, endDate);
    };

    _onFocusChange = focusedInput => {
        this.setState({focusedInput});
    };

    _onClickSubmit = evt => {

        evt.preventDefault();

        if (this.props.isLoggedIn) {

            if (this.state.startDate && this.state.endDate) {

                const roomId = this.props.roomId;

                const data = JSON.stringify({
                    guest_count: this.state.guestCount,
                    start_date: this.state.startDate.format(),
                    end_date: this.state.endDate.format(),
                });

                api.post(`rooms/${roomId}/reservation/`, data)
                   .then(response => {
                       if (response.status === 201) {
                           this.props.getApi();
                       } else {
                           console.log(`${response.status}: ${response.statusText}`);
                       }
                   })
                   .catch(err => console.log(err));

            } else {
                alert("체크인/체크아웃 날짜를 지정해 주세요!");
            }
        } else {
            alert("로그인 해주세요 !");
        }
    };
}

export default connect(mapStateToProps, null)(Container);