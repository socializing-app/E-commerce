import { useSelector } from 'react-redux';
import { getNotifications, State } from "../../store/index";
import React, { useEffect, useState } from "react";
import Toast from 'react-bootstrap/Toast';
import { initialToaster } from "../../models/toast.model";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { NotificationMessage } from '../../models/notification.model';
import { Dispatch } from 'redux';
import * as NotificationActions from "../../store/actions/notification.action";
import { connect } from 'react-redux';
import styles from "./toast.component.module.scss";

const getToastSettings = (type: string) => {
    switch ( type ) {
        case "success": 
            return {
                icon: "check-circle",
                color: "#FFFFFF",
                background: "#5cb85c"
            }
        case "error": 
            return {
                icon: "exclamation-circle",
                color: "#FFFFFF",
                background: "#d9534f"
            }
        case "info": 
            return {
                icon: "info-circle",
                color: "#FFFFFF",
                background: "#5bc0de"
            }
        case "warning": 
            return {
                icon: "exclamation-triangle",
                color: "#FFFFFF",
                background: "#f0ad4e"
            }
    }
}

const ToastComponent = ( props: any ) => {
    const { dismissTime, width, top, right } = initialToaster;
    const [ toasters, setToasters ] = useState([]);
    
    const notifications: NotificationMessage[] = useSelector(( state: State ) => getNotifications(state));

    const removeToaster = (id: string): void => {
        const newShow = toasters.filter((value: string) => value !== id);
        setToasters(newShow);
        props.removeNotification(id);
    };

    useEffect(() => {
        setToasters((toasters) => notifications.map((n: NotificationMessage) => n.id) as any);
    }, [notifications]);

    return (
        <>
            { toasters.map((toaster: string, index: number) => {
                        const notification = notifications.find((n: NotificationMessage) => n.id === toaster) as NotificationMessage;
                        
                        if ( !notification ) return null;

                        const settings =  getToastSettings(notification?.type);
                        
                        return (
                            <Toast  show={ (toasters as any).includes(notification.id) }
                                    onClose={ () => removeToaster(notification.id) }
                                    delay={ dismissTime }
                                    autohide 
                                    animation={ true } 
                                    className={styles.toast}
                                    style={{ top: ((index * 90) + ((index + 1) * top)), right, width, position: "absolute", 
                                             color: settings?.color, background: settings?.background }}
                                    key={`toast-${notification.id}`}>

                                <Toast.Header style={{ background: settings?.background, color: settings?.color }}>
                                    <FontAwesomeIcon icon={['fas', (settings?.icon) as IconName]} className="mr-2" style={{fontSize: "1.5rem"}} />
                                    <strong className="mr-auto">{ notification.title }</strong>
                                </Toast.Header>

                                <Toast.Body>{ notification.message }</Toast.Body>
                            </Toast>
                        )
            }) }
        </>
    )
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
    return {
      removeNotification: (id: string) => dispatch(NotificationActions.dismissMessage(id))
    }
}

export default connect(null, mapDispatchToProps)(ToastComponent);