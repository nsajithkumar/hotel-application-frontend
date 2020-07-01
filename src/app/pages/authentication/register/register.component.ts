import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profiles/profile.service';
import { LogService } from '../../../services/logs/log.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  @ViewChild('username', {static: true}) uname: ElementRef;
  @ViewChild('email', {static: true}) eId: ElementRef;
  @ViewChild('mobileNumber', {static: true}) mNumber: ElementRef;
  @ViewChild('password', {static: true}) pass: ElementRef;
  @ViewChild('confirmPassword', {static: true}) cPass: ElementRef;
  @ViewChild('registerResponse', {static: true}) regResp: ElementRef;
  @ViewChild('registerReset', {static: true}) regReset: ElementRef;
  @ViewChild('registerSubmit', {static: true}) regSubmit: ElementRef;
  @ViewChild('registerForm', {static: true}) regForm: ElementRef;

  constructor(public profileServices: ProfileService, public logServices: LogService) { }

  ngOnInit(): void {

    this.regForm.nativeElement.addEventListener("submit", (event) => {

      event.preventDefault();

      this.regResp.nativeElement.innerText = "Processing...";
      
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
            
            let data = {
              customerId: res.profileId,
              customerName: res.username
            }
        
            this.logServices.create(data).subscribe(
              (res: any) => {
                if(res.status === 200) {
                  sessionStorage.setItem('sessionId', res.logId);
                }
                // console.log(res);
              }, (error) => {
                // console.log(error);
              }
            );

            sessionStorage.setItem('profileId', res.profileId);
            sessionStorage.setItem('name', res.username);
            sessionStorage.setItem('emailId', res.emailId);
            sessionStorage.setItem('role', "0");

            this.regResp.nativeElement.innerText = "Registered Succesfully";
            this.regReset.nativeElement.click();

            setTimeout(() => {
              this.regResp.nativeElement.innerText = "";
              location.href = "/home";
            }, 1000);

          } else if(res.status === 201) {
            this.regResp.nativeElement.innerText = "E-Mail/Mobile Number is Already Registered.";
          } else {
            this.regResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          }
          // console.log(res);
  
        }, (error) => {
          this.regResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          // console.log(error);
        }
      );

    });

  }

  checkPasswordMatch() {
    let password = this.pass.nativeElement.value;
    let confirmPassword = this.cPass.nativeElement.value;

    if(password === confirmPassword) {
      this.regResp.nativeElement.innerText = "";
      return 1;
    } else {
      this.regResp.nativeElement.innerText = "Password Did Not Match";
      this.regSubmit.nativeElement.setAttribute("disabled", true);
    }
  }

  checkMobileNumber() {
    let mobileNumber = this.mNumber.nativeElement.value;

    if(mobileNumber.length == 10 || mobileNumber.length == 0){
      this.regResp.nativeElement.innerText = "";
      return 1;
    } else {
      this.regResp.nativeElement.innerText = "Mobile Number Should Be 10 Digit";
      this.regSubmit.nativeElement.setAttribute("disabled", true);
    }
  }

  mobileNumberHandler() {
    let mobileRes = this.checkMobileNumber();

    if(mobileRes == 1) {
      let passRes = this.checkPasswordMatch();

      if(passRes == 1) {
        this.regSubmit.nativeElement.removeAttribute("disabled");
      }
    }
  }

  passwordHandler() {
    let passRes = this.checkPasswordMatch();

    if(passRes == 1) {
      let mobileRes = this.checkMobileNumber();

      if(mobileRes == 1) {
        this.regSubmit.nativeElement.removeAttribute("disabled");
      }
    }
  }

}
