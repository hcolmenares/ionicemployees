import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/app/models/students.model';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.page.html',
  styleUrls: ['./student-info.page.scss'],
})
export class StudentInfoPage implements OnInit {

  @Input() student: Student = {
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
  };
  studentInfo = [];

  constructor() { }

  ngOnInit() {
    const awa = '';
    this.initData();
  }

  initData() {
    this.studentInfo = [
      { label: 'Código', key: 'code' },
      { label: 'Edad', key: 'age' },
      { label: 'Sexo', key: 'sex' },
      { label: 'EPS', key: 'eps' },
      { label: 'Regimen', key: 'regimen' },
      { label: 'Dirección', key: 'adress' },
      { label: 'Ciudad', key: 'city' },
      { label: 'Teléfono', key: 'phoneNumber' },
     ];
     
  }
}
