import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from '../fix-it-logo.png';

const styles = () => ({
  root: {
    border: '1px solid #e7e7e7',
    padding: '1rem',
    backgroundColor: 'snow'
  },
  heading: {
    margin: 0,
    fontWeight: 'normal',
  },
  button: {
    fontSize: '2rem',
    flex: 1,
    margin: '0.5rem',
    fontWeight: 'normal'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '2rem'
  },
  p: {
    fontSize: '1.2rem',
    margin: '2rem 0 0 0'
  },
  header: {
    display: 'flex',
    marginBottom: '1rem'
  },
  logoContainer: {
    flex: '1',
    textAlign: 'right'
  },
  logo: {
    width: '4rem',
    marginRight: '0.5rem'
  },
  title: {
    flex: '1',
    margin: '0',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontWeight: 'normal',
    marginLeft: '0.5rem',
    lineHeight: '4rem'
  }
});

function Question(props) {
  const { classes } = props;

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logoContainer}>
          <img src={logo} className={classes.logo} alt='Logo' />
        </div>
        <h1 className={classes.title}>Fix It</h1>
      </header>
      <div className={classes.root}>
        <h1 className={classes.heading}>{props.page.title}</h1>
        <p className={classes.p}>{props.page.question}</p>
        <div className={classes.container}>
          {props.page.options != null && props.page.options.map((value, index) => {
            return <Button onClick={() => props.changePage(value.pageLinkId)} key={index} variant="contained" color={value.color} className={classes.button}>{value.label}</Button>
          })}
        </div>
      </div>
    </div>
  );
}

Question.propTypes = {
  changePage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired
};

export default withStyles(styles)(Question);