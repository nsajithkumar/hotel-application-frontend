import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('productsForm', {static: true}) proForm: ElementRef;
  @ViewChild('productName', {static: true}) proName: ElementRef;
  @ViewChild('amount', {static: true}) proAmount: ElementRef;
  @ViewChild('description', {static: true}) proDescription: ElementRef;
  @ViewChild('productPic', {static: true}) proPic: ElementRef;
  @ViewChild('productsResponse', {static: true}) proResp: ElementRef;
  @ViewChild('productsSubmit', {static: true}) proSub: ElementRef;
  @ViewChild('productsReset', {static: true}) proReset: ElementRef;

  @ViewChild('processStatus', {static: true}) pStatus: ElementRef;

  @ViewChild('modalForm', {static: true}) mForm: ElementRef;
  @ViewChild('modelProductId', {static: true}) mProductId: ElementRef;
  @ViewChild('modalPname', {static: true}) mPname: ElementRef;
  @ViewChild('modalPrice', {static: true}) mPrice: ElementRef;
  @ViewChild('modalDescription', {static: true}) mDesc: ElementRef;
  @ViewChild('modalProductPic', {static: true}) mPic: ElementRef;
  @ViewChild('modalResponse', {static: true}) mResp: ElementRef;
  @ViewChild('modalSubmit', {static: true}) mSub: ElementRef;
  @ViewChild('modalReset', {static: true}) mReset: ElementRef;
  @ViewChild('modalClose', {static: true}) mClose: ElementRef;

  productsArray = [];

  constructor(public productServices: ProductService) { 
    this.productServices.readAll().subscribe((res: any) => {
      if(res.status === 404) {
        this.pStatus.nativeElement.innerText = "No Products Found";
      } else {
        this.pStatus.nativeElement.innerText = "";
        this.productsArray = res.products;
      }
    });
  }

  ngOnInit(): void {
    this.proForm.nativeElement.addEventListener("submit", (e) => {
      e.preventDefault();

      this.proResp.nativeElement.innerText = "Processing...";

      let randomNumber = Math.floor(Math.random() * Math.floor(100000));
      let pic = this.proName.nativeElement.value + randomNumber;

      let data = {
        name: this.proName.nativeElement.value,
        price: this.proAmount.nativeElement.value,
        description: this.proDescription.nativeElement.value,
        image: pic,
      };

      this.productServices.create(data).subscribe(
        (res: any) => {
  
          if(res.status === 200) {
            this.proResp.nativeElement.innerText = "Added Succesfully";
            this.proReset.nativeElement.click();
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

    this.mForm.nativeElement.addEventListener("submit", (e) => {
      e.preventDefault();

      this.mResp.nativeElement.innerText = "Processing...";

      let data = {
        productId: this.mProductId.nativeElement.value,
        name: this.mPname.nativeElement.value,
        price: this.mPrice.nativeElement.value,
        description: this.mDesc.nativeElement.value,
      };
  
      this.productServices.update(data).subscribe((res: any) => {
        if(res.status === 200) {
          this.mResp.nativeElement.innerText = "Updated Successfully!";
          setTimeout(() => {
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
    });

  }

  editProduct(product)  {
    this.mProductId.nativeElement.value = product._id;
    this.mPname.nativeElement.value = product.name;
    this.mPrice.nativeElement.value = product.price;
    this.mDesc.nativeElement.value = product.description;
  }

  deleteProduct(product) {
    if(confirm("Are you sure you want to Delete?")){
      let data = {
        productId: product._id
      }

      this.productServices.delete(data).subscribe((res: any) => {
        if(res.status === 200) {
          alert("Removed Successfully");
        } else {
          alert("Not Removed");
        }
        // console.log(res);

      }, (error) => {
        alert("Oops! Problem Occured, Please Try Again Later.");
        // console.log(error)
      });
    }
  }

}
