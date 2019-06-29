import React from 'react';
import Presenter from 'components/Home/Reservation/presenter.js';
import {withRouter} from "react-router-dom";

class Container extends React.Component {

    state = {
        guestPickerClicked: false,
        stringGuests: "인원",
        guestCount: 0,

        startDate: null,
        endDate: null,
        focusedInput: null,

        location: "",
    };

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}
                       onClickGuestPicker={this._onClickGuestPicker}
                       onUpdateGuestPicker={this._onUpdateGuestPicker}
                       onChangeDates={this._onChangeDates}
                       onChangeFocus={this._onChangeFocus}
                       onChangeLocation={this._onChangeLocation}
                       onClickSubmit={this._onClickSubmit}
            />
        );
    }

    _onClickSubmit = (evt) => {
        evt.preventDefault();

        if (this.state.location) {

            let startDate = '';
            let endDate = '';

            if (this.state.startDate) {
                startDate = this.state.startDate.toString();
            }
            if (this.state.endDate) {
                endDate = this.state.endDate.toString();
            }

            this.props.history.push({
                pathname: `/rooms/${this.state.location}`,
                state: {
                    guestCount: this.state.guestCount,
                    startDate,
                    endDate,
                },
            });
        }
    };

    _onChangeLocation = evt => {
        this.setState({
            location: evt.target.value,
        });
    };

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

    _onChangeDates = ({startDate, endDate}) => {
        this.setState({
            startDate,
            endDate
        });
    };

    _onChangeFocus = focusedInput => {
        this.setState({focusedInput});
    };

}

export default withRouter(Container);