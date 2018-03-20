import React, { Component } from 'react';
import PropTypes from 'prop-types';
import img1 from '../css/images/img1.jpeg';
import img2 from '../css/images/img2.jpg';
import img3 from '../css/images/img3.jpeg';

/**
 * Component to load the landing page*.
 */

class HomeView extends Component {
    // Prop validation
    static propTypes = {
        loggedIn: PropTypes.bool,
    };
    static defaultProps = {
        loggedIn: false,
    };

    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.history.push('/view-categories');
        }
    }
    render() {
        return (
            <div className="background">
                <div className="navigation">
                    <div id="header">Yummy Recipe App</div>
                </div>

                <div
                    id="carouselExampleIndicators"
                    className="carousel slide carouse-slider"
                    data-ride="carousel"
                >
                    <ol className="carousel-indicators">
                        <li
                            data-target="#carouselExampleIndicators"
                            data-slide-to="0"
                            className="active"
                        />
                        <li
                            data-target="#carouselExampleIndicators"
                            data-slide-to="1"
                        />
                        <li
                            data-target="#carouselExampleIndicators"
                            data-slide-to="2"
                        />
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                className="d-block w-100"
                                src={img1}
                                alt="First slide"
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className="caption-header">
                                    Welcome to Yummy Recipes app.
                                </h5>
                                <p>
                                    One thousand flavors in one place. Put your
                                    recipes down in one place.
                                </p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                className="d-block w-100"
                                src={img2}
                                alt="Second slide"
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <div className="capt">
                                    <h5>Update your recipes</h5>
                                    <p>
                                        Found that magical ingredient edit your
                                        recipe to include it
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                className="d-block w-100"
                                src={img3}
                                alt="Third slide"
                            />
                            <div className="carousel-caption d-none d-md-block caption-text">
                                <h5 className="caption-header">
                                    Manage your recipes
                                </h5>
                                <p>
                                    This app will help you to manage your recipes. If
                                    you have already signed up please login to
                                    continue. If not please signup to enjoy.
                                </p>
                            </div>
                        </div>
                    </div>
                    <a
                        className="carousel-control-prev"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href="#carouselExampleIndicators"
                        role="button"
                        data-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        );
    }
}
export default HomeView;
