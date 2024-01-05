import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private firebaseService: FirebaseService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    const holaMundo = '';
  }

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsService.loading();

      await loading.present();

      this.firebaseService
        .sendRecoveryEmail(this.form.value.email)
        .then((res) => {
          this.utilsService.presentToast({
            message: 'Revise su correo para cambiar la contraseña',
            duration: 1500,
            color: 'primary',
            position: 'top',
            icon: 'mail-outline',
          });
          this.utilsService.routerLink('/auth');
          this.form.reset();
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
}
