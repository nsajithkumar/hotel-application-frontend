import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(public httpClient: HttpClient) { }

  create(data) {
    let url = "https://hotel-application-backend.herokuapp.com/product/create";
    return this.httpClient.post(url, data);
  }

  readAll() {
    let url = "https://hotel-application-backend.herokuapp.com/product/read";
    return this.httpClient.get(url);
  }

  read(data) {
    let url = "https://hotel-application-backend.herokuapp.com/product/read";
    return this.httpClient.post(url, data);
  }

  update(data) {
    let url = "https://hotel-application-backend.herokuapp.com/product/update";
    return this.httpClient.post(url, data);
  }

  delete(data) {
    let url = "https://hotel-application-backend.herokuapp.com/product/delete";
    return this.httpClient.post(url, data);
  }

}
