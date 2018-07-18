import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})

export class NameComponent implements OnInit {
  nameQuizzer: string = sessionStorage.getItem('name') || '';
  nameIsFilled: boolean;

  constructor() { }

  ngOnInit() {
    this.nameFilled();
  }

  submitName(name) {
    if (name !== '') {
      sessionStorage.setItem('name', name);
      this.nameIsFilled = true;
    }
  }

  nameFilled() {
    if (this.nameQuizzer.length === 0) {
      this.nameIsFilled = false;
    } else {
      this.nameIsFilled = true;
    }
  }
}
