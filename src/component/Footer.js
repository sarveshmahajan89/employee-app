import React from "react";

class Footer  extends React.Component {
    render() {
        return (
            <footer className="text-center">
                <div className="footer-above">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>About Employee App</h3>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-below">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <span>Copyright &copy; Employee App 2020</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
export default Footer ;