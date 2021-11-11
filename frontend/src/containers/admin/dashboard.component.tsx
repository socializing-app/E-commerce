import ListGroup from 'react-bootstrap/ListGroup'
import { Menu } from '../../models/menu.model';
import { Link, useRouteMatch } from "react-router-dom";
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './dashboard.component.module.scss';
import { Route, Switch, BrowserRouter as Router, useHistory } from 'react-router-dom';
import PublicRoutes from "../../routes/public.routes";
import React, { Suspense, useState } from "react";
import NewProductComponent from './products/new.component';
import publicRoutes from '../../routes/public.routes';
import NewCategoryComponent from './categories/new.component';

export const menu: Menu[] = [
    {
        title: "Add Product",
        icon: "check-circle",
        link: "/admin/products/new"
    },
    {
        title: "Add Category",
        icon: "check-circle",
        link: "/admin/categories/new"
    }
]

export const adminMenuStructure = [
    {
        title: "Main",
        subMenu: [
            {
                title: "Dashboard",
                icon: "chart-line",
                link: ""
            }
        ]
    },
    {
        title: "Components",
        subMenu: [
            {
                title: "Products",
                icon: "tasks",
                link: "",
                items: [
                    {
                        title: "Add",
                        icon: "check-circle",
                        link: "/admin/products/new"
                    }
                ]
            },
            {
                title: "Categories",
                icon: "bars",
                link: "",
                items: [
                    {
                        title: "Add",
                        icon: "check-circle",
                        link: "/admin/categories/new"
                    }
                ]
            }
        ]
    }
]

const AdminDashboardComponent = ( props: any ) => {
    const [ selectedMenu, setSelectedMenu ] = useState("Dashboard");
    let { path, url } = useRouteMatch();
    
    return <div className={styles.container}>
                <div className={styles.panel}>
                    { adminMenuStructure.map((menu: any) => (
                        <>
                            <div className={styles.menu_title}>{ menu.title }</div>
                        
                            { menu.subMenu.map((sub: any) => (
                                <>
                                    <div className={styles.submenu_title}>
                                        <FontAwesomeIcon icon={['fas', (sub.icon) as IconName]} className="mr-3" style={{fontSize: "1.5rem"}} />
                                        <span>{ sub.title }</span>
                                    </div>

                                    <div className={styles.items}>
                                        { sub.items && sub.items.map((item: any, index: number) => (
                                            <Link to={item.link} key={`menu-item-${index}`} className={styles.item_title} onClick={() => setSelectedMenu(item.title)}>
                                                <span>{ item.title }</span>
                                            </Link>
                                        )) }
                                    </div>
                                </>
                            )) }
                        </>
                    )) }
                </div>

                <div className={styles.area}>
                    <div className={styles.area_title}>{ selectedMenu }</div>

                    <Switch>
                        <Route exact path={`/admin/products/new`}>
                            <NewProductComponent />
                        </Route>
                        <Route path="/admin/categories/new" exact>
                            <NewCategoryComponent />
                        </Route>
                    </Switch>   
                </div>
           </div>
}

export default AdminDashboardComponent;