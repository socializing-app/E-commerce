import { Route, Switch } from "react-router-dom";
import LandingComponent from "../containers/landing/landing.component";
import LoginComponent from "../components/auth/login/login.component";
import RegisterComponent from "../components/auth/register/register.component";

const PublicRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact> <LandingComponent /> </Route>
            <Route path="/signin" exact> <LoginComponent /> </Route>
            <Route path="/signup" exact> <RegisterComponent /> </Route>
        </Switch>
    )
}

export default PublicRoutes;