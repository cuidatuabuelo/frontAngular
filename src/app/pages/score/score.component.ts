import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Route, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {



  transactions: any = {};
  modal: any = {};
  constructor(private api: RestService, private rout: Router) { }

  ngOnInit() {
    this.getTransactions();
  }


  async getTransactions() {
    const list = await this.api.get('transactions');
    if (list.result) {
      this.transactions = list.data;
      console.log(list.data);
    }
  }

  async updateTransaction(tran, score) {

    tran.transactionScore = score;
    console.log(tran);
    const result = await this.api.put('transactions', {
      transactionId: tran.transactionId,
      transactionScore: score
    }, tran.transactionId);
    this.modal.title = 'Calificación servicio';
    this.modal.msg = result.message;
    $('#exampleModal').modal('show');
  }
}
