import React from 'react';
import styles from './styles.scss';
import * as PropTypes from "prop-types";

const Presenter = props => {
    return (
        <div className={styles.container}>
            <button>예약보기</button>
            <button onClick={props.dispatchLogout}>
                로그아웃
            </button>
        </div>
    );
};

Presenter.propTypes = {
    dispatchLogout: PropTypes.func,
};

export default Presenter;
