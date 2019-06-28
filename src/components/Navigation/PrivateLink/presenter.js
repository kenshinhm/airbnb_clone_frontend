import React from 'react';
import styles from './styles.scss';
import Profile from './Profile/container.js';

const Presenter = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.link}>
                <button>
                    도움말
                </button>
            </div>
            <div className={styles.link}>
                <Profile {...props}/>
            </div>
        </div>
    );
};

export default Presenter;
