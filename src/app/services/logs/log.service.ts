import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class LogService {

  constructor(public httpClient: HttpClient) { }

  create(data) {
    let url = "https://v7backend.herokuapp.com/log/create";
    return this.httpClient.post(url, data);
  }

  readAll() {
    let url = "https://v7backend.herokuapp.com/log/read";
    return this.httpClient.get(url);
  }

  read(data) {
    let url = "https://v7backend.herokuapp.com/log/read";
    return this.httpClient.post(url, data);
  }

  update(data) {
    let url = "https://v7backend.herokuapp.com/log/update";
    return this.httpClient.post(url, data);
  }

}
