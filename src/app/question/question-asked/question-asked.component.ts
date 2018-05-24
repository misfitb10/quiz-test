import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question-asked',
  templateUrl: './question-asked.component.html',
  styleUrls: ['./question-asked.component.css']
})
export class QuestionAskedComponent implements OnInit {
  @Input() question;

  constructor() { }

  ngOnInit() {
  }

}
