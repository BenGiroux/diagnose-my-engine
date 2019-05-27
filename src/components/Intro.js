import React from 'react';
import styles from './css/Intro.css';
import logo from '../socket-logo.png';

class Intro extends React.Component {
    
    componentDidMount() {
        this.props.introShown();

        setTimeout(() => {
            let questionId;

            if(this.props.location && this.props.location.state)
                questionId = this.props.location.state.selectedQuestion;
            else if (this.props.firstQuestion)
                questionId = this.props.firstQuestion;

            if(questionId)
                this.props.history.push(`/question/${questionId}`);

        }, 2000)
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src={logo} alt="Socket Logo" />
                </div>
            </div>
        )
    }
}

export default Intro;