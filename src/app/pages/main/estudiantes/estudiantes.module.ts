import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstudiantesPageRoutingModule } from './estudiantes-routing.module';

import { EstudiantesPage } from './estudiantes.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [EstudiantesPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EstudiantesPageRoutingModule,
        SharedModule
    ]
})
export class EstudiantesPageModule {}
