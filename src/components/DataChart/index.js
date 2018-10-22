/**
 *
 * DataChart
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import {
  getDataByDate,
  compleDataByDate,
  grabData,
  prop,
  addAll
} from 'utils/format';
import { map, cloneDeep, isEmpty, flowRight as compose } from 'lodash';
import drawChartLine from 'utils/drawChartLine';
import styles from './styles.css';

export default class DataChart extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    dateType: PropTypes.string,
    onChangeDateType: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.onChangeDateType = this.onChangeDateType.bind(this);
    this.getData = this.getData().bind(this);
  }

  componentDidUpdate() {
    const { data, dateType } = this.props;
    if (data) {
      const chartData = this.getData(data, dateType);
      drawChartLine(document.getElementById('chartLine'), {
        data: chartData.data,
        xText: chartData.xText
      });
    }
  }

  onChangeDateType() {
    const { onChangeDateType, dateType } = this.props;
    const type = dateType === 'week' ? 'month' : 'week';
    this.setState({ dateType: type });
    onChangeDateType(type);
  }

  getData() {
    const cache = {};

    return (data, dateType) => {
      const cloneData = cloneDeep(data);
      const interactData = compleDataByDate(
        cloneData,
        getDataByDate(dateType === 'month' ? 31 : 7)
      );
      const key = map(interactData, prop('date')).join('');
      if (!cache[key]) {
        const sliceDay = str => str.slice(8, 10);
        const chartData = map(interactData, prop('interaction_count'));
        const dateDate = map(
          interactData,
          compose(
            sliceDay,
            prop('date')
          )
        );
        const totalData = addAll(chartData);
        const xText = grabData(dateDate, 7);

        cache[key] = {
          data: chartData,
          total: totalData,
          xText
        };
      }

      return cache[key];
    };
  }

  render() {
    const { data, dateType } = this.props;
    const btnStyle = `${dateType}Circle`;
    let total = 0;
    if (!isEmpty(data)) {
      total = this.getData(data, dateType).total;
    }

    return (
      <div className={styles.dataChart}>
        <section className={styles.chartHead}>
          <span className={styles.chartBtn}>
            <section className={styles.buttonItems}>
              <span>
                <FormattedMessage {...messages.month} />
              </span>
              <span>
                <FormattedMessage {...messages.week} />
              </span>
            </section>
            <button
              className={styles[btnStyle]}
              onClick={this.onChangeDateType}
            />
          </span>
          <span className={styles.totalNum}>
            <FormattedMessage {...messages.interactNum} /> : {total}
          </span>
        </section>
        <section className={styles.chartContent}>
          <canvas id="chartLine" />
        </section>
      </div>
    );
  }
}
