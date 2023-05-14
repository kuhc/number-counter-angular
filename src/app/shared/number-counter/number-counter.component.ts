import { Component, Input, OnInit } from '@angular/core';

export interface CounterOptions {
  startVal?: number; // number to start at
  duration?: number; // animation duration in seconds
}

@Component({
  selector: 'app-number-counter',
  templateUrl: './number-counter.component.html',
  styleUrls: ['./number-counter.component.css'],
})
export class NumberCounterComponent implements OnInit {
  @Input()
  set newVal(newVal: number) {
    if (this.endVal) {
      this.update(newVal);
      this.endVal = Number(newVal);
    } else {
      setTimeout(() => {
        this.endVal = Number(newVal);
        this.start();
      }, 0);
    }
  }

  @Input() options;

  private defaults: CounterOptions = {
    startVal: 0,
    duration: 2000,
  };
  private rAF: any;
  private startTime: number;
  private countDown = false;
  private easingFn?: (t: number, b: number, c: number, d: number) => number;
  startVal: number = 0;
  endVal: number;
  duration: number;
  frameVal: number;
  displayVal: number;

  constructor() {}

  ngOnInit() {
    this.options = {
      ...this.defaults,
      ...this.options,
    };
    this.easingFn = this.easeOutExpo;
    this.startVal = this.options.startVal;
    this.frameVal = this.startVal;
    this.duration = this.options.duration;
    this.printValue(this.startVal);
  }

  // start animation
  start(): void {
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
    if (!this.startTime) {
      this.startTime = timestamp;
    }
    const progress = timestamp - this.startTime;
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
    this.displayVal = val;
  }

  // t: current time, b: beginning value, c: change in value, d: duration
  easeOutExpo = (t: number, b: number, c: number, d: number): number =>
    (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
}
