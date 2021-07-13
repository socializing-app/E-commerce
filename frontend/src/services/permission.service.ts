export const permittedRoutes = (routes: any) => {
    // This will be read from Redux Store
    const role = "SUPER ADMIN";

    return routes.filter(({ permission }: any) => {
        if ( permission === undefined ) return true;
        
        return permission.includes(role);
    })
}