import React from 'react';
import {ReactComponent as ArrowDown} from 'svg/arrowDown.svg';
import {ReactComponent as Arrowup} from 'svg/arrowUp.svg';
import * as PropTypes from "prop-types";
import {DateRangePicker,} from "react-dates";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'components/Home/Reservation/_datepicker.css';
import styles from './styles.scss';
import GuestPicker from "components/shared/GuestPicker/container.js";


const Presenter = props => {
    return (
        <div className={styles.container}>
            <p>특색 있는 숙소와 즐길 거리를 예약하세요.</p>
            <form className={styles.form}>
                <div className={styles.formRow}>
                    <label className={styles.formLabel}>목적지</label>
                    <input className={styles.formInput}
                           placeholder='모든 위치'
                           value={props.location}
                           onChange={props.onChangeLocation}/>
                </div>
                <div className={styles.formRow} style={{position: 'relative'}}>
                    <label className={styles.formLabel}>체크인 / 체크아웃</label>
                    <DateRangePicker
                        startDatePlaceholderText={"월/일/년"}
                        endDatePlaceholderText={"월/일/년"}
                        startDate={props.startDate}
                        startDateId="your_unique_start_date_id"
                        endDate={props.endDate}
                        endDateId="your_unique_end_date_id"
                        onDatesChange={props.onChangeDates}
                        focusedInput={props.focusedInput}
                        onFocusChange={props.onChangeFocus}
                    />
                </div>
                <div className={styles.formRow}>
                    <label className={styles.formLabel}>인원</label>
                    <button className={styles.dropButton}
                            placeholder='인원' onClick={props.onClickGuestPicker}>
                        <span className={styles.placeholder}>{props.stringGuests}</span>
                        {props.guestPickerClicked ? <Arrowup/> : <ArrowDown/>}
                    </button>
                    {
                        props.guestPickerClicked ?
                            <GuestPicker onClick={props.onClickGuestPicker}
                                         onUpdate={props.onUpdateGuestPicker}/>
                            :
                            null
                    }
                </div>
                <div className={styles.formRow}>
                    <input className={styles.submitButton}
                           type='submit'
                           value='검색'
                           onClick={props.onClickSubmit}>
                    </input>
                </div>
            </form>
        </div>
    );
};

Presenter.propTypes = {
    guestPickerClicked: PropTypes.bool.isRequired,
    onClickGuestPicker: PropTypes.func.isRequired,
    onUpdateGuestPicker: PropTypes.func.isRequired,
    onChangeDates: PropTypes.func.isRequired,
    onChangeFocus: PropTypes.func.isRequired,
    onChangeLocation: PropTypes.func.isRequired,
    onClickSubmit: PropTypes.func.isRequired,
};

export default Presenter;

