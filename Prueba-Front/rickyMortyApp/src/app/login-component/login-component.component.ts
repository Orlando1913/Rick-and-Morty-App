import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/shared/interfaces/user.interface';
import { UsersService } from '@app/shared/servicies/user.service';
import { localStorageService } from '@app/storage/local-storage.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent {
  userName?: string;
  password?: string;
  constructor(public userService: UsersService, public router: Router, private localStorageService: localStorageService) { }

  dataStorage: User | undefined;

  login(): void {
    console.log(this.localStorageService.getItem('user'));
    
    const registeredUser = this.localStorageService.getItem('user') as User;
    if (this.userName == registeredUser.userName && this.password == registeredUser.password) {
      this.localStorageService.setItem('loginUser', this.userName);
      this.localStorageService.setItem('loginPass', this.password);
      const storage = this.localStorageService.getItem<User>('user');
      this.dataStorage = storage!;
      window.localStorage['currentUser']=JSON.stringify(this.userName);
      window.location.href = '/home';
    }else{
      alert("Usuario o contraseña incorrectos");
    }
    
  }

  register(){
    window.location.href = '/register';
  }

}
