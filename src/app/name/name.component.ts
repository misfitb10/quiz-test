import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})

export class NameComponent implements OnInit {
  nameQuizzer: string = sessionStorage.getItem('name') || '';

  constructor() { }

  ngOnInit() { }

  submitName(name) {
    if (name !== '') {
      sessionStorage.setItem('name', name);
    }
  }
}
