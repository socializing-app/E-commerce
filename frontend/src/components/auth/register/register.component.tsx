import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { initialRegisterModel } from "../../../models/form.model";
import { signup } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { useHistory } from 'react-router-dom';

const RegisterComponent: React.FC<any> = (props: any): JSX.Element => {
    const [registerForm, setRegisterForm] = useState(initialRegisterModel);
    const history = useHistory();

    const performChange = ( field: string, value: string ): void => {
        const validatorResult: string | null = (registerForm as any)[field].validator(value);

        setRegisterForm({ ...registerForm, 
            [field]: { 
              ...(registerForm as any)[field], 
              touched: true, 
              value: value, 
              valid: validatorResult === null,
              error: validatorResult } });
    }

    const handleBlur = (event: any): void => {
        performChange(event.target.id, event.target.value);
    }

    const handleChange = (event: any): void => {
        if ( (registerForm as any)[event.target.id].touched ) performChange(event.target.id, event.target.value);
    };

    const handleSubmit = (): void => {
        const payload: any = {};

        for( let field in registerForm ) { 
            payload[field] = (registerForm as any)[field].value;

            if ( !(registerForm as any)[field].valid ) return;
        }

        signup(payload).then((response: any) => {
            props.onSendNotification({ title: "Registration success", message: "You have registered successfully", type: "success" });
            console.log(response)
            const user: User = { ...response.user, accessToken: response.accessToken };
            props.onLoginUser(user);
            history.push("/");
        }, (response: any) => {
            props.onSendNotification({ title: "Registration error", message: response.error.message, type: "error" });
        });
    };

    return <Form className="my-5">
                    <Form.Group controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="First name" 
                                      name="firstName" 
                                      isValid={ !!registerForm.firstName.value.length && registerForm.firstName.valid && registerForm.firstName.touched } 
                                      isInvalid={ !!registerForm.firstName.error && registerForm.firstName.touched } 
                                      onBlur={handleBlur}
                                      onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">{ registerForm.firstName.error }</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="Last name" 
                                      name="lastName" 
                                      isValid={ !!registerForm.lastName.value.length && registerForm.lastName.valid && registerForm.lastName.touched } 
                                      isInvalid={ !!registerForm.lastName.error && registerForm.lastName.touched } 
                                      onBlur={handleBlur}
                                      onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">{ registerForm.lastName.error }</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" 
                                        placeholder="Email address"
                                        name="email" 
                                        isValid={ !!registerForm.email.value.length && registerForm.email.valid && registerForm.email.touched } 
                                        isInvalid={ !!registerForm.email.error && registerForm.email.touched }
                                        onBlur={handleBlur}
                                        onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">{ registerForm.email.error }</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" 
                                      placeholder="Password" 
                                      name="password" 
                                      isValid={ !!registerForm.password.value.length && registerForm.password.valid && registerForm.password.touched } 
                                      isInvalid={ !!registerForm.password.error && registerForm.password.touched }
                                      onBlur={handleBlur}
                                      onChange={handleChange}/>
                        <Form.Control.Feedback type="invalid">{ registerForm.password.error }</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="red" type="button" onClick={handleSubmit}>Sign up</Button>
            </Form>
           
}

export default RegisterComponent;