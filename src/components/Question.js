import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = () => ({
  question: {
    flex: 1
  },
  heading: {
    margin: 0,
    fontWeight: 'bold',
    backgroundColor: '#51b848',
    color: '#ffffff',
    padding: '1rem 0',
    fontSize: '2rem'
  },
  button: {
    fontSize: '2rem',
    flex: 1,
    margin: '0.5rem',
    fontWeight: 'bold'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: '2rem auto 0',
    width: '75%'
  },
  p: {
    fontSize: '1.5rem',
    margin: '2rem auto 0',
    lineHeight: '2.5rem',
    width: '75%',
    fontWeight: 'lighter',
    overflow: 'auto',
    maxHeight: '12rem',
    paddingRight: '1rem'
  }
});

function Question(props) {
  const { classes } = props;

  return (
    <div className={classes.question}>
      <h1 className={classes.heading}>{props.page.title}</h1>
      <p className={classes.p}>{props.page.question}</p>
      <div className={classes.container}>
        {props.page.options != null && props.page.options.map((value, index) => {
          return <Button onClick={() => props.changePage(value.pageLinkId)} key={index} variant="contained" color={value.color} className={classes.button}>{value.label}</Button>
        })}
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