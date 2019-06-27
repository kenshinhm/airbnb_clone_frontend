import React from 'react';
import styles from './styles.scss';
import Login from "./Login/container.js";

const Presenter = (props) => {
    return (
        <div className={styles.container}>
            <button>
                <div className={styles.link}>도움말</div>
            </button>
            <button>
                <div className={styles.link}>회원 가입</div>
            </button>
            <button onClick={props.openLogin}>
                <div className={styles.link}>로그인</div>
            </button>
            {props.onLogin && <Login closeLogin={props.closeLogin}/>}
        </div>
    );
};

export default Presenter;
