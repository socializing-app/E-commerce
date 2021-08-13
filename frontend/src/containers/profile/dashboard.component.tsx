import Button from 'react-bootstrap/esm/Button';
import { Dispatch } from 'redux';
import { NotificationMessage } from '../../models/notification.model';
import * as NotificationActions from "../../store/actions/notification.action";
import * as UserActions from "../../store/actions/user.action";
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { isAuthorised, State } from '../../store';
import { useHistory } from 'react-router-dom';

const DashboardComponent = (props: Props) => {
    const authorised: boolean = useSelector(( state: State ) => isAuthorised(state));
    const history = useHistory();

    if ( !authorised ) {
        // navigate away
        history.push("/");
    }
    
    return <>
                Dashboard component
                <Button variant="orange" onClick={props.logoutUser}>Log out</Button>
           </>
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