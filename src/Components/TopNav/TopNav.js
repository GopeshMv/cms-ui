import React from "react";
import "./TopNav.css";
import notification_logo from "../../utils/svg/notification.svg";

function TopNav() {
    return (
        <div className="TopNav">
            <div className="welcomeMessage">WELCOME BACK!</div>
            <div className="notification-icon">
                <img src={notification_logo} alt=""></img>
            </div>
        </div>
    );
}

export default TopNav;