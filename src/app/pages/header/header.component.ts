import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/logs/log.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  role: string;
  logId: string;

  constructor(public logServices: LogService) { 
    this.role = sessionStorage.getItem('role');
    this.logId = sessionStorage.getItem('sessionId');
  }

  ngOnInit(): void {
  }

  signOut() {

    if(this.role == "0") {

      let data = {
        logId: this.logId
      }
  
      this.logServices.update(data).subscribe(
        (res: any) => {

          if(res.status === 200) {
            sessionStorage.clear();
            location.href = "/authentication";
          } else {
            alert("Oops! Problem Occured, Please Try Again Later.");
          }
          // console.log(res);
  
        }, (error) => {
            alert("Oops! Problem Occured, Please Try Again Later.");
            // console.log(error);
        }
      );
    } else {
      sessionStorage.clear();
      location.href = "/authentication";
    }
    

  }

}
