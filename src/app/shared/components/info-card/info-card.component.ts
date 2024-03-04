import { Component, Input, OnInit } from '@angular/core';
import { Student } from 'src/app/models/students.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent  implements OnInit {

  @Input() students: Student[] = [];

  constructor(
    private utilsService: UtilsService,
  ) { }

  ngOnInit() {
    const awa = '';
  }

  goTo(link:string) {
    this.utilsService.routerLink(link);
  }

}
