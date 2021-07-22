import { Route, Switch } from "react-router-dom";
import LandingComponent from "../containers/landing/landing.component";
import ProductsComponent from "../components/products/products.component";
import ProductViewComponent from "../components/products/product/product-view/product-view.component";
import BasketComponent from "../components/basket/basket.component";
import { withRouter } from 'react-router-dom';

const PublicRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <LandingComponent />
            </Route>
            <Route path="/basket" exact>
                <BasketComponent />
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

export default withRouter(PublicRoutes);