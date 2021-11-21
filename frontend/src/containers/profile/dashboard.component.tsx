import Button from 'react-bootstrap/esm/Button';
import { Dispatch } from 'redux';
import { NotificationMessage } from '../../models/notification.model';
import * as NotificationActions from "../../store/actions/notification.action";
import * as UserActions from "../../store/actions/user.action";
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { getUser, isAuthorised, State } from '../../store';
import { useHistory } from 'react-router-dom';
import styles from "./dashboard.component.module.scss";
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Menu } from '../../models/menu.model';
import { User } from '../../models/user.model';
import useWindowWidth from '../../services/windowSize.service';

const DashboardComponent = (props: Props) => {
    const authorised: boolean = useSelector(( state: State ) => isAuthorised(state));
    const user: User = useSelector(( state: State ) => getUser(state));
    const history = useHistory();
    const windowWidth = useWindowWidth();

    if ( !authorised ) {
        // navigate away
        history.push("/");
    }

    console.log(user)
    
    return <div className={styles.dashboard}>
                <div className={styles.leftpanel} >
                    <div className={styles.dashboard__header}>
                        <div className={styles.dashboard__title}>Dashboard</div>
                        <div className={styles.dashboard__userinfo}>
                            <div>
                                <div className={styles.dashboard__userinfo_image}>
                                    <img src="https://picsum.photos/800/800" alt=""/>
                                    {/* <img src={user.profileImagePath} alt=""/> */}
                                </div>
                                <div className={styles.dashboard__userinfo_name}>{ user.firstName } { user.lastName }</div>
                            </div>

                            <FontAwesomeIcon icon={['fas', "pen-square"]} className={styles.dashboard__userinfo_icon} style={{fontSize: "1.5rem"}} />
                        </div>
                    </div>

                    <div className={styles.dashboard__body}>
                        <div className={styles.dashboard__title}>Purchased Products</div>

                        <div className={styles.dashboard__content}>
                            In this section, you will see products that this user has purchased. 
                        </div>
                    </div>

                    <div className={styles.dashboard__body}>
                        <div className={styles.dashboard__title}>Reviews</div>

                        <div className={styles.dashboard__content}>
                            In this section, you will see reviews that this user has written. 
                        </div>
                    </div>

                    <div className={styles.dashboard__body}>
                        <div className={styles.dashboard__title}>Security</div>

                        <div className={styles.dashboard__content}>
                            In this section, you will see things that require careful attention.
                            <div className="mt-3"><a onClick={() => props.logoutUser()}>Sign Out</a></div>
                        </div>
                    </div>
                </div>

                <div className={styles.rightpanel}>
                    <div className={styles.rightpanel_image}>
                        <img src="https://picsum.photos/800/800" alt=""/>
                        {/* <img src={user.profileImagePath} alt=""/> */}
                    </div>

                    <div>
                        { user.firstName } { user.lastName }
                    </div>

                    <div>
                        In this section, you will see a list of links that point to a certain section.
                    </div>

                    <div>
                        <Link to="/dashboard/profile">Edit Profile</Link>
                    </div>
                </div>
           </div>
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
    return {
      sendNotification: (notification: NotificationMessage) => dispatch(NotificationActions.displayMessage(notification)),
      logoutUser: () => dispatch(UserActions.logoutUser())
    }
}
  
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(DashboardComponent);