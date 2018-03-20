import React, { Component } from 'react';

class Footer extends Component {
    // rendering the footer for the page
    render() {
        return (
            <div>
                <footer className="fixed-bottom">
                    <div className="container">
                        <span className="navbar-text ml-auto">
                            &copy; Basemera Yummy Recipes Inc All rights
                            reserved
                        </span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;
