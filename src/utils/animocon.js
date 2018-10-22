import mojs from 'mo-js';
import { merge } from 'lodash';

class Animocon {
  constructor(el, options) {
    this.el = el;
    this.options = merge({}, this.options);
    merge(this.options, options);
    this.checked = options.checked;
    this.timeline = new mojs.Timeline();

    this.options.tweens.forEach(tween => this.timeline.add(tween));
  }

  setChecked(checked) {
    if (!this.checked) {
      this.timeline.replay();
    }
    this.checked = !!checked;
  }
}

Animocon.prototype.options = {
  tweens: [new mojs.Burst({})]
};

function makeAnimocon(el, options) {
  return new Animocon(el, options);
}

export default makeAnimocon;
