import {Component, Input, OnInit} from '@angular/core';

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

  ngOnInit() {
  }

}
