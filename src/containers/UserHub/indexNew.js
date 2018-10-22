import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../reducers/sessionReducer';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import DocumentTitle from '../../components/DocumentTitle';
import IdentifyCard from '../../components/IdentifyCard';
import HubNavigation from '../../components/HubNavigation';
import configData from './data';
import { openIdSelector } from '../../utils/generalSelector';
import styles from './styles.css';
import sagaInjectors from '../../utils/sagaInjectors';
import reducerInjectors from '../../utils/reducerInjectors';
import { loadUserinfo } from './actions';

const withReducer = injectReducer({ key: 'userHub', reducer });
const withSaga = injectSaga({ key: 'userHub', saga });
class UserHub extends React.PureComponent {
  static propTypes = {
    actions: PropTypes.object,
    currentUser: PropTypes.object,
    openId: PropTypes.string
  };

  static fetchData(store) {
    const { injectSaga: iS } = sagaInjectors(store);
    const { injectReducer: iR } = reducerInjectors(store);
    iR('userHub', reducer);
    iS('userHub', { saga });
    // Normally you'd pass action creators to "connect" from react-redux,
    // but since this is a static method you don't have access to "this.props".

    // Dispatching actions from "static fetchData()" will look like this (make sure to return a Promise):
    const pro = store.dispatch(loadUserinfo());
    return pro;
  }

  // constructor(props) {
  //   super(props);
  //   props.actions.loadUserinfo();
  // }

  render() {
    const { currentUser = {}, openId } = this.props;
    const { avatar, name } = currentUser;
    let version = 'v1';
    this.navType = 'student';

    return (
      <div className={styles.styles}>
        <DocumentTitle title={messages.title} />
        <div className={styles.userHubWrap}>
          <IdentifyCard avatar={avatar} name={name} />
          <HubNavigation
            type={this.navType}
            openid={openId}
            navData={configData}
            version={version}
            query={{}}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  openId: openIdSelector
});

function mapDispatchToProps(dispatch) {
  const actions = {
    loadUserinfo
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(UserHub);
