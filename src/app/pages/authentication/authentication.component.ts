import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
 
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})

export class AuthenticationComponent implements OnInit {

  @ViewChild('loginFields', {static: true}) loginSec: ElementRef;

  @ViewChild('forgetPasswordFields', {static: true}) forgetPasswordSec: ElementRef;

  constructor() { }

  ngOnInit(): void {
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