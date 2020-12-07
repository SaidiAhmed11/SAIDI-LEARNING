import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elearning',
  templateUrl: './elearning.component.html',
  styleUrls: ['./elearning.component.css']
})
export class ElearningComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  logout()
  {
    localStorage.clear();
  }
}
