import { Route, Switch } from "react-router-dom";
import LandingComponent from "../containers/landing/landing.component";

const PublicRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <LandingComponent />
            </Route>
        </Switch>
    )
}

export default PublicRoutes;