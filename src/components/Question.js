import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/Question.css';

const Question = (props) => {
  return (
    <div className={styles.question}>
      <h1 className={styles.heading}>{props.page.title}</h1>
      <p className={styles.p}>{props.page.question}</p>
    </div>
  );
}

Question.propTypes = {
  page: PropTypes.object.isRequired
};

export default Question;