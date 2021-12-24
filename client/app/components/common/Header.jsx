import React from "react";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    _onSignOut() {
        window.location.href = "/logout";
    }

    render() {
        const {
        } = this.props;

        return (
            <div className="header-portal">
                <div className="sign-out-header">
                    <div className="header-icon-style">
                        <img className="header-logo" src="../../assets/images/signoutLogo.png" alt="" />
                        <span style={{ fontSize: "14px", paddingLeft: "15px", cursor: "pointer" }} onClick={this._onSignOut}>Sign Out</span>
                    </div>
                </div>
                <div className="header-details">
                    <div className="header-details-wrap">
                        <img className="details-logo-style" src="../../assets/images/headerLogo.png" alt="" />
                        <div className="header-text">United Bonds Agent Portal</div>
                    </div>
                </div>
                <span className="header-space-bar" />
            </div>
        )
    }

}

