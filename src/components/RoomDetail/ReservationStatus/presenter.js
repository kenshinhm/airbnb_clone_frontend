import styles from "./styles.scss";
import DayPickerRange from "components/shared/DayPickerRange/container.js";
import React from "react";

class Presenter extends React.Component {

    render() {

        return (
            <div className={styles.contentReservation}>
                <h1>예약 가능 여부</h1>
                <DayPickerRange onDatesUpdate={this.props.onDatesUpdate}
                                startDate={this.props.startDate}
                                endDate={this.props.endDate}
                                numberOfMonths={2}
                                isDayBlocked={this.props.isDayBlocked}
                />
            </div>
        );
    }
}

export default Presenter;