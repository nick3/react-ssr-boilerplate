// eslint-disable-file

import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './index.css';

class Geetest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ins: null,
      script: null
    };
    this.init = this.init.bind(this);
    this.ready = this.ready.bind(this);
    this.load = this.load.bind(this);
    this.destroy = this.destroy.bind(this);
  }
  // componentWillMount() {
  // const that = this;
  // console.log('componentWillMount', that.props, that.state);
  // }
  componentDidMount() {
    const that = this;
    // console.log('componentDidMount', that.props, that.state);
    that.init();
  }
  // componentWillReceiveProps(nextProps) {
  // const that = this;
  // console.log('componentWillReceiveProps', that.props, nextProps);
  // }
  shouldComponentUpdate(nextProps) {
    const that = this;
    // console.log('shouldComponentUpdate', that.props, nextProps, that.state, nextState);
    return nextProps.challenge !== that.props.challenge;
  }
  // componentWillUpdate(nextProps, nextState) {
  // const that = this;
  // console.log('componentWillUpdate', that.props, nextProps, that.state, nextState);
  // }
  componentDidUpdate() {
    const that = this;
    // console.log('componentDidUpdate', prevProps, that.props, prevState, that.state);
    that.init();
  }
  componentWillUnmount() {
    const that = this;
    // console.log('componentWillUnmount', that.props, that.state);
    that.destroy();
  }

  reset() {
    const { ins } = this.state;
    if (ins) {
      ins.reset();
    }
  }

  init() {
    const that = this;
    // console.log('_init');

    if (window.initGeetest) {
      return that.ready();
    }

    const ds = document.createElement('script');
    ds.type = 'text/javascript';
    ds.async = true;
    ds.charset = 'utf-8';
    if (ds.readyState) {
      ds.onreadystatechange = () => {
        if (ds.readyState === 'loaded' || ds.readyState === 'complete') {
          ds.onreadystatechange = null;
          that.ready();
        }
      };
    } else {
      ds.onload = () => {
        ds.onload = null;
        that.ready();
      };
    }
    ds.src = `${
      document.location.protocol
    }//static.geetest.com/static/tools/gt.js?_t=${new Date().getTime()}`;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ds, s);

    that.setState({
      script: ds
    });

    return null;
  }

  ready() {
    const that = this;
    // console.log('_ready');
    const {
      gt,
      challenge,
      https,
      product,
      lang,
      sandbox,
      width,
      success,
      new_captcha
    } = that.props;
    const { ins } = that.state;

    if (!window.initGeetest) {
      return null;
    }

    if (ins) {
      return that.load(ins);
    }

    return window.initGeetest(
      {
        gt,
        challenge,
        https,
        product,
        lang,
        sandbox,
        width,
        offline: !success,
        new_captcha
      },
      geetest => {
        that.load(geetest);

        that.setState({
          ins: geetest
        });
      }
    );
  }

  load(ins) {
    const that = this;
    // console.log('_load');
    const { onReady, onSuccess, onError } = that.props;

    ins.appendTo(findDOMNode(that));
    ins.onReady(onReady);
    ins.onSuccess(() => onSuccess(ins.getValidate()));
    ins.onError(onError);
  }

  destroy() {
    const that = this;
    // that.state.script.parentNode.removeChild(that.state.script);
    that.setState({
      ins: null,
      script: null
    });
  }

  render() {
    const that = this;
    // console.log('render');
    const { challenge } = that.props;

    return <div className={`i-geetest ${styles.geetest}`} key={challenge} />;
  }
}

Geetest.propTypes = {
  gt: PropTypes.string.isRequired,
  challenge: PropTypes.string.isRequired,
  success: PropTypes.number.isRequired,
  https: PropTypes.bool,
  product: PropTypes.string,
  lang: PropTypes.string,
  sandbox: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onReady: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  new_captcha: PropTypes.bool
};

Geetest.defaultProps = {
  https: false,
  product: 'float',
  lang: 'zh-cn',
  sandbox: false,
  onReady: () => {},
  onSuccess: () => {},
  onError: () => {}
};

export default Geetest;
