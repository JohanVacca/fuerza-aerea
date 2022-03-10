import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesHomeComponent } from './unidades-home/unidades-home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [UnidadesHomeComponent],
    imports: [
        CommonModule,
        UnidadesRoutingModule,
        MatFormFieldModule,
        MatTableModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule
    ]
})
export class UnidadesModule { }
