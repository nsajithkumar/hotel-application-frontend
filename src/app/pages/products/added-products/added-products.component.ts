import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-added-products',
  templateUrl: './added-products.component.html',
  styleUrls: ['./added-products.component.scss']
})

export class AddedProductsComponent implements OnInit {

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
      } else if(res.status === 200) {
        this.pStatus.nativeElement.innerText = "";
        this.productsArray = res.products;
      } else {
        this.pStatus.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
      }
      // console.log(res);
    }, (error) => {
      this.pStatus.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
      // console.log(error);
    }
    );

  }

  ngOnInit(): void {

    this.mForm.nativeElement.addEventListener("submit", (event) => {

      event.preventDefault();

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
            this.mResp.nativeElement.innerText = "";
            location.href = "/products";
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

      this.productServices.delete(data).subscribe(
        (res: any) => {
          if(res.status === 200) {
            location.href = "/products";
          } else {
            alert("Not Removed");
          }
          // console.log(res);
        }, (error) => {
          alert("Oops! Problem Occured, Please Try Again Later.");
          // console.log(error)
        }
      );
    }
  }

}
