
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import * as NotificationActions from "../store/actions/notification.action";
import { NotificationMessage } from '../models/notification.model';
import { getNotifications, State } from "../store/index";
import LandingComponent from './landing/landing.component';

const App = ( props: Props ) => {
  const notifications = useSelector(( state: State ) => getNotifications(state));
  console.log(notifications)
  
  return (
    <>
      <button onClick={() => props.sendNotification({ title: "Example title", message: "Example message", success: true })}>Dispatch</button>
      <LandingComponent />
    </> 
  );
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
  return {
    sendNotification: (notification: NotificationMessage) => dispatch(NotificationActions.displayMessage(notification))
  }
}

const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(App);
