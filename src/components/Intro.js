import React, { useEffect } from 'react';
import styles from './css/Intro.css';
import logo from '../socket-logo.png';

const Intro = (props) => {
    useEffect(() => {
        setTimeout(() => {
            props.history.push('/question/1')
        }, 2000)
    });

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="Socket Logo" />
            </div>
        </div>
    )
}

export default Intro;