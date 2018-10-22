/**
 *
 * InteractCoverCard
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import CircleImg from '../CircleImg';
import DefaultImage from '../DefaultImage';
import UserItem from '../UserItem';
import { Dialog } from 'react-weui';
import messages from './messages';
import moment from 'moment';

import styles from './styles.css';
import defaultCover from 'images/default_class.png';

const uppercaseFirst = str => `${str[0].toUpperCase()}${str.slice(1)}`;
const getNull = () => null;

export class InteractCoverCard extends React.Component {
  static propTypes = {
    coverData: PropTypes.object,
    itemData: PropTypes.object,
    infoType: PropTypes.string,
    openid: PropTypes.string,
    total: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      isShowTip: false
    };

    this.toggleShowTip = () => {
      const { isShowTip } = this.state;
      this.setState({ isShowTip: !isShowTip });
    };

    this.getDialog = () => (
      <Dialog
        type="android"
        title={<FormattedMessage {...messages.dialogTitle} />}
        buttons={[
          {
            label: <FormattedMessage {...messages.dialogSure} />,
            onClick: this.toggleShowTip
          }
        ]}
        show={this.state.isShowTip}
      >
        <FormattedHTMLMessage {...messages.dialogContent} />
      </Dialog>
    );

    this.getCoverContent = type =>
      this[`get${uppercaseFirst(type)}Content`] || getNull;
    this.getCoverFooter = type =>
      this[`get${uppercaseFirst(type)}Footer`] || getNull;
  }

  getRankContent() {
    const { coverData = {}, total } = this.props;
    const date = moment().format('YYYY年MM月DD日');
    return (
      <div>
        <div className={styles.coverInfo}>
          <CircleImg size={38} src={coverData.avatar} />
          <span className={styles.coverTitle}>
            {coverData.name}
            <FormattedMessage {...messages.title} />
          </span>
        </div>
        <section className={styles.coverTip}>
          <span
            className={styles.font18}
            style={{ textAlign: 'left', lineHeight: '20px' }}
          >
            {coverData.college}
            （共
            {total}
            位教师）
          </span>
          <span className={styles.font12} style={{ width: 90, flex: 'none' }}>
            {date}
          </span>
        </section>
      </div>
    );
  }

  getShareContent() {
    const { itemData = {} } = this.props;
    return (
      <div className={styles.coverInfo}>
        <div>
          <CircleImg
            size={100}
            className={styles.avatarWrap}
            src={itemData.avatar}
          />
        </div>
        <span className={styles.coverName}>{itemData.name}</span>
        <span className={styles.coverSchool}>{itemData.college}</span>
      </div>
    );
  }

  getRankFooter() {
    const { itemData = {}, openid } = this.props;
    return <UserItem data={itemData} isMine={1} openid={openid} />;
  }

  getHomeFooter() {
    const { itemData = {} } = this.props;
    return (
      <section className={styles.userAvatar}>
        <CircleImg size={97} src={itemData.avatar} />
      </section>
    );
  }

  render() {
    const { coverData = {}, infoType } = this.props;
    const { isShowTip } = this.state;
    const tipDialog = isShowTip ? this.getDialog() : null;
    const coverContent = this.getCoverContent(infoType).apply(this);
    const coverFooter = this.getCoverFooter(infoType).apply(this);

    return (
      <div className={styles.interactCoverCard}>
        <section className={styles.coverHead}>
          {coverContent}
          <button className={styles.iconInfo} onClick={this.toggleShowTip} />
          {tipDialog}
          <DefaultImage
            src={coverData.cover}
            className={styles.coverBg}
            defaultImg={defaultCover}
          />
        </section>
        {coverFooter}
      </div>
    );
  }
}

export default InteractCoverCard;
