import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profiles/profile.service';

@Component({
  selector: 'app-added-customers',
  templateUrl: './added-customers.component.html',
  styleUrls: ['./added-customers.component.scss']
})

export class AddedCustomersComponent implements OnInit {

  @ViewChild('processStatus', {static: true}) pStatus: ElementRef;

  @ViewChild('modalForm', {static: true}) mForm: ElementRef;
  @ViewChild('modelProfileId', {static: true}) mProfileId: ElementRef;
  @ViewChild('modalUname', {static: true}) mUname: ElementRef;
  @ViewChild('modalMobileNumber', {static: true}) mMobileNumber: ElementRef;
  @ViewChild('modalResponse', {static: true}) mResp: ElementRef;
  @ViewChild('modalSubmit', {static: true}) mSub: ElementRef;
  @ViewChild('modalReset', {static: true}) mReset: ElementRef;
  @ViewChild('modalClose', {static: true}) mClose: ElementRef;

  customersArray = [];

  constructor(public profileServices: ProfileService) { 

    let data = {
      role: 0
    }

    this.profileServices.read(data).subscribe((res: any) => {
      if(res.status === 404) {
        this.pStatus.nativeElement.innerText = "No Profiles Found";
      } else if(res.status === 200) {
        this.pStatus.nativeElement.innerText = "";
        this.customersArray = res.profiles;
      } else {
        this.pStatus.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
      }
      // console.log(res);
    },  (error) => {
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
        profileId: this.mProfileId.nativeElement.value,
        username: this.mUname.nativeElement.value,
        mobileNumber: parseInt(this.mMobileNumber.nativeElement.value)
      };
  
      this.profileServices.update(data).subscribe(
        (res: any) => {
          if(res.status === 200) {

            this.mResp.nativeElement.innerText = "Updated Successfully!";

            setTimeout(() => {
              this.mClose.nativeElement.click();
              this.mResp.nativeElement.innerText = "";
              location.href = "/customers";
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

  modalMobileNumberHandler() {
    let mobileNumber = this.mMobileNumber.nativeElement.value;

    if(mobileNumber.length == 10 || mobileNumber.length == 0){
      this.mResp.nativeElement.innerText = "";
      this.mSub.nativeElement.removeAttribute("disabled", true);
    } else {
      this.mResp.nativeElement.innerText = "Mobile Number Should Be 10 Digit";
      this.mSub.nativeElement.setAttribute("disabled", true);
    }
  }

  editCustomer(customer)  {
    this.mProfileId.nativeElement.value = customer._id;
    this.mUname.nativeElement.value = customer.username;
    this.mMobileNumber.nativeElement.value = customer.mobileNumber;
  }

  deleteCustomer(customer) {
    if(confirm("Are you sure you want to Delete?")){
      let data = {
        profileId: customer._id
      }

      this.profileServices.delete(data).subscribe(
        (res: any) => {
          if(res.status === 200) {
            location.href = "/customers";
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
