import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  role:string;

  constructor() { 

    this.role = sessionStorage.getItem('role');

    if(this.role == "0" || this.role == "2" || this.role == undefined) {
      location.href = "/";
    }

  }

  ngOnInit(): void {
  }

}
