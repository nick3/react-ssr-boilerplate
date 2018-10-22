/**
 *
 * CountDown
 *
 */

import React, { PropTypes } from 'react';
import styles from './styles.css';

function convertCountDown(countDown) {
  if (parseInt(countDown, 10) <= 0) {
    return '00:00';
  }
  let minute = parseInt(countDown / 60, 10);
  let second = countDown % 60;
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;
  return `${minute}:${second}`;
}

class CountDown extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    countDown: PropTypes.number,
    title: PropTypes.string,
    timeOutTitle: PropTypes.string,
    start: PropTypes.bool,
    handleOnClick: PropTypes.func,
    handleOnTimeOut: PropTypes.func,
    style: PropTypes.object
  };

  static defaultProps = {
    countDown: 0,
    title: '',
    timeOutTitle: '',
    start: true,
    handleOnClick: () => {},
    handleOnTimeOut: () => {},
    style: {}
  };

  constructor(props) {
    super(props);

    this.timer = -1;

    this.state = {
      countDown: this.props.countDown
    };
  }

  componentWillMount() {
    /* countDown非0且start标识位为true，则代表开启倒计时 */
    if (this.props.countDown && this.props.start) {
      this.handleOnTimeOut();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.countDown) {
      if (nextProps.countDown !== this.props.countDown) {
        this.setState({ countDown: nextProps.countDown });
      }
      if (!this.props.start && nextProps.start) {
        this.handleOnTimeOut();
      } else if (this.props.start && !nextProps.start) {
        window.clearInterval(this.timer);
      }
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  handleOnTimeOut = () => {
    this.timer = window.setInterval(() => {
      if (!this.state.countDown) {
        window.clearInterval(this.timer);
        this.props.handleOnTimeOut();
      } else {
        const countDown =
          this.state.countDown < 1 ? 0 : this.state.countDown - 1;
        this.setState({ countDown });
      }
    }, 1000);
  };

  render() {
    const countDown = this.props.countDown
      ? convertCountDown(this.state.countDown)
      : '--:--';
    const { handleOnClick, start, title, timeOutTitle, style } = this.props;

    return (
      <div className={styles.container} style={style}>
        <button onClick={handleOnClick}>
          <div
            style={{
              position: 'absolute',
              top: '9px',
              left: '0',
              width: '100%',
              height: '16px',
              fontSize: '16px',
              lineHeight: '1',
              color: `${start ? '#4DB553' : '#666'}`
            }}
          >
            {countDown}
          </div>
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '0',
              width: '100%',
              height: '10px',
              fontSize: '10px',
              lineHeight: '1',
              color: `${countDown === '00:00' ? 'red' : '#666'}`
            }}
          >
            {countDown === '00:00' && timeOutTitle ? timeOutTitle : title}
          </div>
        </button>
      </div>
    );
  }
}

export default CountDown;
