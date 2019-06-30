import React from 'react';
import styles from './styles.scss';
import Navigation from "components/Navigation/container.js";
import Home from "components/Home/container.js";
import {Route, Switch} from "react-router-dom";
import RoomDetail from "components/RoomDetail/container.js";
import RoomList from "components/RoomList/container.js";
import MyPage from "components/MyPage/container.js";

class Presenter extends React.Component {

    render() {
        return (
            <div className={styles.app}>
                <div className={styles.nav}>
                    <Navigation {...this.props}/>
                </div>
                <div className={styles.body}>
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/room/:id' component={RoomDetail}/>
                        <Route path='/rooms/:query' component={RoomList}/>
                        <Route path='/mypage' component={MyPage}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Presenter;
