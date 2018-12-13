import React, { Component } from "react";
import Login from "../Login";
import { Router, Route, Switch } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import Register from "../Register";
import Admin from "../admin/Admin";
import Vacations from "../Vacations";
import Statistic from "../admin/Statistic";
export const history= createBrowserHistory();

class Main extends Component {
  render() {
    return (
      <div className="container">
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route exact path="/admin/statistics" component={Statistic} />
              <Route path="/admin" component={Admin} />
              <Route path="/vacations" component={Vacations} />
              <Route exact path="" component={Login} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Main;
