import styles from "./styles.scss";
import DayPickerRange from "components/shared/DayPickerRange/container.js";
import React from "react";

class Presenter extends React.Component {

    render() {

        let numberOfMonths = 2;

        if (this.props.device === 'phone') {
            numberOfMonths = 1;
        } else if (this.props.device === 'tablet') {
            numberOfMonths = 2;
        }

        return (
            <div className={styles.contentReservation}>
                <h1>예약 가능 여부</h1>
                <DayPickerRange onDatesUpdate={this.props.onDatesUpdate}
                                startDate={this.props.startDate}
                                endDate={this.props.endDate}
                                numberOfMonths={numberOfMonths}
                                isDayBlocked={this.props.isDayBlocked}
                />
            </div>
        );
    }
}

export default Presenter;