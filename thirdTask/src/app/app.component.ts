import { OnInit, Component } from '@angular/core';
import {merge, interval, Observable, asyncScheduler, asapScheduler, timer} from 'rxjs';
import {mapTo, repeat, delay, map, observeOn, timeInterval, timeout, filter} from 'rxjs/operators';
import {Scheduler} from 'rxjs/internal/Rx';
import {takeUntil} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'thirdTask';
  objArrFirst;
  objArrSecond;
  objArrThird;
  sumIdForthStream;

  ngOnInit() {
    this.objArrFirst = [];
    this.objArrSecond = [];
    this.objArrThird = [];
    this.sumIdForthStream = 0;
  }

  getElementStream(stream) {
    this.sumIdForthStream += stream.id;
    if ( stream.stream === 1 ) {
      this.objArrFirst.push(stream);
    }
    if ( (stream.stream === 2) ) {
      this.objArrSecond.push(stream);
    }
    if ( (stream.stream === 3) ) {
      this.objArrThird.push(stream);
    }
  }
  startThreads() {
    const timeForStream1 = 0;
    const periodStream1 = 1000;
    const timeForStream2 = 10000;
    const periodStream2 = 1500;
    const timeForStream3 = 20000;
    const periodStream3 = 2000;
    const endTime = timer(30000);
    const firstThread = interval(periodStream1);
    const stream1 = firstThread.pipe(map(val => ({id: val + 1, stream: 1})));
    const secondThread = interval(periodStream2);
    const stream2 = secondThread.pipe(map(val => ({id: val + 1, stream: 2})));
    const thirdThread = interval(periodStream3);
    const stream3 = thirdThread.pipe(map(val => ({id: val + 1, stream: 3})));
    stream1.subscribe();
    stream2.subscribe();
    stream3.subscribe();
    const forthThread = merge(
      stream1.pipe(takeUntil(endTime)),
      stream2.pipe(filter(data => (data.id * periodStream2 >= timeForStream2)),
      takeUntil(endTime)),
      stream3.pipe(filter(data => (data.id * periodStream3 >= timeForStream3)),
        takeUntil(endTime))
    );

    forthThread.subscribe(data => this.getElementStream(data));
  }
}

