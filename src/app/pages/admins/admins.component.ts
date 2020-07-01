import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profiles/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  @ViewChild('adminsForm', {static: true}) adForm: ElementRef;
  @ViewChild('username', {static: true}) uname: ElementRef;
  @ViewChild('email', {static: true}) eId: ElementRef;
  @ViewChild('mobileNumber', {static: true}) mNumber: ElementRef;
  @ViewChild('password', {static: true}) pass: ElementRef;
  @ViewChild('confirmPassword', {static: true}) cPass: ElementRef;
  @ViewChild('adminsResponse', {static: true}) adResp: ElementRef;
  @ViewChild('adminsSubmit', {static: true}) adSub: ElementRef;
  @ViewChild('adminsReset', {static: true}) adReset: ElementRef;

  @ViewChild('processStatus', {static: true}) pStatus: ElementRef;

  @ViewChild('modalForm', {static: true}) mForm: ElementRef;
  @ViewChild('modelProfileId', {static: true}) mProfileId: ElementRef;
  @ViewChild('modalUname', {static: true}) mUname: ElementRef;
  @ViewChild('modalMobileNumber', {static: true}) mMobileNumber: ElementRef;
  @ViewChild('modalResponse', {static: true}) mResp: ElementRef;
  @ViewChild('modalSubmit', {static: true}) mSub: ElementRef;
  @ViewChild('modalReset', {static: true}) mReset: ElementRef;
  @ViewChild('modalClose', {static: true}) mClose: ElementRef;

  @ViewChild('refershLink', {static: true}) rLink: ElementRef;

  adminsArray = [];
  role: string;

  constructor(public profileServices: ProfileService, public router: Router) {
    this.role = sessionStorage.getItem('role');

    if(this.role == "0" || this.role == "1" || this.role == undefined) {
      location.href = "/";
    }

    let data = {
      role: 1
    }

    this.profileServices.read(data).subscribe((res: any) => {
      if(res.status === 404) {
        this.pStatus.nativeElement.innerText = "No Profiles Found";
      } else if(res.status === 200) {
        this.pStatus.nativeElement.innerText = "";
        this.adminsArray = res.profiles;
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
    this.adForm.nativeElement.addEventListener("submit", (e) => {
      e.preventDefault();

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

    this.mForm.nativeElement.addEventListener("submit", (e) => {
      e.preventDefault();

      this.mResp.nativeElement.innerText = "Processing...";

      let data = {
        profileId: this.mProfileId.nativeElement.value,
        username: this.mUname.nativeElement.value,
        mobileNumber: parseInt(this.mMobileNumber.nativeElement.value)
      };
  
      this.profileServices.update(data).subscribe((res: any) => {
        if(res.status === 200) {
          this.mResp.nativeElement.innerText = "Updated Successfully";
          setTimeout(() => {
            this.mClose.nativeElement.click();
            this.mResp.nativeElement.innerText = "";
            location.href = "/admins";
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

  editAdmin(admin)  {
    this.mProfileId.nativeElement.value = admin._id;
    this.mUname.nativeElement.value = admin.username;
    this.mMobileNumber.nativeElement.value = admin.mobileNumber;
  }

  deleteAdmin(admin) {
    if(confirm("Are you sure you want to Delete?")){
      let data = {
        profileId: admin._id
      }

      this.profileServices.delete(data).subscribe((res: any) => {
        if(res.status === 200) {
          location.href = "/admins";
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
