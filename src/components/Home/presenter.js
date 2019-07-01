import React from 'react';
import styles from './styles.scss';
import Recommendation from "components/Home/Recommendation/container.js";
import * as PropTypes from "prop-types";
import Reservation from "components/Home/Reservation/container.js";
import RoomByCity from "components/Home/RoomByCity/container.js";


class Presenter extends React.Component {

    static propTypes = {
        cityList: PropTypes.array,
        renderCity: PropTypes.array,
        dispatchLoading: PropTypes.func.isRequired,
    };

    componentDidMount() {
        // console.log(this.props.cityList);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.image}>
                        <Reservation/>
                    </div>
                </div>
                <div className={styles.body}>
                    <Recommendation title='추천 여행지'
                                    cityList={this.props.cityList}/>
                    {
                        this.props.renderCity.map((city, index) => (
                            <RoomByCity key={index}
                                        title={`${city}의 숙소`}
                                        city={city}
                                        dispatchLoading={this.props.dispatchLoading}/>
                        ))

                    }
                </div>
            </div>

        );
    }
}


export default Presenter;
