import { Component, OnInit, computed, signal } from '@angular/core';
import { Employees } from '../../../models/employees.model';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdateEmployeeComponent } from 'src/app/shared/components/update-employee/update-employee.component';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from '../../../services/firebase.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  loading:boolean = false;
  employees:Employees[] = [];
  imgSrc:string = 'https://www.semana.com/resizer/5nLprnSmrtWrdAXpgWXYjnaIwYI=/1280x720/smart/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/semana/CXZW7ZI5GZC5ZNJW2F55GL5SC4.jpg';
  contentArray:any[] = [];

  constructor(
    private utilsService: UtilsService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.initArrays();
    // this.getEmployee();
  }

  initArrays() {
    this.contentArray = [
      {
        route: '/main/estudiantes',
        text: 'Listado de estudiantes'
      },
    ];
  }

  ionViewWillEnter() {
    this.getEmployee();
  }

  async addUpdateEmployee(employee?: Employees) {
    let modal = await this.utilsService.getModal({
      component: UpdateEmployeeComponent,
      cssClass: 'add-update-modal',
      componentProps: { employee }
    });
    if(modal) this.getEmployee();
  }

  user(): User {
    return this.utilsService.getLocalStorage('user');
  }

  getEmployee() {
    let path = `users/${ this.user().uid }/empleados`;
    this.loading = true;

    let sub = this.firebaseService.getCollectionData(path)
      .snapshotChanges()
      .pipe(
        map(change => change.map( c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        })))
      ).subscribe({
        next: ((resp: any) => {
          this.employees = resp;
          this.loading = false;
          sub.unsubscribe();
        })
      });
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.getEmployee();
      event.target.comple();
    }, 1000);
  }

  async deleteEmployee(employee: Employees) {
    let path = `users/${ this.user().uid }/empleados/${employee.id}`;

    const loading = await this.utilsService.loading();
    await loading.present();

    let imgPath = await this.firebaseService.getFilePath(employee.img);
    await this.firebaseService.deleteFile(imgPath);

    this.firebaseService
      .deleteDocument(path)
      .then(async (resp) => {

        this.employees = this.employees.filter(e => e.id !== employee.id);

        this.utilsService.dismissModal({success: true});

        this.utilsService.presentToast({
          message: `Empleado eliminado exitósamente`,
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

  async confirmDeleteEmployee(employee: Employees) {
    this.utilsService.presentAlert({
      header: 'Eliminar Empleado',
      message: '¿Desea eliminar este empleado?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Si, eliminar.',
          handler: () => {
            this.deleteEmployee(employee);
          }
        }
      ]
    })
  }

  getBills() {
    return this.employees.reduce((index, employee) => index + employee.salario, 0)
  }

  redirectTo(route:string) {
    this.utilsService.routerLink(route);
  }

}
