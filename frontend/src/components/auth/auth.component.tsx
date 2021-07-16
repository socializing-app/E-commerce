import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import { useState } from 'react';

const AuthComponent: React.FC<{}> = (): JSX.Element => {
    const [isLogin, setIsLogin] = useState(false);

    const handleClick = ( value: boolean ): void => ( isLogin !== value ) ? setIsLogin(!isLogin) : undefined;

    return <Container>
                <Container>
                    <h1>{ !isLogin ? 'Create a new account' : 'Please log into your account' }</h1>
                    <p>and never stop collecting points for your purchases.</p>
                </Container>
                
                <Container>
                    <Button onClick={() => handleClick(true)}>Login</Button>
                    <Button onClick={() => handleClick(false)}>Register</Button>
                </Container>

                { !isLogin ? <RegisterComponent /> : <LoginComponent /> }
           </Container>
}

export default AuthComponent;