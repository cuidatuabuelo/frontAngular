import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-trasaction',
  templateUrl: './trasaction.component.html',
  styleUrls: ['./trasaction.component.css']
})

export class TrasactionComponent implements OnInit {
  users: any = [];
  services: any = [];
  products: any = [];

  userId: number;
  productId: number;
  serviceId: number;
  initialDate: number;

  constructor(private api: RestService) { }
  

  ngOnInit() {
    this.api.get('users').then(response => {
      this.users = response;
      console.log(this.users);
    });
    this.api.get('services').then(response => {
      this.services = response;
    });

    this.api.get('products').then(response => {
      this.products = response;
    });
  }

  createTransaction(price: any) {
    this.api.post('transactions', { userId: 1, productId: this.productId,
       serviceId: this.serviceId, initialDate:  this.initialDate, finalDate: this.initialDate }).then( response =>{

    });
  }

}
