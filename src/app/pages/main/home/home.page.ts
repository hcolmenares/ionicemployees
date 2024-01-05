import { Component, OnInit } from '@angular/core';
import { Employees } from '../../../models/employees.model';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdateEmployeeComponent } from 'src/app/shared/components/update-employee/update-employee.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private UtilsService: UtilsService
  ) { }

  ngOnInit() {
    const awa = '';
  }

  async addUpdateEmployee() {
    let employee: Employees
    let modal = await this.UtilsService.getModal({
      component: UpdateEmployeeComponent,
      cssClass: 'add-update-modal',
      componentProps: { employee }
    });
  }

}
