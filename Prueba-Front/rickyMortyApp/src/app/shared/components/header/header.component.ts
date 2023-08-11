import { Component } from '@angular/core';
import { User } from '@app/shared/interfaces/user.interface';
import { localStorageService } from '@app/storage/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private localStorageService:localStorageService){}
  dataStorage: User | null = null;

  ngOnInit() {
    this.getStorage();
  }

  getStorage() {
    this.dataStorage = this.localStorageService.getItem<User>('user');
  }
}
