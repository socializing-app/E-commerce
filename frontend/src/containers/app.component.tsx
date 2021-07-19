import { useSelector } from 'react-redux';
import { getNotifications, State } from "../store/index";
import { Route, Switch, Router } from 'react-router-dom';
import React, { Suspense } from "react";
import PrivateRoutes from "../routes/private.routes";
import { createBrowserHistory } from 'history';
import PublicRoutes from "../routes/public.routes";
import HeaderComponent from "../components/header/header.component";
import FooterComponent from "../components/footer/footer.component";

const App = () => {
  const notifications = useSelector(( state: State ) => getNotifications(state));
  console.log(notifications)
  const history = createBrowserHistory({})
  
  return (   
    <>
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

export default App;