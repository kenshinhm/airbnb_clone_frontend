import React from 'react';
import styles from './styles.scss';
import Login from "./Login/container.js";

const Presenter = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.link}>
                <button>도움말</button>
            </div>
            <div className={styles.link}>
                <button>회원 가입</button>
            </div>
            <div className={styles.link}>
                <button onClick={props.openLogin}>
                    로그인
                </button>
            </div>
            {props.onLogin && <Login closeLogin={props.closeLogin}/>}
        </div>
    );
};

export default Presenter;
