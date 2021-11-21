import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ignoredHeader } from '../../config/ignored.components.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import styles from "./header.component.module.scss";
import { User } from '../../models/user.model';
import { useSelector } from 'react-redux';
import { getUser, isAuthorised, State } from '../../store';
import { BasketProduct, State as Basket } from "../../models/basket.model";
import { getBasket, getBasketTotal, State as BasketState } from "../../store";
import useWindowWidth from '../../services/windowSize.service';

const HeaderComponent = ( props: any ) => {
    const location = useLocation();
    const user: User = useSelector(( state: State ) => getUser(state));
    const basket: Basket = useSelector(( state: BasketState ) => getBasket(state));
    const authorised: boolean = useSelector(( state: State ) => isAuthorised(state));
    const windowWidth = useWindowWidth();

    const findIgnored = () => ignoredHeader.find((header: string) => header === location.pathname);

    let ignored = findIgnored();

    useEffect(() => { ignored = findIgnored() }, [location]);

    return (
        <>
            { !ignored ? (
                <div className={styles.container}>
                    <Link to="/" className={styles.link}>
                        <div className={styles.logocontainer}>
                            <div className={styles.logoname}><span>Smoking</span>Hot</div>
                            <div className={styles.logo}>
                                <img src="https://e-commerce-bucket-images.s3.eu-west-2.amazonaws.com/Screenshot+2021-11-19+at+15.29.23.png" alt=""/>
                            </div>
                        </div>
                    </Link>

                    { windowWidth < 992 ? (
                        <div className={styles.action_icons}>
                            { authorised ? (
                                <Link to="/dashboard" className={styles.link}>
                                    <FontAwesomeIcon icon={['fas', "user-cog"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                                </Link>
                            ) : (
                                <Link to="/auth" className={styles.link}>
                                    <FontAwesomeIcon icon={['fas', "user-alt"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                                </Link>
                            )}
                            
                            <Link to="/basket" className={styles.link}>
                                <FontAwesomeIcon icon={['fas', "shopping-basket"]} className="mr-2" style={{fontSize: "1.5rem"}} /> { basket.products.length }
                            </Link>
                        </div>
                    ) : (
                        <div className={styles.action_list}>
                            <ul>
                                { authorised ? ( <Link to="/dashboard" className={styles.link}><li>Profile</li></Link> ) : 
                                            ( <Link to="/auth" className={styles.link}><li>Sign In</li></Link> )}
                                <Link to="/products" className={styles.link}><li className={styles.importantlink}>Products</li></Link>
                                <Link to="/basket" className={styles.link}><li><FontAwesomeIcon icon={['fas', "pepper-hot"]} className="mr-2" style={{fontSize: "1.2rem", color: "rgb(147, 29, 27)"}} /> Bag { basket.products.length }</li></Link>
                            </ul>
                        </div>
                    ) }
                </div>
            ) : null }
        </>
    )   
}

export default HeaderComponent;