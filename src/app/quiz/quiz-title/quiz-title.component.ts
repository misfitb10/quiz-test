import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-quiz-title',
  templateUrl: './quiz-title.component.html',
  styleUrls: ['./quiz-title.component.css']
})
export class QuizTitleComponent implements OnInit {
  @Input() title;

  constructor() { }

  ngOnInit() {
  }

}
