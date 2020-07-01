import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public httpClient: HttpClient) { }

  create(data) {
    let url = "https://v7backend.herokuapp.com/order/create";
    return this.httpClient.post(url, data);
  }

  readAll() {
    let url = "https://v7backend.herokuapp.com/order/read";
    return this.httpClient.get(url);
  }

  read(data) {
    let url = "https://v7backend.herokuapp.com/order/read";
    return this.httpClient.post(url, data);
  }

}
