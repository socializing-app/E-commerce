import React from "react";
import { Routes } from "../models/routes.model";
import Roles from "./roles.config";

// This is where we set up the routes and their configurations
// These components were added as an example. They will be removed.
const HeroComponent = React.lazy(() => import("../components/hero/hero.component"));
const OffersComponent = React.lazy(() => import("../components/offers/offers.component"));
const FeaturedComponent = React.lazy(() => import("../components/featured/featured.component"));

const RoutesConfig: Routes[] = [
    {
        component: HeroComponent,
        path: "hero",
        title: "Hero component",
        exact: true,
        permission: [ Roles.SuperAdmin ]
    },
    {
        component: OffersComponent,
        path: "offers/:id",
        title: "Offers component",
        exact: true,
        permission: [ Roles.SuperAdmin, Roles.Customer ]
    },
    {
        component: FeaturedComponent,
        path: "featured",
        title: "Featured component",
        exact: true,
        permission: [ Roles.SuperAdmin ]
    }
]

export default RoutesConfig;