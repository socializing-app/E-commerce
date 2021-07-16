import { connect, ConnectedProps, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as NotificationActions from "../store/actions/notification.action";
import { NotificationMessage } from '../models/notification.model';
import { getNotifications, State } from "../store/index";
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import React, { Suspense } from "react";
import PrivateRoutes from "../routes/private.routes";
import { createBrowserHistory } from 'history';
import PublicRoutes from "../routes/public.routes";
import HeaderComponent from "../components/header/header.component";
import FooterComponent from "../components/footer/footer.component";

const App = ( props: Props ) => {
  const notifications = useSelector(( state: State ) => getNotifications(state));
  console.log(notifications)
  const history = createBrowserHistory({})
  
  return (   
    <>
      <button onClick={() => props.sendNotification({ title: "Example title", message: "Example message", success: true })}>Dispatch</button>
      <Router history={history}>
			  <Switch>
          <Route path="/">
            <Suspense fallback={<div>Loading...</div>}>
              <HeaderComponent />
              <PublicRoutes />
              <PrivateRoutes />
              <FooterComponent />

              {/* Here we need to check all routes and if we don't have a match then redirect. */}
              {/* <Route path="*" render={() => <Redirect to="/" />}  /> */}
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </> 
  );
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
  return {
    sendNotification: (notification: NotificationMessage) => dispatch(NotificationActions.displayMessage(notification))
  }
}

const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(App);
