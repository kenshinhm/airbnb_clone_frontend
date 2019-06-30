import React from 'react';
import styles from './styles.scss';
import moment from "moment";
import {Link} from "react-router-dom";

const ReservationItem = props => {

    const item = props.item;
    const room = props.item.room;
    const roomId = room.id;
    const startDate = moment(item.start_date).format("MMM Do YYYY");
    const endDate = moment(item.end_date).format("MMM Do YYYY");

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.index}>
                    {props.idx}.
                </div>
                <div className={styles.roomName}>
                    <Link to={`/room/${roomId}`}
                          style={{textDecoration: 'none', color: 'inherit', cursor: 'pointer'}}>
                        {room.name} ({room.location})
                    </Link>
                </div>
                <button className={styles.button}>
                    삭제
                </button>
            </div>
            <div className={styles.row}>
                <div className={styles.item}>
                    날짜: {startDate} - {endDate}
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.item}>
                    가격: 1인당 ₩{room.price.toLocaleString()}원
                </div>
            </div>

            {/*<div className={styles.roomPrice}>*/}
            {/*    {room.price}*/}
            {/*</div>*/}

        </div>
    );
};

export default ReservationItem;
