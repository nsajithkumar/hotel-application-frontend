import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profiles/profile.service';
 
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  @ViewChild('username', {static: true}) uname: ElementRef;
  @ViewChild('email', {static: true}) eId: ElementRef;
  @ViewChild('mobileNumber', {static: true}) mNumber: ElementRef;
  @ViewChild('password', {static: true}) pass: ElementRef;
  @ViewChild('confirmPassword', {static: true}) cPass: ElementRef;
  @ViewChild('registerResponse', {static: true}) regResp: ElementRef;
  @ViewChild('registerReset', {static: true}) regReset: ElementRef;
  @ViewChild('registerSubmit', {static: true}) regSubmit: ElementRef;
  @ViewChild('registerForm', {static: true}) regForm: ElementRef;
  

  @ViewChild('loginEmailId', {static: true}) logEmail: ElementRef;
  @ViewChild('loginPassword', {static: true}) logPass: ElementRef;
  @ViewChild('loginFields', {static: true}) loginSec: ElementRef;
  @ViewChild('loginForm', {static: true}) logForm: ElementRef;
  @ViewChild('loginResponse', {static: true}) logResp: ElementRef;
  @ViewChild('loginReset', {static: true}) logReset: ElementRef;

  @ViewChild('forgetPasswordEmailId', {static: true}) forgetPasswordEmail: ElementRef;
  @ViewChild('forgetPasswordFields', {static: true}) forgetPasswordSec: ElementRef;
  @ViewChild('forgetPasswordForm', {static: true}) forgetPassForm: ElementRef;
  @ViewChild('forgetPasswordResponse', {static: true}) forgetPassResp: ElementRef;
  @ViewChild('forgetPasswordReset', {static: true}) forgetPassReset: ElementRef;

  constructor(public profileServices: ProfileService) { }

  ngOnInit(): void {

    this.regForm.nativeElement.addEventListener("submit", (e) => {
      e.preventDefault();

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
            this.regResp.nativeElement.innerText = "Registered Succesfully";
            this.regReset.nativeElement.click();
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

    this.logForm.nativeElement.addEventListener("submit", (e) => {
      e.preventDefault();

      this.logResp.nativeElement.innerText = "Processing...";

      let data = {
        emailId: this.logEmail.nativeElement.value,
        password: this.logPass.nativeElement.value,
      };

      this.profileServices.read(data).subscribe(
        (res: any) => {
          if(res.status === 200) {
            this.logResp.nativeElement.innerText = "Login Succesfull";
            this.logReset.nativeElement.click();
          } else if(res.status === 404) {
            this.logResp.nativeElement.innerText = "Invalid E-Mail ID and Password.";
          } else {
            this.logResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          }
          // console.log(res);
        }, (error) => {
          this.logResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          // console.log(error);
        }
      );

    })

    this.forgetPassForm.nativeElement.addEventListener("submit", (e) => {
      e.preventDefault();

      this.forgetPassResp.nativeElement.innerText = "Processing...";

      let data = {
        emailId: this.forgetPasswordEmail.nativeElement.value,
      };

      this.profileServices.read(data).subscribe(
        (res: any) => {
          if(res.status === 200) {
            let message = "Click the below link to Reset Password \n http://localhost:4200/reset-password/"+ res.profile._id;
            let data = {
              toMail: res.profile.emailId,
              message: message,
              subject: "Reset Password Link"
            }
            this.profileServices.sendMail(data).subscribe(
              (res: any) => {
                if(res.status === 200) {
                  this.forgetPassResp.nativeElement.innerText = "Please check you Mail!";
                  this.forgetPassReset.nativeElement.click();
                } else {
                  this.forgetPassResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
                }
                // console.log(res);
              }, (error) => {
                this.forgetPassResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
                // console.log(error);
              }
            );
          } else if(res.status === 404) {
            this.forgetPassResp.nativeElement.innerText = "Invalid E-Mail ID";
          } else {
            this.forgetPassResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          }
          // console.log(res);
        }, (error) => {
          this.forgetPassResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          // console.log(error);
        }
      );
    })
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

  pushForgetPassword() {
    this.loginSec.nativeElement.classList.add("hide");
    this.forgetPasswordSec.nativeElement.classList.remove("hide");
  }

  pushSignIn() {
    this.forgetPasswordSec.nativeElement.classList.add("hide");
    this.loginSec.nativeElement.classList.remove("hide");
  }

}