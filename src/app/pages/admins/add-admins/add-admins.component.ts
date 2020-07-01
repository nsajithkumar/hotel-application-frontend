import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profiles/profile.service';

@Component({
  selector: 'app-add-admins',
  templateUrl: './add-admins.component.html',
  styleUrls: ['./add-admins.component.scss']
})

export class AddAdminsComponent implements OnInit {

  @ViewChild('adminsForm', {static: true}) adForm: ElementRef;
  @ViewChild('username', {static: true}) uname: ElementRef;
  @ViewChild('email', {static: true}) eId: ElementRef;
  @ViewChild('mobileNumber', {static: true}) mNumber: ElementRef;
  @ViewChild('password', {static: true}) pass: ElementRef;
  @ViewChild('confirmPassword', {static: true}) cPass: ElementRef;
  @ViewChild('adminsResponse', {static: true}) adResp: ElementRef;
  @ViewChild('adminsSubmit', {static: true}) adSub: ElementRef;
  @ViewChild('adminsReset', {static: true}) adReset: ElementRef;

  constructor(public profileServices: ProfileService) { }

  ngOnInit(): void {

    this.adForm.nativeElement.addEventListener("submit", (event) => {
      
      event.preventDefault();

      this.adResp.nativeElement.innerText = "Processing...";

      let data = {
        username: this.uname.nativeElement.value,
        emailId: this.eId.nativeElement.value,
        mobileNumber: parseInt(this.mNumber.nativeElement.value),
        password: this.pass.nativeElement.value,
        role: 1
      };

      this.profileServices.create(data).subscribe(
        (res: any) => {
          if(res.status === 200) {

            this.adResp.nativeElement.innerText = "Added Succesfully";
            this.adReset.nativeElement.click();

            setTimeout(() => {
              this.adResp.nativeElement.innerText = "";
              location.href = "/admins";
            }, 1000);

          } else if(res.status === 201) {
            this.adResp.nativeElement.innerText = "E-Mail/Mobile Number is Already Registered.";
          } else {
            this.adResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          }
          // console.log(res);
  
        }, (error) => {
          this.adResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          // console.log(error);
        }
      );
    });

  }

  checkPasswordMatch() {
    let password = this.pass.nativeElement.value;
    let confirmPassword = this.cPass.nativeElement.value;

    if(password === confirmPassword) {
      this.adResp.nativeElement.innerText = "";
      return 1;
    } else {
      this.adResp.nativeElement.innerText = "Password Did Not Match";
      this.adSub.nativeElement.setAttribute("disabled", true);
    }
  }

  checkMobileNumber() {
    let mobileNumber = this.mNumber.nativeElement.value;

    if(mobileNumber.length == 10 || mobileNumber.length == 0){
      this.adResp.nativeElement.innerText = "";
      return 1;
    } else {
      this.adResp.nativeElement.innerText = "Mobile Number Should Be 10 Digit";
      this.adSub.nativeElement.setAttribute("disabled", true);
    }
  }

  mobileNumberHandler() {
    let mobileRes = this.checkMobileNumber();
    
    if(mobileRes == 1) {
      let passRes = this.checkPasswordMatch();

      if(passRes == 1) {
        this.adSub.nativeElement.removeAttribute("disabled");
      }
    }
  }

  passwordHandler() {
    let passRes = this.checkPasswordMatch();

    if(passRes == 1) {
      let mobileRes = this.checkMobileNumber();

      if(mobileRes == 1) {
        this.adSub.nativeElement.removeAttribute("disabled");
      }
    }
  }

}
