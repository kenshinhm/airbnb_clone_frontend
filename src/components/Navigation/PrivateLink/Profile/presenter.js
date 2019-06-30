import React from 'react';
import styles from './styles.scss';
import ProfileImage from 'img/profile_image.png';
import * as PropTypes from "prop-types";
import ProfileMenu from './ProfileMenu/presenter.js';

const Presenter = props => {
    return (
        <div className={styles.container}>
            <button onClick={props.triggerProfile}>
                <img src={ProfileImage}
                     alt='profileImage'/>
            </button>
            {
                props.onProfile ?
                    <ProfileMenu dispatchLogout={props.dispatchLogout}
                                 triggerProfile={props.triggerProfile}/>
                    :
                    null
            }
        </div>
    );
};

Presenter.propTypes = {
    triggerProfile: PropTypes.func,
};

export default Presenter;
