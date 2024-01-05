import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private firebaseService: FirebaseService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    const holaMundo = '';
  }

  async submit() {
    if(this.form.valid) {
      
      const loading = await this.utilsService.loading();

      await loading.present();

      this.firebaseService.singIn(this.form.value as User)
      .then(res => {
        this.getUserInfo(res.user.uid);
      }).catch(error => {
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'top',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

  async getUserInfo(uid: string) {
    if(this.form.valid) {
      
      const loading = await this.utilsService.loading();

      await loading.present();

      let path = `users/${uid}`;
      delete this.form.value.password;
      this.firebaseService.getDocument(path)
      .then((user: User) => {

        this.utilsService.saveLocalStorage('user', user);
        this.utilsService.routerLink('/main/home');
        this.form.reset();
        
        this.utilsService.presentToast({
          message: `Bienvenido ${ user.name }`,
          duration: 1500,
          color: 'primary',
          position: 'top',
          icon: 'person-circle-outline'
        });

      }).catch(error => {
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'top',
          icon: 'alert-circle-outline'
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }

}
