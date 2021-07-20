import { Route, Switch } from "react-router-dom";
import LandingComponent from "../containers/landing/landing.component";
import ProductsComponent from "../components/products/products.component";
import ProductViewComponent from "../components/products/product/product-view/product-view.component";

const PublicRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <LandingComponent />
            </Route>
            <Route path="/products" exact>
                <ProductsComponent />
            </Route>
            <Route path="/product/:id" exact>
                <ProductViewComponent />
            </Route>
        </Switch>
    )
}

export default PublicRoutes;