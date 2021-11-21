import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import { useState } from 'react';
import { Dispatch } from 'redux';
import { NotificationMessage } from '../../models/notification.model';
import * as NotificationActions from "../../store/actions/notification.action";
import * as UserActions from "../../store/actions/user.action";
import { connect, ConnectedProps } from 'react-redux';
import styles from "./auth.component.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../../models/user.model';

const AuthComponent: React.FC<Props> = ( props: Props ): JSX.Element => {
    const [isLogin, setIsLogin] = useState(false);

    const handleClick = ( value: boolean ): void => ( isLogin !== value ) ? setIsLogin(!isLogin) : undefined;

    return  <div className={styles.auth_container}>
                
                <div className={styles.title}>{ !isLogin ? 'Create a new account' : 'Please log into your account' }</div>
                <div className={`${styles.alertinfo}`}>There is a lot to do here. You can read about your favourite chillies and you can purchase them. It is really easy. And you have the chance to give your reviews so we can improve our services. You can collect points and sign up to our newsletter and there is so much more!<span>That's Handy <FontAwesomeIcon icon={['fas', "pepper-hot"]} style={{fontSize: "1.2rem", color: "rgb(147, 29, 27)"}} /></span></div>

                { !isLogin ? <RegisterComponent onSendNotification={props.sendNotification} onLoginUser={props.loginUser} /> : 
                            <LoginComponent onSendNotification={props.sendNotification} onLoginUser={props.loginUser} /> }

                <div className={styles.link} onClick={() => handleClick(!isLogin)}>{ !isLogin ? 'Have an account? Please log in here' : 'Need an account? Please sign up here' }</div>
            
                {/* <div className={styles.line}>
                    <span></span>
                    <span>Or you can</span>
                    <span></span>
                </div> */}

                {/* <Button variant="facebook" className={styles.button} disabled>
                    <FontAwesomeIcon icon={['fab', "facebook-square"]} style={{fontSize: "1.5rem"}} /> 
                    <span>{ isLogin ? 'Log in' : 'Sign up' } with Facebook</span>
                </Button> */}
                
            </div>
           
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
    return {
      sendNotification: (notification: NotificationMessage) => dispatch(NotificationActions.displayMessage(notification)),
      loginUser: (user: User) => dispatch(UserActions.loginUser(user))
    }
}
  
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(AuthComponent);