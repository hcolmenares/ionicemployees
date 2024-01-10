import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    const awita ='';
  }

  user(): User {
    return this.utilsService.getLocalStorage('user');
  }
  async takeImage() {

    let user = this.user();

    let path = `users/${ user.uid }`;

    const dataUrl = (await this.utilsService.takePicture('Imagen del perfil')).dataUrl; // Extraer la respuesta
    const loading = await this.utilsService.loading();
    await loading.present();

    let imgPath = `${ user.uid }/profile`;
    user.img = await this.firebaseService.updateImg(imgPath, dataUrl);
    this.firebaseService.updateDocument(path, { img: user.img })
      .then(async resp => {

        this.utilsService.saveLocalStorage('user', user);

        this.utilsService.presentToast({
          message: `Imagen actualizada exitósamente`,
          duration: 1500,
          color: 'primary',
          position: 'top',
          icon: 'checkmark-circle-outline',
        });

      })
      .catch((error) => {
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'top',
          icon: 'alert-circle-outline',
        });
      })
      .finally(() => {
        loading.dismiss();
      });
  }

}
