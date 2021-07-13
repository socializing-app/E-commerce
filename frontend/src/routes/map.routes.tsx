import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { memo } from 'react';

const MapRoutes = (props: any) => {
    const match = useRouteMatch(props.basePath);
    
    return (
        <Switch>
            { props.routes.map((route: any) => {
                const { path, component: Component, children, title, permission, ...rest } = route;
                
                return (
                    <Route {...rest} key={path} path={`${match?.path}${path}`}>
                        <Component children={children} />
                    </Route>
                )
            })}

            <Route path="*" exact render={() => <Redirect to="/" />}  />
        </Switch>
    )
}

export default memo(MapRoutes);