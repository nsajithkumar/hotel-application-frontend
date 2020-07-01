import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';
import { OrderService } from '../../../services/orders/order.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})

export class ProductsViewComponent implements OnInit {

  @ViewChild('processResponse', {static: true}) pResp: ElementRef;
  @ViewChild('modalResponse', {static: true}) mResp: ElementRef;
  @ViewChild('modalClose', {static: true}) mClose: ElementRef;

  cartArray = [];
  totalAmount = 0;

  productsArray = [];
  ordersArray = [];

  customerId: string; 
  customerName: string;

  role: string;

  constructor(public productServices: ProductService, public orderServices: OrderService) { 
    this.customerId = sessionStorage.getItem('profileId');
    this.customerName = sessionStorage.getItem('name');

    this.role = sessionStorage.getItem('role');

    if(this.role == "1" || this.role == "1") {
      location.href = "/";
    }

    this.productServices.readAll().subscribe(
      (res: any) => {
        if(res.status === 200) {
          this.pResp.nativeElement.innerText = "";
          this.productsArray = res.products;
        } else if(res.status === 404) {
          this.pResp.nativeElement.innerText = "No Products Found";
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

  addToCart(product) {
    let flag = 1;
    let amount = 0;
    this.cartArray.forEach((current) => {
      if(current.productId === product._id) {
        current.quantity += 1;
        current.price = current.quantity * product.price; 
        flag = 0;
        amount = product.price;
        return;
      }
    })
    if(flag) {
      this.cartArray.push({
        productId: product._id,
        productName: product.name,
        quantity: 1,
        price: product.price
      });
      amount = product.price;
    }
    this.totalAmount += amount;
    this.pResp.nativeElement.innerText = "Added Succesfully!";
    setTimeout(() => {
      this.pResp.nativeElement.innerText= "";
    }, 500);
  }

  placeOrder() {

    this.mResp.nativeElement.innerText = "Progressing...";

    let productName = [];
    let productAmount = [];
    let productQuantity = [];

    for(let i=0;i<this.cartArray.length;i++){
      productName.push(this.cartArray[i].productName);
      productAmount.push(this.cartArray[i].price);
      productQuantity.push(this.cartArray[i].quantity);
    }
    let data = {
      customerId: this.customerId,
      customerName: this.customerName,
      productName: productName,
      productQuantity: productQuantity,
      productAmount: productAmount,
    }

    this.orderServices.create(data).subscribe(
      (res: any) => {
        if(res.status === 200) {
          this.mResp.nativeElement.innerText = "Order Placed Successfully!";
          setTimeout(() => {
            this.cartArray = [];
            this.mResp.nativeElement.innerText = "";
            this.mClose.nativeElement.click();
          }, 1000);
        } else {
          this.mResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
        }
        // console.log(res);

      }, (error) => {
        this.mResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
        // console.log(error);

      }
    );

  }

}
