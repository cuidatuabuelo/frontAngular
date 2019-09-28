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
  constructor(private api: RestService) { }
  

  ngOnInit() {
    this.api.get('users').then(response => {
      this.users = response;
      console.log(this.users);
    });
    this.api.get('services').then(response => {
      this.services = response;
    });
  }

}
