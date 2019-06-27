import React from 'react';
import styles from 'components/Navigation/styles.scss';
import {ReactComponent as Logo} from 'svg/logo.svg';
import {ReactComponent as Search} from 'svg/search.svg';
import PublicLink from "components/Navigation/PublicLink/container.js";
import PrivateLink from "components/Navigation/PrivateLink/container.js";
import * as PropTypes from "prop-types";
import {Link} from "react-router-dom";


const Navigation = (props) => (
    <div className={styles.container}>
        <div className={styles.navigation}>
            <div className={styles.columnLogo}>
                <Link to={'/'}>
                    <Logo className={styles.logo}/>
                </Link>
            </div>
            <div className={styles.columnSearch}>
                <div className={styles.searchBox}>
                    <div className={styles.searchInner}>
                        <Search/>
                        <input className={styles.searchInput}
                               placeholder={`Try "Seoul"`}/>
                    </div>
                </div>
            </div>
            {props.isLoggedIn ? <PrivateLink {...props}/> : <PublicLink {...props}/>}
        </div>
    </div>
);

Navigation.propTypes = {
    onLogin: PropTypes.bool.isRequired,
    onSignUp: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    openLogin: PropTypes.func.isRequired,
    closeLogin: PropTypes.func.isRequired,
    dispatchLogout: PropTypes.func.isRequired,
};

export default Navigation;