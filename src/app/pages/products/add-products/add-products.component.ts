import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})

export class AddProductsComponent implements OnInit {

  @ViewChild('productsForm', {static: true}) proForm: ElementRef;
  @ViewChild('productName', {static: true}) proName: ElementRef;
  @ViewChild('amount', {static: true}) proAmount: ElementRef;
  @ViewChild('description', {static: true}) proDescription: ElementRef;
  @ViewChild('productPic', {static: true}) proPic: ElementRef;
  @ViewChild('productsResponse', {static: true}) proResp: ElementRef;
  @ViewChild('productsSubmit', {static: true}) proSub: ElementRef;
  @ViewChild('productsReset', {static: true}) proReset: ElementRef;

  constructor(public productServices: ProductService) { }

  ngOnInit(): void {

    this.proForm.nativeElement.addEventListener("submit", (event) => {
      
      event.preventDefault();

      this.proResp.nativeElement.innerText = "Processing...";

      var image = this.proPic.nativeElement.files[0].name;

      let data = {
        name: this.proName.nativeElement.value,
        price: this.proAmount.nativeElement.value,
        description: this.proDescription.nativeElement.value,
        image: image,
      };

      // console.log(data);

      this.productServices.create(data).subscribe(
        (res: any) => {
          if(res.status === 200) {

            this.proResp.nativeElement.innerText = "Added Succesfully";
            this.proReset.nativeElement.click();

            setTimeout(() => {
              this.proResp.nativeElement.innerText = "";
              location.href = "/products";
            }, 1000);

          } else {
            this.proResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          }
          // console.log(res);
        }, (error) => {
          this.proResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          // console.log(error);
        }
      );
    });

  }

}
