/**应用的根zujian */

import React, { Component } from "react";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Login from "./pages/login/login";
import Homepage from "./pages/home/homepage";
import Admin from "./pages/admin/admin";

export default class App extends Component {

    render() {
        return (
        <div>
            <BrowserRouter>
            <Switch>
            <Route path="/" exact component={Homepage}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/admin" component={Admin}></Route>
            </Switch>
            </BrowserRouter>
        </div>)

    }
}