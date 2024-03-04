import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Student } from 'src/app/models/students.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.page.html',
  styleUrls: ['./estudiantes.page.scss'],
})
export class EstudiantesPage implements OnInit {
  loading: boolean = false;
  studentsArray: Student[] = [];

  constructor(
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.studentsArray = [
      {
        id: '1',
        name: 'Juan Pérez',
        code: 'JP001',
        age: 20,
        sex: 'M',
        eps: 'EPS123',
        regimen: 'Fijo',
        adress: 'Calle 123',
        city: 'Bogotá',
        phoneNumber: '3001234567',
        img: 'https://www.eluniversal.com.co/binrepository/1050x700/0c0/0d0/none/13704/ILST/inscripcion-en-colegios_6800838_20220930174613.jpg',
        qrCode: 'codigo_qr_juan.png',
      },
      {
        id: '2',
        name: 'Ana Sánchez',
        code: 'AS002',
        age: 22,
        sex: 'F',
        eps: 'EPS456',
        regimen: 'Fijo',
        adress: 'Carrera 789',
        city: 'Medellín',
        phoneNumber: '3009876543',
        img: 'https://www.csm.edu.co/wp-content/uploads/2023/06/Home-colegio-Santa-Maria.png',
        qrCode: 'codigo_qr_ana.png',
      },
      {
        id: '3',
        name: 'Carlos Gutiérrez',
        code: 'CG003',
        age: 21,
        sex: 'M',
        eps: 'EPS789',
        regimen: 'Fijo',
        adress: 'Calle 456',
        city: 'Cali',
        phoneNumber: '3001122233',
        img: 'https://www.eluniversal.com.co/binrepository/1050x700/0c0/0d0/none/13704/ILST/inscripcion-en-colegios_6800838_20220930174613.jpg',
        qrCode: 'codigo_qr_carlos.png',
      },
      {
        id: '4',
        name: 'María Rodríguez',
        code: 'MR004',
        age: 19,
        sex: 'F',
        eps: 'EPS012',
        regimen: 'Fijo',
        adress: 'Carrera 321',
        city: 'Barranquilla',
        phoneNumber: '3003334444',
        img: 'https://www.csm.edu.co/wp-content/uploads/2023/06/Home-colegio-Santa-Maria.png',
        qrCode: 'codigo_qr_maria.png',
      },
      {
        id: '5',
        name: 'Luis Gómez',
        code: 'LG005',
        age: 23,
        sex: 'M',
        eps: 'EPS345',
        regimen: 'Fijo',
        adress: 'Calle 654',
        city: 'Cartagena',
        phoneNumber: '3005556666',
        img: 'https://www.eluniversal.com.co/binrepository/1050x700/0c0/0d0/none/13704/ILST/inscripcion-en-colegios_6800838_20220930174613.jpg',
        qrCode: 'codigo_qr_luis.png',
      },
    ];
  }

  // ionViewWillEnter() {
  //   this.getStudent();
  // }

  // async addUpdateEmployee(student: Student) {
  //   console.log(student);

  //   // let modal = await this.utilsService.getModal({
  //   //   component: UpdateEmployeeComponent,
  //   //   cssClass: 'add-update-modal',
  //   //   componentProps: { student }
  //   // });
  //   // if(modal) this.getEmployee();
  // }

  // user(): User {
  //   return this.utilsService.getLocalStorage('user');
  // }

  // getStudent() {
  //   let path = `users/${this.user().uid}/empleados`;
  //   this.loading = true;

  //   let sub = this.firebaseService
  //     .getCollectionData(path)
  //     .snapshotChanges()
  //     .pipe(
  //       map((change) =>
  //         change.map((c) => ({
  //           id: c.payload.doc.id,
  //           ...c.payload.doc.data(),
  //         }))
  //       )
  //     )
  //     .subscribe({
  //       next: (resp: any) => {
  //         this.employees = resp;
  //         this.loading = false;
  //         sub.unsubscribe();
  //       },
  //     });
  // }

  // doRefresh(event: any) {
  //   setTimeout(() => {
  //     this.getStudent();
  //     event.target.comple();
  //   }, 1000);
  // }

  // async deleteStudent(student: Student) {
  //   let path = `users/${this.user().uid}/empleados/${student.id}`;

  //   const loading = await this.utilsService.loading();
  //   await loading.present();

  //   let imgPath = await this.firebaseService.getFilePath(student.img);
  //   await this.firebaseService.deleteFile(imgPath);

  //   this.firebaseService
  //     .deleteDocument(path)
  //     .then(async (resp) => {
  //       this.employees = this.employees.filter((e) => e.id !== student.id);

  //       this.utilsService.dismissModal({ success: true });

  //       this.utilsService.presentToast({
  //         message: `Empleado eliminado exitósamente`,
  //         duration: 1500,
  //         color: 'primary',
  //         position: 'top',
  //         icon: 'checkmark-circle-outline',
  //       });
  //     })
  //     .catch((error) => {
  //       this.utilsService.presentToast({
  //         message: error.message,
  //         duration: 2500,
  //         color: 'danger',
  //         position: 'top',
  //         icon: 'alert-circle-outline',
  //       });
  //     })
  //     .finally(() => {
  //       loading.dismiss();
  //     });
  // }

  // async confirmDeleteStudent(student: Student) {
  //   this.utilsService.presentAlert({
  //     header: 'Eliminar Empleado',
  //     message: '¿Desea eliminar este empleado?',
  //     mode: 'ios',
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //       },
  //       {
  //         text: 'Si, eliminar.',
  //         handler: () => {
  //           this.deleteStudent(student);
  //         },
  //       },
  //     ],
  //   });
  // }
}
