import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    navigation: {
        margin: 'auto auto 0 auto',
        padding: '1rem',
        width: '75%'
    },
    button: {
        fontSize: '2rem',
        flex: 1,
        margin: '0.5rem',
        fontWeight: 'bold',
        whiteSpace: 'nowrap'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '2rem auto 1rem',
        width: '75%'
    }
});

const Navigation = (props) => {
    const { classes } = props;

    return (
        <div className={classes.navigation}>
            <div className={classes.btnContainer}>
                {props.options != null && props.options.map((value, index) => {
                    return <Button onClick={() => props.changePage(value.pageLinkId)} key={index} variant="contained" color={value.color} className={classes.button}>{value.label}</Button>
                })}
            </div>
            {!props.landingPage &&
                <div>
                    {props.showBackBtn ? <Button variant="outlined" onClick={() => props.goBack(Number(props.match.params.id))} style={{ marginRight: '0.2rem' }}>Back</Button> : ''}
                    <Button variant="outlined" onClick={props.reset}>Reset</Button>
                </div>}
        </div>
    )
}

Navigation.propTypes = {
    landingPage: PropTypes.bool.isRequired,
    changePage: PropTypes.func.isRequired,
    showBackBtn: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
};

export default withStyles(styles)(Navigation);