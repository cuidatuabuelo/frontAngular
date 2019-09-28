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

  modelData: any[] = [];


  selectedProduct: any = {};
  selectedUser: any = {};
  selectedService: any = {};


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
    this.api.post('/transactions', {
      userId: 3, productId: this.productId,
      serviceId: this.serviceId, initialDate: this.initialDate, finalDate: this.initialDate
    }).then(response => {
      alert(response.message);
      $('#exampleModal').modal('hide');
    });
  }

  async openModal(serviceId: number, id: number) {
    this.serviceId = serviceId;
;

    this.selectedProduct = this.products.filter(f => f.productId == this.productId)[0];
    this.selectedService = this.services.filter(f => f.serviceId === this.serviceId)[0];
    this.selectedUser = this.users.filter(f => f.id === 2)[0];

    console.log(this.selectedProduct);
    console.log(this.selectedService);
    console.log(this.selectedUser);

    $('#exampleModal').modal('show');
  }

}
