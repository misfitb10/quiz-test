import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.newQuiz();
  }



  newQuiz() {
    // TODO: Remove all data except name
    console.log('new quiz!');
  }
}
