import Button from 'react-bootstrap/esm/Button';
import { Dispatch } from 'redux';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { getUser, isAuthorised, State } from '../../../store';
import { useHistory } from 'react-router-dom';
import styles from "./profile.component.module.scss";
import ListGroup from 'react-bootstrap/ListGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { Menu } from '../../../models/menu.model';
import { User } from '../../../models/user.model';
import FormsComponent from '../../../shared/forms/forms.component';
import { useState } from 'react';
import { update } from "../../../services/user.service";
import { NotificationMessage } from '../../../models/notification.model';
import * as NotificationActions from "../../../store/actions/notification.action";
import * as UserActions from "../../../store/actions/user.action";
import UploadComponent from '../../../shared/modal/upload';
import { uploadModal } from '../../../services/modal.service';
import { buildForm } from '../../../services/form.service';

const ProfileComponent = (props: Props) => {
    const authorised: boolean = useSelector(( state: State ) => isAuthorised(state));
    const user: User = useSelector(( state: State ) => getUser(state));
    const { firstName, lastName, email } = user;

    const history = useHistory();
    const [ form, setForm ] = useState(buildForm({ firstName, lastName, email }));
    const [ show, setShow ] = useState(false);

    if ( !authorised ) history.push("/");

    const menu: Menu[] = [
        {
            title: "Profile",
            icon: "check-circle",
            link: "/"
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

    const updateValue = (value: any, index: number) => {
        return form.map((option: any, i: number) => {
          if ( index === i ) return { ...option, value }
          return option;
        })
    }

    const handleChange = (value: any, index: number) => setForm(updateValue(value, index));

    const handleImageArrived = (image: any) => {
        // this base64 string can be uploaded to Amazon S3
        console.log(image)
        setShow(false)
    }

    const updateProfile = () => {
        let payload: any = { id: user._id };
        form.forEach((field: any) => payload[field.name] = field.value);

        update(payload).then((response: any) => {
            props.updateUser(response.user);
            props.sendNotification({ id: "", title: "Update success", message: "You have updated your profile successfully", type: "success" });
        }, (response: any) => {
            props.sendNotification({ id: "", title: "Update error", message: response.error.message, type: "error" });
        });
    }
    
    return <div className={styles.profile}>
                <div className={styles.profile__header}>
                    <div className={styles.profile__title}>
                        <Link to="/dashboard" className={styles.profile__title_back}><FontAwesomeIcon onClick={() => setShow(true)} icon={['fas', "arrow-left"]} /></Link>
                        <div className={styles.profile__title_save} onClick={updateProfile}>Save</div>
                    </div>
                    <div className={styles.profile__userinfo}>
                        <div>
                            <div className={styles.profile__userinfo_image}>
                                <div>
                                    <img src="https://picsum.photos/800/400" alt=""/>
                                </div>

                                <FontAwesomeIcon onClick={() => setShow(true)} icon={['fas', "pen-square"]} className={styles.profile__userinfo_icon} />
                            </div>
                            <div className={styles.profile__userinfo_name}>{ user.firstName } { user.lastName }</div>
                        </div>
                    </div>
                </div>

                <div className={styles.profile__body}>
                    { form.map((field: any, index: number) => (
                        <div className={styles.field} key={`form-field-${index}`}>
                            <FormsComponent field={field} handleChange={handleChange} index={index} />
                        </div>
                    )) }
                </div>

                { uploadModal(show, "Choose your photo",  () => setShow(false), handleImageArrived) }
           </div>
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
    return {
      sendNotification: (notification: NotificationMessage) => dispatch(NotificationActions.displayMessage(notification)),
      updateUser: (user: User) => dispatch(UserActions.updateUser(user))
    }
}
  
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(ProfileComponent);