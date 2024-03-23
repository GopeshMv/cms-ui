import React from "react";
import QuickView from "./QuickView/QuickView";
import AccountBalance from "./AccountBalance/AccountBalance";
import AccountDetails from "./AccountDetail/AccountDetails";
import Balance from "./Balance/Balance"
import "./Account.css";


function Account() {
    return (
        <div className="Account">
            <QuickView/>
            <AccountDetails/>
            <AccountBalance/>
            <Balance/>
        </div>
    );
}

export default Account;