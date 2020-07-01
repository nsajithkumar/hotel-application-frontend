import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from '../../services/orders/order.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})

export class MyordersComponent implements OnInit {

  ordersArray = [];
  role: string;
  customerId: string;

  @ViewChild('processResponse', {static: true}) pResp: ElementRef;

  constructor(public orderServices: OrderService) { 

    this.role = sessionStorage.getItem('role');
    this.customerId = sessionStorage.getItem('profileId');

    if(this.role == "1" || this.role == "2" || this.role == undefined) {
      location.href = "/";
    }

    let data = {
      customerId: this.customerId
    }
    
    this.orderServices.read(data).subscribe(
      (res: any) => {

        if(res.status === 200) {
          this.pResp.nativeElement.innerText = "";
          this.ordersArray = res.orders;
        } else if(res.status === 404) {
          this.pResp.nativeElement.innerText = "No Orders Found";
        } else {
          this.pResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
        }
        // console.log(res);

      }, (error) => {
        this.pResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
        // console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

  calculateSum(amounts) {
    let tot = 0;
    amounts.forEach(amount => {
      tot += amount;
    });
    return tot;
  }

}
