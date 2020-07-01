import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {

  role: string;

  constructor() {

    this.role = sessionStorage.getItem('role');

    if(this.role == "0" || this.role == undefined) {
      location.href = "/";
    }

  }

  ngOnInit(): void {
  }

}
