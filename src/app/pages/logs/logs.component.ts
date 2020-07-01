import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LogService } from '../../services/logs/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  @ViewChild('processStatus', {static: true}) pStatus: ElementRef;

  logsArray = [];
  constructor(public logServices: LogService) { 
    this.logServices.readAll().subscribe((data: any) => {
      if(data.status === 404) {
        this.pStatus.nativeElement.innerText = "No Logs Found";
      } else {
        this.pStatus.nativeElement.innerText = "";
        this.logsArray = data.profiles;
      }
    });
  }

  ngOnInit(): void {
  }

}
