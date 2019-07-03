import React from 'react';
import Presenter from "./presenter.js";
import {dispatchLoading} from "redux/dom/actions.js";
import {connect} from 'react-redux';
import * as moment from 'moment';


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatchLoading: (status) => dispatch(dispatchLoading(status)),
    };
};

const mapStateToProps = (state, ownProps) => {
    const {dom: {loading}} = state;
    return {
        loading,
    };
};

class RoomList extends React.Component {

    _isMounted = false;

    state = {
        query: '',
        guestCount: 0,
        startPrice: 0,
        endPrice: 200000,
        startDate: '',
        endDate: '',
        count: 0,
        limit: 20,
        offset: 0,
        average_price: 0,
        average_rating: 0.0,
        total_reviews: 0,
    };

    _setState = (state, callback) => {
        if (this._isMounted) {
            if (callback) {
                this.setState(state, callback);
            } else {
                this.setState(state);
            }
        }
    };

    componentWillMount() {

        window.addEventListener('scroll', this._scroll);
        this._isMounted = true;

        // console.log(this.props);

        const {match: {params: {query}}} = this.props;

        let guestCount = 0;
        let startDate = '';
        let endDate = '';
        if (this.props.location.state) {

            const state = this.props.location.state;

            if (state.guestCount > 0) {
                guestCount = Number(state.guestCount);
            }

            if (state.startDate) {
                startDate = moment(new Date(state.startDate));
            }

            if (state.endDate) {
                endDate = moment(new Date(state.endDate));
            }
        }

        this._setState({
            query,
            guestCount,
            startDate,
            endDate,
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('scroll', this._scroll);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps, nextContext) {

        const {match: {params: {query}}} = nextProps;

        if (query && query !== this.state.query) {
            this._setState({
                query
            });
            this._refresh();
        }
    }

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}
                       updateApi={this._updateApi}
                       updateGuestCount={this._updateGuestCount}
                       updatePrice={this._updatePrice}
            />
        );
    }

    _updateGuestCount = guestCount => {

        if (guestCount !== this.state.guestCount) {
            this._setState({
                guestCount
            }, () => this._refresh());
        }
    };

    _updatePrice = (startPrice, endPrice) => {

        if (startPrice !== this.state.startPrice
            || endPrice !== this.state.endPrice) {
            this._setState({
                startPrice,
                endPrice,
            }, () => this._refresh());
        }
    };

    _refresh = () => {
        this._setState({
            offset: -1,
            count: 0,
        }, () => {
            setTimeout(() => this._setState({
                offset: 0
            }), 100);
        });
        window.scrollTo(0, 0);
    };

    _updateApi = (data) => {

        // console.log(data);

        this._setState({
            count: data.count,
            average_price: data.average_price,
            average_rating: data.average_rating,
            total_reviews: data.total_reviews,
        });
        dispatchLoading(false);
    };

    _scroll = () => {

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = Math.round(windowHeight + window.pageYOffset);

        if (windowBottom >= docHeight && !this.props.loading) {
            this.props.dispatchLoading(true);

            const count = this.state.count;
            const limit = this.state.limit;
            const offset = this.state.offset;

            if ((offset + 1) * limit <= count) {
                // console.log(offset);
                // console.log((offset + 1) * limit);

                this._setState({
                    offset: offset + 1
                });
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);