import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '@app/shared/servicies/user.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent {
  name!: string;
  lastname!: string;
  userName!: string;
  password!: string;
  confirmPassword!: string;
  passwordError!: boolean;

  constructor(public userService:UsersService, public router:Router) {}

  register() {
    let user = { name: this.name, lastname: this.lastname, userName:this.userName, password: this.password };
    if (localStorage.getItem('user') === null) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      user = JSON.parse(localStorage.getItem('user')!)
      localStorage.setItem('user', JSON.stringify(user))
    }
    window.location.href = '/login';
    
  }
}
