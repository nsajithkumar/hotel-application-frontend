import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profiles/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  profileId: string;

  @ViewChild('resetPasswordForm', {static: true}) resPassForm: ElementRef;
  @ViewChild('newPassword', {static: true}) nPass: ElementRef;
  @ViewChild('confirmPassword', {static: true}) cPass: ElementRef;
  @ViewChild('resetPasswordResponse', {static: true}) resPassResp: ElementRef;
  @ViewChild('resetPasswordSubmit', {static: true}) resPassSub: ElementRef;
  @ViewChild('resetPasswordReset', {static: true}) resPassReset: ElementRef;

  constructor(public profileServices: ProfileService, public actRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.actRoute.paramMap.subscribe(params => {
      this.profileId = params.get('id');
    });

    this.resPassForm.nativeElement.addEventListener("submit", (event) => {

      event.preventDefault();

      this.resPassResp.nativeElement.innerText = "Progressing...";

      let data = {
        profileId: this.profileId,
        password: this.cPass.nativeElement.value
      }

      this.profileServices.update(data).subscribe(
        (res: any) => {
          if(res.status === 200) {

            this.resPassResp.nativeElement.innerText = "Password Updated Successfully!";
            this.resPassReset.nativeElement.click();

            setTimeout(()=> {
              location.href = "/authentication";
            }, 1000);

          } else {
            this.resPassResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          }
          // console.log(res);
        }, (error) => {
          this.resPassResp.nativeElement.innerText = "Oops! Problem Occured, Please Try Again Later.";
          // console.log(error);
        }
      );
    })
  }

  checkPasswordMatch() {
    let password = this.nPass.nativeElement.value;
    let confirmPassword = this.cPass.nativeElement.value;

    if(password === confirmPassword) {
      this.resPassResp.nativeElement.innerText = "";
      this.resPassSub.nativeElement.removeAttribute("disabled");
      return 1;
    } else {
      this.resPassResp.nativeElement.innerText = "Password Did Not Match";
      this.resPassSub.nativeElement.setAttribute("disabled", true);
    }
  }

}
