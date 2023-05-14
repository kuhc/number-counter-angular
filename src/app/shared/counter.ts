export interface CounterOptions {
  startVal?: number; // number to start at
  duration?: number; // animation duration in seconds
  easingFn?: (t: number, b: number, c: number, d: number) => number;
}

export class Counter {
  private defaults: CounterOptions = {
    startVal: 0,
    duration: 2,
  };
  private rAF: any;
  private startTime: number;
  private countDown = false;
  private remaining;
  el: HTMLElement | HTMLInputElement;
  formattingFn: (num: number) => string;
  easingFn?: (t: number, b: number, c: number, d: number) => number;
  error = '';
  startVal = 0;
  duration: number;
  frameVal: number;
  public displayVal: number;

  constructor(private endVal: number, public options?: CounterOptions) {
    console.log('constructing counter...');
    this.options = {
      ...this.defaults,
      ...options,
    };
    this.easingFn = this.easeOutExpo;
    this.startVal = this.options.startVal;
    this.frameVal = this.startVal;
    this.endVal = endVal;
    this.resetDuration();
    // this.el =
    //   typeof target === 'string' ? document.getElementById(target) : target;
    this.printValue(this.startVal);
  }

  // start animation
  start(): void {
    console.log('counter starting...');
    console.log(this.error);

    if (this.error) {
      return;
    }
    //console.log(this.duration);
    if (this.duration > 0) {
      this.rAF = requestAnimationFrame(this.count);
    } else {
      this.printValue(this.endVal);
    }
  }

  // pass a new endVal and start animation
  update(newEndVal: string | number): void {
    cancelAnimationFrame(this.rAF);
    this.startTime = null;
    this.endVal = newEndVal as number;
    if (this.endVal === this.frameVal) {
      return;
    }
    this.startVal = this.frameVal;
    this.rAF = requestAnimationFrame(this.count);
  }

  count = (timestamp: number): void => {
    //console.log('counting...');
    if (!this.startTime) {
      this.startTime = timestamp;
    }

    const progress = timestamp - this.startTime;
    this.remaining = this.duration - progress;
    this.countDown = this.endVal - this.startVal < 0;

    if (this.countDown) {
      this.frameVal =
        this.startVal -
        this.easingFn(progress, 0, this.startVal - this.endVal, this.duration);
    } else {
      this.frameVal = this.easingFn(
        progress,
        this.startVal,
        this.endVal - this.startVal,
        this.duration
      );
    }

    // don't go past endVal since progress can exceed duration in the last frame
    const wentPast = this.countDown
      ? this.frameVal < this.endVal
      : this.frameVal > this.endVal;
    this.frameVal = wentPast ? this.endVal : this.frameVal;

    // decimal
    this.frameVal = Number(this.frameVal.toFixed(0));

    // format and print value
    this.printValue(this.frameVal);

    // whether to continue
    if (progress < this.duration) {
      this.rAF = requestAnimationFrame(this.count);
    }
  };

  printValue(val: number): void {
    //console.log('printing value...');
    console.log(val);
    this.displayVal = val;
  }

  private resetDuration(): void {
    this.startTime = null;
    this.duration = Number(this.options.duration) * 1000;
    this.remaining = this.duration;
  }

  // t: current time, b: beginning value, c: change in value, d: duration
  easeOutExpo = (t: number, b: number, c: number, d: number): number =>
    (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
}
