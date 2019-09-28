import { Component, OnInit } from '@angular/core';
import { RestService } from "../../services/rest.service"
import { Router } from '@angular/router';


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = ""
  public password: string = ""

  currentState = 'idle'
  states = {
    idle: {
      on: {
        change: () => { this.login().then(value => this.currentState = value ? 'logged' : 'fail'); return 'loading' }
      }
    },
    loading: {
      on: {
        change: async () => 'loading'
      }
    },
    logged: {
      on: {
        change: async () => this.route.navigate(['dashboard/transaction'])
      }
    },
    fail: {
      on: {
        change: async () => { sleep(2000).then(v => this.currentState = 'idle'); return 'fail' }
      }
    }
  }

  constructor(private api: RestService, private route: Router) {
  }

  async login() {
    const { api, username, password } = this

    if (username == "" || password == "") return false
    try {
      const response: any = await api.post('/auth', {
        email: username,
        password: password,
      })
      console.log(response)
      const { result, data, message } = response
      if (!result) return false
      localStorage.setItem("username", data.email)
      return true
    } catch (err) {
      return false
    }
  }


  async onChange() {
    console.log(this.currentState)
    this.currentState = await this.states[this.currentState].on['change']()
    console.log(this.currentState)
  }

  ngOnInit() {
  }

}
