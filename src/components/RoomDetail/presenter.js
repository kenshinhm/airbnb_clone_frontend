import React from 'react';
import withLoading from "components/shared/Loading/loading.js";
import styles from './styles.scss';
import Reservation from "./Reservation/container.js";
import Photos from "./Photos/presenter.js";
import Header from "./Header/presenter.js";
import Description from "./Description/presenter.js";
import Location from "./Location/presenter.js";
import ReservationStatus from "./ReservationStatus/container.js";
import Reviews from "./Reviews/container.js";
import * as PropTypes from "prop-types";


const Presenter = props => {

    const room = props.room;
    const main_photo = room.room_photos[0];
    const sub_photos = room.room_photos.slice(1, 5);

    return (
        <div className={styles.container}>
            <div className={styles.photoContainer}>
                <Photos main_photo={main_photo}
                        sub_photos={sub_photos}/>
            </div>
            <div className={styles.bodyContainer}>
                <div className={styles.column1}>
                    <Header name={room.name}
                            location={room.location}
                            profile_image={room.host.profile_image}
                            username={room.host.username}/>
                    <Description room={room}
                                 onClickInfo={props.onClickInfo}
                                 showInfo={props.showInfo}/>
                    <ReservationStatus onDatesUpdate={props.onDatesUpdate}
                                       startDate={props.startDate}
                                       endDate={props.endDate}
                                       reservations={room.reservations}
                                       device={props.device}/>
                    <div className={styles.responsiveReservation}>
                        <Reservation onDatesUpdate={props.onDatesUpdate}
                                     startDate={props.startDate}
                                     endDate={props.endDate}
                                     roomId={props.id}
                                     getApi={props.getApi}
                                     reservations={room.reservations}
                                     device={props.device}
                        />
                    </div>
                    <Reviews rating={room.rating}
                             reviews={room.reviews}
                             reviewCount={room.review_count}
                             roomId={room.id}
                             getApi={props.getApi}/>
                    <Location location_info={room.location_info}
                              lat={room.lat}
                              lng={room.lng}/>
                </div>
                <div className={styles.column2}>
                    <Reservation sticky={props.sticky}
                                 onDatesUpdate={props.onDatesUpdate}
                                 startDate={props.startDate}
                                 endDate={props.endDate}
                                 roomId={props.id}
                                 getApi={props.getApi}
                                 reservations={room.reservations}
                                 device={props.device}
                    />
                </div>
            </div>
        </div>
    );
};

Presenter.propTypes = {
    room: PropTypes.shape({
        room_photos: PropTypes.arrayOf(
            PropTypes.shape({
                photo: PropTypes.string.isRequired,
            })
        ),
        reservations: PropTypes.array,
        location: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        rating: PropTypes.string,
        review_count: PropTypes.number,
    }),
    device: PropTypes.string,
};

export default withLoading(Presenter);
