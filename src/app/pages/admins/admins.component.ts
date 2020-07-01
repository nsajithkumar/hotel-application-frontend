import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})

export class AdminsComponent implements OnInit {

  role: string;

  constructor() {
    this.role = sessionStorage.getItem('role');

    if(this.role == "0" || this.role == "1" || this.role == undefined) {
      location.href = "/";
    }

  }

  ngOnInit(): void {
  }

}
