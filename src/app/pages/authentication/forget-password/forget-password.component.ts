import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profiles/profile.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})

export class ForgetPasswordComponent implements OnInit {

  @ViewChild('forgetPasswordEmailId', {static: true}) forgetPasswordEmail: ElementRef;
  @ViewChild('forgetPasswordForm', {static: true}) forgetPassForm: ElementRef;
  @ViewChild('forgetPasswordResponse', {static: true}) forgetPassResp: ElementRef;
  @ViewChild('forgetPasswordReset', {static: true}) forgetPassReset: ElementRef;

  constructor(public profileServices: ProfileService,) { }

  ngOnInit(): void {

    this.forgetPassForm.nativeElement.addEventListener("submit", (event) => {

      event.preventDefault();

      this.forgetPassResp.nativeElement.innerText = "Processing...";

      let data = {
        emailId: this.forgetPasswordEmail.nativeElement.value,
      };

      this.profileServices.read(data).subscribe(
        (res: any) => {
          if(res.status === 200) {

            let message = "Click the below link to Reset Password\nhttps://xenodochial-sinoussi-0dc54e.netlify.app/reset-password/"+ res.profile._id;
            let data = {
              toMail: res.profile.emailId,
              message: message,
              subject: "Reset Password Link"
            }
            
            this.profileServices.sendMail(data).subscribe(
              (res: any) => {
                if(res.status === 200) {
                  
                  this.forgetPassResp.nativeElement.innerText = "Please check you Mail for Verification Link.";
                  this.forgetPassReset.nativeElement.click();

                  setTimeout(() => {
                    this.forgetPassResp.nativeElement.innerText = "";
                  }, 1000);
                  
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
    });
    
  }

}
