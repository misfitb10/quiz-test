import {Component, Injectable, Input, OnInit} from '@angular/core';
import {timer} from 'rxjs/observable/timer';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit {
  @Input() countDown;
  @Input() initialCount;
  @Input() count;

  constructor() { }

  ngOnInit() { }

  public countDownTimer(reset): void {
    if (reset) { this.count = this.initialCount; }

    this.countDown = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
  }
}
