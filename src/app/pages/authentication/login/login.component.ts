import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profiles/profile.service';
import { LogService } from '../../../services/logs/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  @ViewChild('loginEmailId', {static: true}) logEmail: ElementRef;
  @ViewChild('loginPassword', {static: true}) logPass: ElementRef;
  @ViewChild('loginForm', {static: true}) logForm: ElementRef;
  @ViewChild('loginResponse', {static: true}) logResp: ElementRef;
  @ViewChild('loginReset', {static: true}) logReset: ElementRef;

  constructor(public profileServices: ProfileService, public logServices: LogService) { }

  ngOnInit(): void {

    this.logForm.nativeElement.addEventListener("submit", (event) => {

      event.preventDefault();

      this.logResp.nativeElement.innerText = "Processing...";

      let data = {
        emailId: this.logEmail.nativeElement.value,
        password: this.logPass.nativeElement.value,
      };

      this.profileServices.read(data).subscribe(
        (res: any) => {
          if(res.status === 200) {
            if(res.profile.role == "0") {

              let data = {
                customerId: res.profile._id,
                customerName: res.profile.username
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

            }

            sessionStorage.setItem('profileId', res.profile._id);
            sessionStorage.setItem('name', res.profile.username);
            sessionStorage.setItem('emailId', res.profile.emailId);
            sessionStorage.setItem('role', res.profile.role);

            this.logResp.nativeElement.innerText = "Login Succesfull";
            this.logReset.nativeElement.click();

            setTimeout(() => {
              this.logResp.nativeElement.innerText = "";
              location.href = "/home";
            }, 1000);

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

    });

  }

}
