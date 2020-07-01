import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LogService } from '../../services/logs/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})

export class LogsComponent implements OnInit {

  role: string;

  @ViewChild('processStatus', {static: true}) pStatus: ElementRef;

  logsArray = [];
  constructor(public logServices: LogService) { 

    this.role = sessionStorage.getItem('role');

    if(this.role == "0") {
      location.href = "/";
    }
    
    this.logServices.readAll().subscribe((res: any) => {
      if(res.status === 404) {
        this.pStatus.nativeElement.innerText = "No Logs Found";
      } else {
        this.pStatus.nativeElement.innerText = "";
        this.logsArray = res.logs;
      }
    });
  }

  ngOnInit(): void {
  }

}
