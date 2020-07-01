import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profiles/profile.service';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.scss']
})
export class AddCustomersComponent implements OnInit {

  @ViewChild('customersForm', {static: true}) cusForm: ElementRef;
  @ViewChild('username', {static: true}) uname: ElementRef;
  @ViewChild('email', {static: true}) eId: ElementRef;
  @ViewChild('mobileNumber', {static: true}) mNumber: ElementRef;
  @ViewChild('password', {static: true}) pass: ElementRef;
  @ViewChild('confirmPassword', {static: true}) cPass: ElementRef;
  @ViewChild('customersResponse', {static: true}) cusResp: ElementRef;
  @ViewChild('customersSubmit', {static: true}) cusSub: ElementRef;
  @ViewChild('customersReset', {static: true}) cusReset: ElementRef;

  constructor(public profileServices: ProfileService) { }

  ngOnInit(): void {

    this.cusForm.nativeElement.addEventListener("submit", (event) => {
      
      event.preventDefault();

      this.cusResp.nativeElement.innerText = "Processing...";

      let data = {
        username: this.uname.nativeElement.value,
        emailId: this.eId.nativeElement.value,
        mobileNumber: parseInt(this.mNumber.nativeElement.value),
        password: this.pass.nativeElement.value,
        role: 0
      };

      this.profileServices.create(data).subscribe(
        (res: any) => {
          if(res.status === 200) {

            this.cusResp.nativeElement.innerText = "Added Succesfully";
            this.cusReset.nativeElement.click();

            setTimeout(() => {
              this.cusResp.nativeElement.innerText = "";
              location.href = "/customers";
            }, 1000);

          } else if(res.status === 201) {
            this.cusResp.nativeElement.innerText = "E-Mail/Mobile Number is Already Registered.";
          } else {
            this.cusResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          }
          // console.log(res);
  
        }, (error) => {
          this.cusResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          // console.log(error);
        }
      );

    });

  }

  checkPasswordMatch() {
    let password = this.pass.nativeElement.value;
    let confirmPassword = this.cPass.nativeElement.value;

    if(password === confirmPassword) {
      this.cusResp.nativeElement.innerText = "";
      return 1;
    } else {
      this.cusResp.nativeElement.innerText = "Password Did Not Match";
      this.cusSub.nativeElement.setAttribute("disabled", true);
    }
  }

  checkMobileNumber() {
    let mobileNumber = this.mNumber.nativeElement.value;

    if(mobileNumber.length == 10 || mobileNumber.length == 0){
      this.cusResp.nativeElement.innerText = "";
      return 1;
    } else {
      this.cusResp.nativeElement.innerText = "Mobile Number Should Be 10 Digit";
      this.cusSub.nativeElement.setAttribute("disabled", true);
    }
  }

  mobileNumberHandler() {
    let mobileRes = this.checkMobileNumber();

    if(mobileRes == 1) {
      let passRes = this.checkPasswordMatch();

      if(passRes == 1) {
        this.cusSub.nativeElement.removeAttribute("disabled");
      }
    }
  }

  passwordHandler() {
    let passRes = this.checkPasswordMatch();

    if(passRes == 1) {
      let mobileRes = this.checkMobileNumber();

      if(mobileRes == 1) {
        this.cusSub.nativeElement.removeAttribute("disabled");
      }
    }
  }

}
