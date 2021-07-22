import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import { useState } from 'react';
import { Dispatch } from 'redux';
import { NotificationMessage } from '../../models/notification.model';
import * as NotificationActions from "../../store/actions/notification.action";
import * as BasketActions from "../../store/actions/basket.action";
import { connect, ConnectedProps } from 'react-redux';
import { BasketProduct } from '../../models/basket.model';

const AuthComponent: React.FC<Props> = ( props: Props ): JSX.Element => {
    const [isLogin, setIsLogin] = useState(false);

    const handleClick = ( value: boolean ): void => ( isLogin !== value ) ? setIsLogin(!isLogin) : undefined;

    return <Container>
                <button onClick={() => props.addBasketItem({ id: "3", name: "product", price: 10 })}>Add basket item</button>
                <button onClick={() => props.increaseBasketItem("1")}>Increase basket item</button>
                <button onClick={() => props.decreaseBasketItem("1")}>Decrease basket item</button>
                <button onClick={() => props.removeBasketItem("2")}>Remove basket item</button>

                <Container>
                    <h1>{ !isLogin ? 'Create a new account' : 'Please log into your account' }</h1>
                    <p>and never stop collecting points for your purchases.</p>
                </Container>
                
                <Container>
                    <Button onClick={() => handleClick(true)}>Login</Button>
                    <Button onClick={() => handleClick(false)}>Register</Button>
                </Container>

                { !isLogin ? <RegisterComponent onSendNotification={props.sendNotification} /> : 
                             <LoginComponent onSendNotification={props.sendNotification} /> }
           </Container>
}

const mapDispatchToProps = ( dispatch: Dispatch ) => {
    return {
      sendNotification: (notification: NotificationMessage) => dispatch(NotificationActions.displayMessage(notification)),
      addBasketItem: (item: BasketProduct) => dispatch(BasketActions.AddItem(item)),
      increaseBasketItem: (basketID: string) => dispatch(BasketActions.IncreaseItem(basketID)),
      decreaseBasketItem: (basketID: string) => dispatch(BasketActions.DecreaseItem(basketID)),
      removeBasketItem: (basketID: string) => dispatch(BasketActions.RemoveItem(basketID))
    }
}
  
const connector = connect(null, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(AuthComponent);