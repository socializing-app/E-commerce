import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ignoredFooter } from '../../config/ignored.components.config';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./footer.component.module.scss";
import { CompanyDetails, SocialIcon, SocialIcons } from '../../config/settings.config';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import NavigationComponent from './navigation/navigation.component';
import SubscriptionComponent from './subscription/subscription.component';

const FooterComponent = ( props: any ) => {
    const location = useLocation();
    const companyName: string = CompanyDetails.name;
    const copyright: string = CompanyDetails.copyright;
    const socialIcons: SocialIcon[] = SocialIcons;

    const findIgnored = () => ignoredFooter.find((header: string) => header === location.pathname);

    let ignored = findIgnored();

    useEffect(() => { ignored = findIgnored() }, [location]);
    
    return (
        <>
            { !ignored ? (
                <>
                    <NavigationComponent />
                    <SubscriptionComponent />

                    <div className={styles.container}>
                        <div className={styles.company}>{ companyName }</div>
                        <div className={styles.socials}>
                            { socialIcons.map((icon: SocialIcon, index: number) => (
                                <Link to={icon.link} className={styles.link} key={`social-icon-${index}`}>
                                    <FontAwesomeIcon icon={['fab', (icon.icon) as IconName]} className="mr-2" style={{ fontSize: "3rem", color: icon.colour }} />
                                </Link>
                            )) }
                        </div>

                        <hr/>

                        <div className={styles.copyright}>{ copyright }</div>
                    </div>
                </>
            ) : null }
        </>
    ) 
}

export default FooterComponent;