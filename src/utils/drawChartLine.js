/**
 *
 * drawChartLine.js 绘制折线图
 *
 */
import config from 'config';

function drawChartLine(canvas, options) {
  const cv = new Canvas(canvas, options);

  cv.clearAll();
  cv.drawXAxis();
  cv.drawYLines();
  cv.drawPolyLine();
  cv.drawDataPoint();
  cv.fillContent();
  cv.writeXText();
  cv.writeYText();
}

// 定义canvas类
class Canvas {
  constructor(canvas, options) {
    const { deviceRatio, interactCanvas } = config;
    const windowWidth = document.documentElement.getBoundingClientRect().width;
    const rootSize = windowWidth / deviceRatio;
    const originPadding = 0.18 * 2 * rootSize;
    const originHeight = 1.6 * rootSize;
    const originWidth = windowWidth - originPadding;

    const {
      width = originWidth,
      height = originHeight,
      strokeColor = interactCanvas.strokeColor,
      axisColor = interactCanvas.axisColor,
      fillColor = interactCanvas.fillColor,
      yLines = 4,
      heightRatio = 1.4,
      data = [],
      xText = []
    } = options;

    this.cv = canvas;
    this.cv.width = width;
    this.cv.height = height;
    this.ctx = this.cv.getContext('2d');

    this.data = data;
    this.maxData = Math.max(...data);
    this.maxDataHeight = heightRatio * this.maxData;
    this.xText = xText;

    this.yLines = yLines;
    this.padding = options.padding || {
      top: 0,
      right: 35,
      bottom: 20,
      left: 4
    };
    this.startPoint = [this.padding.left, height - this.padding.bottom];
    this.endPoint = [width - this.padding.right, height - this.padding.bottom];
    this.strokeColor = strokeColor;
    this.axisColor = axisColor;
    this.fillColor = fillColor;

    this.chartWidth = width - this.padding.right - this.padding.left;
    this.chartHeight = height - this.padding.top - this.padding.bottom;
    this.xSpace = this.getSpace(data.length, this.chartWidth);
    this.ySpace = this.getSpace(yLines, this.chartHeight);
  }

  // 计算数据间距 getSpace :: (Number, Number) -> Number
  getSpace(points, total) {
    return total / (points - 1);
  }

  // 计算y轴文字数据 getYText :: (Number, Number) -> [Number]
  getYText(points, maxDataHeight) {
    return this.toArray(points).map(
      item => (item / (points - 1)) * maxDataHeight
    );
  }

  // 生成数组 toArray :: Number -> [Number]
  toArray(num) {
    const ary = [];
    for (let i = 0; i < num; i += 1) {
      ary.push(i);
    }
    return ary;
  }

  // 清空canvas
  clearAll() {
    this.ctx.clearRect(0, 0, this.cv.width, this.cv.height);
  }

  // 绘制x轴
  drawXAxis() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.axisColor;
    this.ctx.moveTo(...this.startPoint);
    this.ctx.lineTo(this.cv.width, this.endPoint[1]);

    this.ctx.stroke();
    this.ctx.closePath();
  }

  // 绘制折线
  drawPolyLine() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.strokeColor;

    this.data.forEach((data, i) => {
      const pointX = this.padding.left + i * this.xSpace;
      const pointY =
        this.padding.top + (1 - data / this.maxDataHeight) * this.chartHeight;
      this.ctx.lineTo(pointX, pointY);
    });

    this.ctx.stroke();
    this.ctx.closePath();
  }

  // 绘制数据点
  drawDataPoint() {
    this.data.forEach((data, i) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = this.strokeColor;
      const pointX = this.padding.left + i * this.xSpace;
      const pointY =
        this.padding.top + (1 - data / this.maxDataHeight) * this.chartHeight;
      this.ctx.arc(pointX, pointY, 3, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    });
  }

  // 填充背景色
  fillBackground() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fillColor;
    this.ctx.moveTo(...this.startPoint);

    this.data.forEach((data, i) => {
      const pointX = this.padding.left + i * this.xSpace;
      const pointY =
        this.padding.top + (1 - data / this.maxDataHeight) * this.chartHeight;
      this.ctx.lineTo(pointX, pointY);
    });
    this.ctx.lineTo(...this.endPoint);

    this.ctx.fill();
    this.ctx.closePath();
  }

  // 填充背景色
  fillContent() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.fillColor;
    this.ctx.moveTo(...this.startPoint);

    this.data.forEach((data, i) => {
      const pointX = this.padding.left + i * this.xSpace;
      const pointY =
        this.padding.top + (1 - data / this.maxDataHeight) * this.chartHeight;
      this.ctx.lineTo(pointX, pointY);
    });
    this.ctx.lineTo(...this.endPoint);

    this.ctx.fill();
    this.ctx.closePath();
  }

  // 绘制横轴
  drawYLines() {
    const yLines = this.getYText(this.yLines, this.maxDataHeight);

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.axisColor;

    yLines.forEach((_, i) => {
      this.ctx.moveTo(this.startPoint[0], this.startPoint[1] - i * this.ySpace);
      this.ctx.lineTo(this.endPoint[0], this.endPoint[1] - i * this.ySpace);
    });

    this.ctx.stroke();
    this.ctx.closePath();
  }

  // x轴文字
  writeXText() {
    const textSapce = this.getSpace(this.xText.length, this.chartWidth);
    const pointY = this.chartHeight + 15;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.strokeColor;

    this.xText.forEach((text, i) => {
      const pointX = this.padding.left + i * textSapce;
      this.ctx.fillText(text, pointX, pointY);
    });
    this.ctx.closePath();
  }

  // y轴文字
  writeYText() {
    const yLines = this.getYText(this.yLines, this.maxDataHeight);
    const pointX = this.chartWidth + 8;
    this.ctx.beginPath();
    this.ctx.fillStyle = this.strokeColor;

    yLines.forEach((text, i) => {
      if (i !== 0 && i !== yLines.length - 1) {
        const pointY = this.endPoint[1] - i * this.ySpace;
        this.ctx.fillText(parseInt(text, 10), pointX, pointY);
      }
    });
    this.ctx.closePath();
  }
}

export default drawChartLine;
