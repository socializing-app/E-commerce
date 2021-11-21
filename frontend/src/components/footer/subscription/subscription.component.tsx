import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from "./subscription.component.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

const SubscriptionComponent = ( props: any ) => {
    const [email, setEmail] = useState("");

    const handleChange = ( event: any ) => {
        setEmail(event.currentTarget.value);
    }

    const handleSubmit = () => {
        // Might need some inspection on the value.
        // Send this to the API.
    }

    return <div className={styles.container}>
                <div className={styles.header}>
                    <FontAwesomeIcon icon={['fas', "mail-bulk"]} className="mr-2" style={{fontSize: "1.5rem"}} />
                    <div className={styles.header__title}>Excited about the chillies? <span>Join The Mailing List</span></div>
                </div>

                <div className={styles.subtitle}>
                    Never miss out on new chillies, exclusive offers, and more when you join the Smoking Hot mailing list.
                </div>

                <InputGroup>
                    <Form.Control type="text" placeholder="Enter your email address" name="email" value={email} onChange={handleChange} />
                    <Button variant="red" onClick={handleSubmit} className={styles.button}>Sign Up</Button>
                </InputGroup>
           </div>
}

export default SubscriptionComponent;