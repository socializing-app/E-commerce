import { Route, Switch } from "react-router-dom";
import LandingComponent from "../containers/landing/landing.component";
import ProductsComponent from "../components/products/products.component";
import ProductViewComponent from "../components/products/product/product-view/product-view.component";
import BasketComponent from "../components/basket/basket.component";
import { withRouter } from 'react-router-dom';
import MenuComponent from "../components/menu/menu.component";
import MenuCategoriesComponent from "../components/menu/menu-categories/menu-categories.component";
import AuthComponent from "../components/auth/auth.component";
import DashboardComponent from "../containers/profile/dashboard.component";
import ProfileComponent from "../containers/profile/profile/profile.component";
import AdminDashboardComponent from "../containers/admin/dashboard.component";
import NewProductComponent from "../containers/admin/products/new.component";
import NewCategoryComponent from "../containers/admin/categories/new.component";

const PublicRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <LandingComponent />
            </Route>
            <Route path="/auth" exact>
                <AuthComponent />
            </Route>
            <Route path="/basket" exact>
                <BasketComponent />
            </Route>
            <Route path="/menu" exact>
                <MenuComponent />
            </Route>
            <Route path="/menu/categories" exact>
                <MenuCategoriesComponent />
            </Route>
            <Route path="/products" exact>
                <ProductsComponent />
            </Route>
            <Route path="/product/:id" exact>
                <ProductViewComponent />
            </Route>
            <Route path="/dashboard" exact>
                <DashboardComponent />
            </Route>

            <Route path="/dashboard/profile" exact>
                <ProfileComponent />
            </Route>

            <Route path="/admin/dashboard" exact>
                <AdminDashboardComponent />
            </Route>
            <Route path="/admin/products/new" exact>
                <AdminDashboardComponent />
            </Route>
            <Route path="/admin/categories/new" exact>
                <AdminDashboardComponent />
            </Route>
        </Switch>
    )
}

export default withRouter(PublicRoutes);