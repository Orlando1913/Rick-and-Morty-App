import { Component } from '@angular/core';
import { UsersService } from '@app/shared/servicies/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public userService:UsersService ) {}


  ngOnInit(){
    this.getUserLogged();
  }

  getUserLogged() {
    this.userService.getUser().subscribe((user) => {
      //console.log(user);
    });
  }
}
