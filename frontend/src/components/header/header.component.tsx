import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ignoredHeader } from '../../config/ignored.components.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import styles from "./header.component.module.scss";

const HeaderComponent = ( props: any ) => {
    const location = useLocation();

    const findIgnored = () => ignoredHeader.find((header: string) => header === location.pathname);

    let ignored = findIgnored();

    useEffect(() => { ignored = findIgnored() }, [location]);

    return (
        <>
            { !ignored ? (
                <div className={styles.container}>
                    <div className={styles.action_icons}>
                        <Link to="/menu" className={styles.link}>
                            <FontAwesomeIcon icon={['fas', "bars"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                        </Link>
                        <Link to="/" className={styles.link}>
                            <FontAwesomeIcon icon={['fas', "search"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                        </Link>
                    </div>

                    <div className={styles.action_icons}>
                        <Link to="/auth" className={styles.link}>
                            <FontAwesomeIcon icon={['fas', "user-alt"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                        </Link>
                        
                        <Link to="/basket" className={styles.link}>
                            <FontAwesomeIcon icon={['fas', "shopping-basket"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                        </Link>
                    </div>
                </div>
            ) : null }
        </>
    )   
}

export default HeaderComponent;