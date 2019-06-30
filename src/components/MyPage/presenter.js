import React from 'react';
import styles from './styles.scss';
import withLoading from "components/shared/Loading/loading.js";
import * as PropTypes from "prop-types";
import ReservationItem from "./ReservationItem/presenter.js";

const Presenter = props => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                내 예약 조회
            </div>
            <div className={styles.reservation}>
                {
                    props.reservations.map((reservation, idx) => (
                        <ReservationItem key={reservation.id}
                                         item={reservation}
                                         idx={idx}/>
                    ))
                }
            </div>
        </div>
    );
};

Presenter.propTypes = {
    reservations: PropTypes.array,
};

export default withLoading(Presenter);
