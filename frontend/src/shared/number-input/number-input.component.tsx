import styles from "./number-input.component.module.scss";
import { useEffect, useState } from 'react';

const NumberInputComponent = ( props: any ) => {
    const minOrderQty: number = props.min;
    const maxOrderQty: number = props.max;
    const currentQuantity: number = props.currentQuantity;
    
    const [ num, setNum ] = useState(currentQuantity);

    useEffect(() => { setNum(currentQuantity) }, [currentQuantity]);
    useEffect(() => { props.onNumberChange(num) }, [num]);

    const handleReduce = () => {
        if ( num > minOrderQty ) setNum(num - 1);
    }

    const handleIncrease = () => {
        if ( num < maxOrderQty ) setNum(num + 1);
    }

    return <div className={styles.container}>
                <button onClick={handleReduce} className={`${styles.button} ${styles.button__left}`}></button>

                <input type="number" placeholder="0" value={num} className={styles.input} onChange={() => {}} />

                <button onClick={handleIncrease} className={`${styles.button} ${styles.button__right}`}></button>
           </div>
}

export default NumberInputComponent;