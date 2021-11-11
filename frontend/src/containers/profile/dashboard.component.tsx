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

const DashboardComponent = (props: Props) => {
    const authorised: boolean = useSelector(( state: State ) => isAuthorised(state));
    const user: User = useSelector(( state: State ) => getUser(state));
    const history = useHistory();

    if ( !authorised ) {
        // navigate away
        history.push("/");
    }

    const menu: Menu[] = [
        {
            title: "Profile",
            icon: "user",
            link: "/dashboard/profile"
        },
        {
            title: "Orders",
            icon: "check-circle",
            link: "/menu/categories"
        },
        {
            title: "Reviews",
            icon: "check-circle",
            link: "/"
        },
        {
            title: "Settings",
            icon: "check-circle",
            link: "/"
        }
    ]

    const options: Menu[] = [
        {
            title: "Change Password",
            icon: "check-circle",
            link: "/"
        },
        {
            title: "Support",
            icon: "check-circle",
            link: "/menu/categories"
        },
        {
            title: "Sign Out",
            icon: "check-circle",
            link: "/",
            class: "signout",
            action: "logout"
        }
    ]

    const actions = ( action: string ) => {
        switch ( action ) {
            case "logout": props.logoutUser()
        }
    }
    
    return <div className={styles.dashboard}>
                <div className={styles.dashboard__header}>
                    <div className={styles.dashboard__title}>Dashboard</div>
                    <div className={styles.dashboard__userinfo}>
                        <div>
                            <div className={styles.dashboard__userinfo_image}>
                                <img src="https://picsum.photos/800/400" alt=""/>
                                {/* <img src={user.profileImagePath} alt=""/> */}
                            </div>
                            <div className={styles.dashboard__userinfo_name}>Boldog Boldizsar</div>
                        </div>

                        <FontAwesomeIcon icon={['fas', "pen-square"]} className={styles.dashboard__userinfo_icon} style={{fontSize: "1.5rem"}} />
                    </div>
                </div>

                <div className={styles.dashboard__body}>
                    <ListGroup className={styles.list}>
                        { menu.map((element: any, index: number) => (
                            <Link to={element.link} className={styles.link} key={`menu-item-${index}`}>
                                <ListGroup.Item className={styles.listItem}>
                                    <span>
                                        <FontAwesomeIcon icon={['fas', (element.icon) as IconName]} className="mr-2" style={{fontSize: "1.5rem"}} />
                                        <span>{ element.title }</span>
                                    </span>
                                    <FontAwesomeIcon icon={['fas', "arrow-right"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                                </ListGroup.Item>
                            </Link>
                        )) }
                    </ListGroup>

                    <ListGroup className={styles.list}>
                        { options.map((element: any, index: number) => (
                            <Link to={element.link} className={styles.link} key={`menu-item-${index}`}>
                                <ListGroup.Item className={styles.listItem} onClick={() => actions(element.action)}>
                                    <span className={styles[element.class]}>{ element.title }</span>
                                </ListGroup.Item>
                            </Link>
                        )) }
                    </ListGroup>
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