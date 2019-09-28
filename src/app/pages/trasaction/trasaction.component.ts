import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';

declare var $: any;

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
  initialDate: number;
  serviceId: number;
  serviceName: string;

  constructor(private api: RestService) { }
  

  ngOnInit() {
    this.api.get('/users').then(response => {
      this.users = response;
      console.log(this.users);
    });
    this.api.get('/services').then(response => {
      this.services = response;
    });

    this.api.get('/products').then(response => {
      this.products = response;
    });
  }

  createTransaction() {
    this.api.post('/transactions', { userId: 2, productId: this.productId,
       serviceId: this.serviceId, initialDate:  this.initialDate, finalDate: this.initialDate }).then( response =>{
        console.log(response);
    });
  }

  openModal(serviceId: number, serviceName: string) {
    this.serviceId = serviceId;
    this.serviceName = serviceName;
    $('#exampleModal').modal('show');
  }

}
