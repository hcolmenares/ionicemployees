import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentInfoPageRoutingModule } from './student-info-routing.module';

import { StudentInfoPage } from './student-info.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [StudentInfoPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StudentInfoPageRoutingModule,
        SharedModule
    ]
})
export class StudentInfoPageModule {}
