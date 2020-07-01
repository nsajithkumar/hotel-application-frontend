import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/logs/log.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  role: string;

  constructor(public logServices: LogService) { 
    this.role = sessionStorage.getItem('role');
  }

  ngOnInit(): void {
  }

  signOut() {

    sessionStorage.clear();

    let data = {
      logId: ""
    }

    location.href = "/authentication";

    console.log("logout");
    
    // this.logServices.update(data).subscribe(
    //   (res: any) => {
    //     if(res.status === 200) {
    //       location.href="/";
    //     } else {
    //       alert("Oops! Problem Occured, Please Try Again Later.");
    //     }
    //     // console.log(res);

    //   }, (error) => {
    //       alert("Oops! Problem Occured, Please Try Again Later.");
    //       console.log(error);
    //   }
    // );

  }

}
