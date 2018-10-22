/**
 *
 * UserHub
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators, compose } from 'redux';
import { push } from 'react-router-redux';
import DocumentTitle from '../../components/DocumentTitle';
import IdentifyCard from '../../components/IdentifyCard';
import IdentifySwitchBar from '../../components/IdentifySwitchBar';
import HubNavigation from '../../components/HubNavigation';
import { Toast, Button } from 'react-weui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { setOrgId, getOrgId } from '../../utils/constants';
import { redirectUrl } from '../../utils/redirect';
import { loadUserinfo } from './actions';
// import { enterName } from '../TeacherEditInfo/actions';
import config from '../../config';
import configData from './data';
import selectors from './selectors';
import styles from './styles.css';

/* eslint-disable react/prefer-stateless-function */
class UserHub extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    location: PropTypes.object,
    router: PropTypes.object,
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      type: null
    };

    this.switchIdentify = type => {
      const { isTeacher, teacher, isVerfiedTeacher } = this.props.userinfo;
      const { router, actions } = this.props;
      if (getOrgId() && !isVerfiedTeacher) {
        actions.push('/organization/proof');
      } else if (!isTeacher && type === 'teacher') {
        actions.push('/teacher/auth?module=hub');
      } else if (isTeacher && !teacher.name && type === 'teacher') {
        actions.enterName();
        redirectUrl('/teacher/edit', router);
      } else {
        this.setState({ type });
      }
    };

    this.isShowRegisterBtn = (isRegister, isTeacher, pageType) =>
      pageType === 'teacher'
        ? this.isTeacherPageShowBtn(isRegister, isTeacher)
        : !isRegister;

    this.isTeacherPageShowBtn = (isRegister, isTeacher) =>
      !isRegister || !isTeacher;

    this.onSignBtnClick = () => {
      const { router } = this.props;
      redirectUrl('teacher/signup', router);
    };
  }

  componentWillMount() {
    const { location } = this.props;
    const { first } = location.query;
    let { orgId } = location.query;
    if (first === '1') {
      setOrgId(orgId);
    } else {
      orgId = getOrgId();
    }
    this.props.actions.loadUserinfo(orgId);
  }

  onRegisterBtnClick = () => {
    const { location } = this.props;
    const { domain } = config;
    const openid = localStorage.getItem('openId') || location.query.openid;
    if (this.navType === 'teacher') {
      // this.props.actions.push('/teacher/auth');
      window.location.href = `${domain}teacher/auth_for_hub?openid=${openid}`;
    } else if (this.navType === 'student') {
      // this.props.actions.push('/student/signup');
      window.location.href = `${domain}student/sign_up?openid=${openid}`;
    }
  };

  render() {
    const { location, userinfo = {}, loading } = this.props;
    const {
      teacher: teacherInfo,
      student: studentInfo,
      isTeacher,
      isVerfiedTeacher,
      isRegister
    } = userinfo;
    let avatar;
    // let className;
    let college;
    let department;
    let introduction;
    let name;
    // let studentNumber;
    let version = 'v1';
    const openid = localStorage.getItem('openId') || location.query.openid;
    if (this.state.type) {
      this.navType = this.state.type;
    } else if (location.query.isStudent === '1') {
      this.navType = 'student';
    } else if (getOrgId() && !isVerfiedTeacher) {
      this.navType = 'student';
    } else if (isTeacher) {
      this.navType = 'teacher';
    } else {
      this.navType = 'student';
    }
    if (this.navType === 'teacher' && teacherInfo) {
      ({ avatar } = teacherInfo);
      // className = teacherInfo.className;
      ({ college } = teacherInfo);
      ({ department } = teacherInfo);
      ({ introduction } = teacherInfo);
      ({ name } = teacherInfo);
      ({ version } = teacherInfo);
    } else if (this.navType === 'student' && studentInfo) {
      ({ avatar } = studentInfo.avatar);
      // className = studentInfo.className;
      ({ college } = studentInfo.college);
      ({ department } = studentInfo.department);
      ({ introduction } = studentInfo);
      ({ name } = studentInfo);
      // studentNumber = studentInfo.studentNumber;
    }
    const isShowRegister = this.isShowRegisterBtn(
      isRegister,
      isTeacher,
      this.state.type
    );
    let description = '';
    let subDescription = '';
    if (this.navType === 'teacher') {
      description = college && department ? `${college}·${department}` : null;
      subDescription = introduction;
    }
    return (
      <div className={styles.userHub}>
        <div className={styles.userHubWrap}>
          <DocumentTitle title={messages.title} />
          <IdentifyCard
            avatar={avatar}
            name={name}
            isRegister={isRegister}
            description={description}
            subDescription={subDescription}
            link={
              this.navType === 'teacher' || !isRegister
                ? ''
                : `${configData.link}?openid=${openid}`
            }
          />
          {isShowRegister && this.navType === 'teacher' ? (
            <div className={styles.unregisterWrapper}>
              <Button type="primary" plain onClick={this.onRegisterBtnClick}>
                <FormattedMessage {...messages.bindTeacherAccount} />
              </Button>
              <Button type="primary" plain onClick={this.onSignBtnClick}>
                <FormattedMessage {...messages.signTeacherAccount} />
              </Button>
            </div>
          ) : (
            <HubNavigation
              type={this.navType}
              openid={openid}
              navData={configData}
              version={version}
              isTeacher={isTeacher}
              query={location.query}
            />
          )}
          {/* <LangSelector className={styles.langSelector} /> */}
        </div>
        <Toast icon="loading" show={loading}>
          Loading...
        </Toast>
        {location.query.isStudent === '1' || (
          <IdentifySwitchBar
            type={this.navType}
            isTeacher
            onSwitch={this.switchIdentify}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = selectors();

function mapDispatchToProps(dispatch) {
  const actions = {
    loadUserinfo,
    // enterName,
    push
  };
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'userHub', reducer });
const withSaga = injectSaga({ key: 'userHub', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(UserHub);
