import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ignoredFooter } from '../../config/ignored.components.config';

const FooterComponent = ( props: any ) => {
    const location = useLocation();

    const findIgnored = () => ignoredFooter.find((header: string) => header === location.pathname);

    let ignored = findIgnored();

    useEffect(() => { ignored = findIgnored() }, [location]);
    
    return (
        <>
            { !ignored ? (
                <>
                    FooterComponent
                </>
            ) : null }
        </>
    ) 
}

export default FooterComponent;