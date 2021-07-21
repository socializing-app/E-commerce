import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { initialLoginModel } from "../../../models/form.model";
import { signin } from '../../../services/auth.service';

const LoginComponent: React.FC<any> = (props: any): JSX.Element => {
    const [loginForm, setLoginForm] = useState(initialLoginModel);

    const performChange = ( field: string, value: string ): void => {
        const validatorResult: string | null = (loginForm as any)[field].validator(value);

        setLoginForm({ ...loginForm, 
            [field]: { 
              ...(loginForm as any)[field], 
              touched: true, 
              value: value, 
              valid: validatorResult === null,
              error: validatorResult } });
    }

    const handleBlur = (event: any): void => {
        performChange(event.target.id, event.target.value);
    }

    const handleChange = (event: any): void => {
        if ( (loginForm as any)[event.target.id].touched ) performChange(event.target.id, event.target.value);
    };

    const handleSubmit = (): void => {
        const payload: any = {};

        for( let field in loginForm ) { 
            payload[field] = (loginForm as any)[field].value;

            if ( !(loginForm as any)[field].valid ) return;
        }

        signin(payload, ( response: any ) => {
            props.onSendNotification({ title: "Login success", message: "You have logged in successfully", type: "success" });
        }, (response: any) => {
            props.onSendNotification({ title: "Login error", message: response.error.message, type: "error" });
        })
    };

    return <Container>
                <Form>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" 
                                        placeholder="Email address"
                                        name="email" 
                                        isValid={ !!loginForm.email.value.length && loginForm.email.valid && loginForm.email.touched } 
                                        isInvalid={ !!loginForm.email.error && loginForm.email.touched }
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">{ loginForm.email.error }</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="Password" 
                                      name="password" 
                                      isValid={ !!loginForm.password.value.length && loginForm.password.valid && loginForm.password.touched } 
                                      isInvalid={ !!loginForm.password.error && loginForm.password.touched }
                                      onBlur={handleBlur}
                                      onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">{ loginForm.password.error }</Form.Control.Feedback>
                    </Form.Group>

                    <Button type="button" onClick={handleSubmit}>Sign in</Button>
                </Form>
           </Container>
}

export default LoginComponent;