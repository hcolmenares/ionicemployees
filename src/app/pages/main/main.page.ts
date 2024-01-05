import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  currentPath: string = '';
  pages = [
    {title: 'inicio', url: '/main/home', icon: 'home-outline'},
    {title: 'perfil', url: '/main/profile', icon: 'person-outline'}
  ];

  constructor(
    private router: Router,
    private fireservice: FirebaseService,
    private utilsService: UtilsService
    ) {}

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if(event?.url) this.currentPath = event.url;
    });
  }

  signOut() {
    this.fireservice.signOut();
  }

  user(): User {
    return this.utilsService.getLocalStorage('user');
  }

}
