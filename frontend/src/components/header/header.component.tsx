import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ignoredHeader } from '../../config/ignored.components.config';

const HeaderComponent = ( props: any ) => {
    const location = useLocation();

    const findIgnored = () => ignoredHeader.find((header: string) => header === location.pathname);

    let ignored = findIgnored();

    useEffect(() => { ignored = findIgnored() }, [location]);

    return (
        <>
            { !ignored ? (
                <>
                    HeaderComponent
                </>
            ) : null }
        </>
    )   
}

export default HeaderComponent;