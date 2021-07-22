import styles from "./number-input.component.module.scss";
import { useEffect, useState } from 'react';

const NumberInputComponent = ( props: any ) => {
    const minOrderQty: number = props.min;
    const maxOrderQty: number = props.max;

    const [ num, setNum ] = useState(props.currentQuantity);

    const handleReduce = () => {
        if ( num > minOrderQty ) setNum(num - 1);
    }

    const handleIncrease = () => {
        if ( num < maxOrderQty ) setNum(num + 1);
    }

    useEffect(() => {
        props.onNumberChange(num);
    }, [num]);

    return <div className={styles.container}>
                <button onClick={handleReduce} className={`${styles.button} ${styles.button__left}`}></button>

                <input type="number" placeholder="0" value={num} className={styles.input} onChange={() => {}} />

                <button onClick={handleIncrease} className={`${styles.button} ${styles.button__right}`}></button>
           </div>
}

export default NumberInputComponent;