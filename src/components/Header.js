import React from 'react';
import styles from './css/Header.css';
import logo from '../socket-logo-small.png';
import {
    Link
} from 'react-router-dom';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Link to="/question/1"><img src={logo} className={styles.logo} alt='Logo' /></Link>
            </div>
        </header>
    )
}

export default Header;