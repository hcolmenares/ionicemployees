import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase/auth';
import { Student } from 'src/app/models/students.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss'],
})
export class UpdateStudentComponent  implements OnInit {

  @Input() student: Student;
  user = {} as User;

  form = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    code: new FormControl('', Validators.required),
    age: new FormControl(null, Validators.required),
    sex: new FormControl('', Validators.required),
    eps: new FormControl('', Validators.required),
    regimen: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    img: new FormControl('', Validators.required),
    qrCode: new FormControl('', Validators.required),
   });   

  constructor(
    private firebaseService: FirebaseService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    this.user = this.utilsService.getLocalStorage('user');
    // if(this.student) this.form.setValue(this.student);
  }

  async submit() {
    if(this.form.valid) {
      if(this.student) this.updateEmployee();
      else this.createEmployee();
    }
  }

  async createEmployee() {
    
    let path = `users/${this.user.uid}/empleados`;

    const loading = await this.utilsService.loading();
    await loading.present();

    let dataUrl = this.form.value.img;
    let imgPath = `${this.user.uid}/${Date.now()}`;
    let imgUrl = await this.firebaseService.updateImg(imgPath, dataUrl);

    this.form.controls.img.setValue(imgUrl);

    delete this.form.value.id;

    this.firebaseService
      .addDocument(path, this.form.value)
      .then(async (resp) => {

        this.utilsService.dismissModal({success: true});

        this.utilsService.presentToast({
          message: `Empleado creado exitósamente`,
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

  async updateEmployee() {
    let path = `users/${this.user.uid}/empleados/${this.student.id}`;

    const loading = await this.utilsService.loading();
    await loading.present();

    if(this.form.value.img !== this.student.img) {
      let dataUrl = this.form.value.img;
      let imgPath = await this.firebaseService.getFilePath(this.student.img);
      let imgUrl = await this.firebaseService.updateImg(imgPath, dataUrl);

      this.form.controls.img.setValue(imgUrl);
    }

    delete this.form.value.id;

    this.firebaseService
      .updateDocument(path, this.form.value)
      .then(async (resp) => {

        this.utilsService.dismissModal({success: true});

        this.utilsService.presentToast({
          message: `Empleado actualizado exitósamente`,
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

  async takeImage() {
    const dataUrl = (await this.utilsService.takePicture('Imagen del empleado'))
      .dataUrl; // Extraer la respuesta
    this.form.controls.img.setValue(dataUrl);
  }

}
