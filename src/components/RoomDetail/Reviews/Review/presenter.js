import React from 'react';
import styles from './styles.scss';
import * as PropTypes from "prop-types";
import {wrapUrl} from "shared/utility.js";
import {ReactComponent as Close} from 'svg/close.svg';
import * as moment from 'moment';

const Review = props => {

    const review = props.review;
    const createTime = moment(new Date(props.review.create_time)).fromNow();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src={wrapUrl(review.creator.profile_image)}
                     alt={'guest'}>
                </img>
                <div className={styles.info}>
                    <div className={styles.username}>{review.creator.username}</div>
                    <span className={styles.time}>{createTime}</span>
                </div>
            </div>
            <div className={styles.message}>
                <span>{review.message}</span>
                {review.is_own ?
                    <button className={styles.closeButton}
                            onClick={() => props.onUserReviewDelete(review.id)}>
                        <Close style={{width: '9px', height: '9px'}}/>
                    </button>
                    :
                    null
                }

            </div>
        </div>
    );
};

Review.propTypes = {
    review: PropTypes.shape({
        is_own: PropTypes.bool,
        create_time: PropTypes.string,
        message: PropTypes.string,
        creator: PropTypes.shape({
            id: PropTypes.number,
            username: PropTypes.string,
            profile_image: PropTypes.string,
            email: PropTypes.string,
        })
    })
};

export default Review;
