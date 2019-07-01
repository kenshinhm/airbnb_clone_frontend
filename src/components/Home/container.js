import React from 'react';
import Presenter from "./presenter.js";
import * as PropTypes from "prop-types";
import {dispatchLoading} from "redux/dom/actions.js";
import {connect} from "react-redux";


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


class Home extends React.Component {

    static propTypes = {
        dispatchLoading: PropTypes.func.isRequired,
        loading: PropTypes.bool.isRequired,
    };

    state = {
        renderCity: [],
        nextCityIndex: 0,
        cityList: ['서울',
                   '부산',
                   '대전',
                   '인천',
                   '거제',
                   '광주',
                   '속초',
                   '수원',
                   '울산',]
    };

    componentDidMount() {
        window.addEventListener('scroll', this._scroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._scroll);
    }

    _scroll = () => {

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = Math.round(windowHeight + window.pageYOffset);

        if (windowBottom >= docHeight && !this.props.loading) {

            let nextCityIndex = this.state.nextCityIndex;

            if (nextCityIndex < this.state.cityList.length) {

                this.props.dispatchLoading(true);

                const nextCity = this.state.cityList[nextCityIndex];
                let renderCity = this.state.renderCity;
                renderCity.push(nextCity);

                this.setState({renderCity});

                nextCityIndex = Math.min(this.state.nextCityIndex + 1,
                    this.state.cityList.length);
                this.setState({nextCityIndex});

            }
        }
    };

    render() {
        return (
            <Presenter {...this.props}
                       {...this.state}/>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);