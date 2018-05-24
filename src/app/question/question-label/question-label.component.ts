import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question-label',
  templateUrl: './question-label.component.html',
  styleUrls: ['./question-label.component.css']
})
export class QuestionLabelComponent implements OnInit {
  @Input() question;

  constructor() { }

  ngOnInit() {
  }

}
