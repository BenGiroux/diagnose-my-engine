import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './css/Navigation.css';

const Navigation = (props) => {
    return (
        <div className={styles.navigation}>
            {props.showBackBtn ? <Button variant="outlined" onClick={() => props.goBack(Number(props.match.params.id))} style={{ marginRight: '0.2rem' }}>Back</Button> : ''}
            <Button variant="outlined" onClick={props.reset}>Reset</Button>
        </div>
    )
}

export default Navigation;