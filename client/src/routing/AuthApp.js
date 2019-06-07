import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AuthHome from "../pages/auth/AuthHome";
import Settings from "../pages/auth/Settings";
import Sidebar from "../components/Sidebar/Sidebar";
import AuthNav from "../components/nav/AuthNav";

const AuthApp = () => {
    return (
        <Fragment>
            <AuthNav />
            <Sidebar />
            <Switch>
                <Route exact path='/' component={AuthHome} />
                <Route path='/settings' component={Settings} />
                <Route render={() => <Redirect to='/' />} />
            </Switch>
        </Fragment>
    );
};

export default AuthApp;