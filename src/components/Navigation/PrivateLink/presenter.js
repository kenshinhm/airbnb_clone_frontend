import React from 'react';
import styles from './styles.scss';

const Presenter = (props) => {
    return (
        <div className={styles.container}>
            <button>
                <div className={styles.link}>도움말</div>
            </button>
            <button onClick={props.dispatchLogout}>
                <div className={styles.link}>로그아웃</div>
            </button>
        </div>
    );
};

export default Presenter;
