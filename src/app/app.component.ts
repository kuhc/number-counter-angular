import { Component } from '@angular/core';
import { Counter } from './shared/counter';

class DailyData {
  private _value: number;
  public counter: Counter;

  public set value(newVal) {
    this._value = newVal;
    if (this.counter) {
      this.counter.update(newVal);
    }
  }

  public get value() {
    return this._value;
  }
}

class TestData {
  public opened: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  number: number = 0;
  dailyData: DailyData;
  testData: TestData;

  constructor() {
    this.testData = new TestData();
    this.testData.opened = 100;
    // setTimeout(() => {
    //   this.dailyData = new DailyData();
    //   this.dailyData.counter = new Counter(8888);
    //   this.dailyData.counter.start();
    // }, 0);
    // setTimeout(() => {
    //   this.dailyData.counter.update(-8888);
    // }, 5000);
  }
}
