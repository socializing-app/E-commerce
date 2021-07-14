import RoutesConfig from "../config/routes.config";
import { permittedRoutes } from "../services/permission.service";
import MapRoutes from "./map.routes";

const PrivateRoutes = () => {
    const Routes = permittedRoutes(RoutesConfig);
    
    return <MapRoutes routes={ Routes } basePath="/" />
}

export default PrivateRoutes;