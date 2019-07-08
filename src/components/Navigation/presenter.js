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
            <div className={styles.column}>
                <div className={styles.columnLogo}>
                    <Link to={'/'} onClick={() => window.location.refresh()}>
                        <Logo className={styles.logo}/>
                    </Link>
                </div>
                <div className={styles.columnSearch}>
                    <div className={styles.searchBox}>
                        <Search/>
                        <input className={styles.searchInput}
                               placeholder={`Try "서울"`}
                               onKeyPress={props.searchInputOnKeyPress}
                               onChange={props.searchInputOnChange}
                               value={props.searchQuery}/>
                    </div>
                </div>
            </div>
            {props.isLoggedIn ? <PrivateLink {...props}/> : <PublicLink {...props}/>}
        </div>
    </div>
);

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    dispatchLogout: PropTypes.func.isRequired,
    searchInputOnChange: PropTypes.func.isRequired,
    searchInputOnKeyPress: PropTypes.func.isRequired,
};

export default Navigation;