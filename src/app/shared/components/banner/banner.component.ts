import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})

export class BannerComponent  implements OnInit {

  currentUrl:string = '';
  @Input() imgSrc:string = 'https://razonpublica.com/wp-content/uploads/2023/12/ninos-prueba-educacion-Pisa-Francisco-Cajiao-1170x780.jpg';
  @Input() title:string = 'Base de datos de estudiantes';
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerURLActual();
  }

  obtenerURLActual() {
    const getUrl = this.router.url.slice(1);
    const divideUrl = getUrl.split('/');
    this.currentUrl = divideUrl.join(' > ');
  }

}
