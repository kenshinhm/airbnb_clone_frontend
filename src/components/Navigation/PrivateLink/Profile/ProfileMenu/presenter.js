import React from 'react';
import styles from './styles.scss';
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";

const Presenter = props => {
    return (
        <div className={styles.container}>
            <button onClick={props.triggerProfile}>
                <Link to='/mypage' style={{textDecoration: 'none', color: 'inherit'}}>
                    예약보기
                </Link>
            </button>
            <button onClick={props.dispatchLogout}>
                로그아웃
            </button>
        </div>
    );
};

Presenter.propTypes = {
    dispatchLogout: PropTypes.func,
    triggerProfile: PropTypes.func,
};

export default Presenter;
