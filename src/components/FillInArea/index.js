/**
 *
 * FillInArea
 *
 */

import React, { PropTypes } from 'react';

import AvatarImg from '../AvatarImg';
import { FormattedMessage } from 'react-intl';
import { isPlainObject } from 'lodash';
import FillText from '../FillText';
import FillDate from '../FillDate';
import FillTextarea from '../FillTextarea';
import FillOption from '../FillOption';
import FillSeletor from '../FillSeletor';
import FillImage from '../FillImage';
import AgreeTerm from '../AgreeTerm';
import CollegeSelector from 'containers/CollegeSelector';
import DepartmentSelector from 'containers/DepartmentSelector';
import LocationSelector from 'containers/LocationSelector';
import { Button } from 'react-weui';
import LinkCell from '../LinkCell';
import messages from './messages';
import styles from './styles.css';
import btnMessage from 'containers/StudentEditInfo/messages';
import { setupClipField } from 'utils/imageCrop';

const noneBtnPage = ['location'];

class FillInArea extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    router: PropTypes.object,
    location: PropTypes.object,
    updateValue: PropTypes.func,
    userInfo: PropTypes.object,
    isAgreeTerm: PropTypes.bool
  };

  constructor(props) {
    super(props);
    const { router } = props;

    this.goBack = () => router.go(-1);
    this.getLinkCell = userInfo => (type, i) => {
      const link = `${location.pathname}${location.search}#${type}`;
      const value = isPlainObject(userInfo[type])
        ? userInfo[type].value
        : userInfo[type];
      let cell = (
        <LinkCell
          header={<FormattedMessage {...messages[type]} />}
          body={
            value || (
              <span style={{ color: '#b2b2b2' }}>
                <FormattedMessage {...messages[`${type}PLH`]} />
              </span>
            )
          }
          link={link}
          key={i}
        />
      );
      if (type === 'avatar') {
        cell = (
          <LinkCell
            header={<FormattedMessage {...messages.avatar} />}
            footer={<AvatarImg src={userInfo.avatar} size={48} />}
            link={link}
            key={i}
          />
        );
      }
      return cell;
    };
    this.handleSave = type => () => {
      const { userInfo } = this.props;
      const { values } = userInfo;
      const item = values[type];
      const value = isPlainObject(item) ? item.value : item;
      if (!value && isPlainObject(item)) {
        const key = Object.keys(item.options)[0];
        this.props.updateValue(type, {
          id: key,
          value: item.options[key]
        });
      }
      this.goBack();
    };
    this.onChange = type => e => {
      const value = e.target ? e.target.value : e;
      this.props.updateValue(type, value);
    };
    this.setTextProps = (msg, dataType, value, type = 'text') => (
      <FillText
        type={type}
        value={value || ''}
        key={dataType}
        placeholder={msg}
        onChange={this.onChange(dataType)}
      />
    );
    this.setTextAreaProps = (msg, dataType, value) => (
      <FillTextarea
        value={value || ''}
        key={dataType}
        placeholder={msg}
        onChange={this.onChange(dataType)}
      />
    );
    this.setDateProps = (msg, dataType, value) => (
      <FillDate
        value={value || ''}
        key={dataType}
        type={dataType}
        placeholder={msg}
        onChange={this.onChange(dataType)}
      />
    );
    this.setOptionProps = (para, dataType, value) => (
      <FillOption
        value={value || ''}
        key={dataType}
        type={dataType}
        onChange={this.onChange(dataType)}
      />
    );
    this.setSeletProps = (para, dataType, value) => (
      <FillSeletor
        value={value || ''}
        key={dataType}
        type={dataType}
        onChange={this.onChange(dataType)}
      />
    );
    this.setImageProps = (para, dataType, value) => (
      <FillImage
        value={value || ''}
        key={dataType}
        btnWidth="80%"
        onChange={this.updateAvatar}
      />
    );
    this.setCollegeSelector = collegeId => () => (
      <CollegeSelector
        onChange={this.onChange('college')}
        key="college"
        value={collegeId}
      />
    );
    this.setDepartmentSelector = (collegeId, departmentId) => () => (
      <DepartmentSelector
        key="department"
        onChange={this.onChange('department')}
        value={departmentId}
        collegeId={collegeId}
      />
    );
    this.setLocationProps = (para, dataType, value) => (
      <LocationSelector
        value={value || ''}
        key={dataType}
        onChange={this.onChange(dataType)}
        goBack={this.goBack}
      />
    );

    this.getParams = userInfo => type => [
      messages[`${type}PLH`],
      type,
      userInfo[type]
    ];
    this.updateAvatar = e => {
      this.pc = setupClipField('photoClip');
      this.showClipField();
      this.pc.load(e.target.files[0]);
    };
  }

  getFillPage(hash, userInfo = {}, types) {
    const state = hash.slice(1);
    const getParams = this.getParams(userInfo);
    const { college = {}, department = {} } = userInfo;
    const pageOptions = {
      archive: this.setArchiveProps,
      avatar: this.setImageProps,
      birthday: this.setDateProps,
      class: this.setTextProps,
      college: this.setCollegeSelector(college.id),
      degree: this.setSeletProps,
      department: this.setDepartmentSelector(college.id, department.id),
      email: this.setTextProps,
      gender: this.setOptionProps,
      introduction: this.setTextAreaProps,
      location: this.setLocationProps,
      name: this.setTextProps,
      nickname: this.setTextProps,
      number: this.setTextProps,
      phone: this.setTextProps,
      profession: this.setSeletProps,
      QQ: this.setTextProps,
      sequenceNumber: this.setTextProps
    };
    const pageGenerator = pageOptions[state];
    return pageGenerator && types.includes(state)
      ? pageGenerator(...getParams(state))
      : null;
  }

  showClipField = () => {
    this.photoClipStyle = this.photoClip.style;
    this.photoClipStyle.zIndex = 20;
    this.photoClipStyle.display = 'block';
  };

  clipOnSave = () => {
    const img = this.pc.clip();
    this.props.updateValue('avatar', img);
    this.clipOnCancel();
  };

  clipOnCancel = () => {
    this.pc.destroy();
    this.photoClipStyle.zIndex = 0;
    this.photoClipStyle.display = 'none';
  };

  render() {
    const {
      location: { hash },
      userInfo: { keys = [], values = {} },
      isAgreeTerm = true
    } = this.props;
    const state = hash.slice(1);
    const FillPage = this.getFillPage(hash, values, keys);
    const fillPageClassname =
      hash && keys.includes(state) ? 'fillPageWrapLeft' : 'fillPageWrap';

    return (
      <div className={styles.fillInArea}>
        <div
          className={styles.photoClip}
          id="photoClip"
          ref={div => {
            this.photoClip = div;
          }}
        >
          <div className={styles.btnBox}>
            <button onClick={this.clipOnCancel}>
              <FormattedMessage {...btnMessage.cancel} />
            </button>
            <button onClick={this.clipOnSave}>
              <FormattedMessage {...messages.save} />
            </button>
          </div>
        </div>
        <div className={styles.items}>
          {keys.map(this.getLinkCell(values))}
          <div className={styles[fillPageClassname]}>
            {FillPage}
            {noneBtnPage.includes(state) ? null : (
              <div className={styles.saveBtnWrap}>
                <Button onClick={this.handleSave(state)}>
                  <FormattedMessage {...messages.save} />
                </Button>
              </div>
            )}
          </div>
        </div>
        {!isAgreeTerm ? (
          <AgreeTerm
            onChange={this.onChange('isAgreement')}
            onClick={this.onTermShow}
          />
        ) : null}
      </div>
    );
  }
}

export default FillInArea;
