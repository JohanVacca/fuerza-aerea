import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NecesidadesRoutingModule } from './necesidades-routing.module';
import { NecesidadesHomeComponent } from './necesidades-home/necesidades-home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

import { FormulacionRoutingModule, routedComponents } from '../formulacion/formulacion-routing.module';
import { FormsModule,} from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { AnexoComponent } from '../formulacion/components/anexo/anexo.component';
import { CientificoTecnologicoComponent } from '../formulacion/components/cientifico-tecnologico/cientifico-tecnologico.component';
import { CreateProyectComponent } from '../formulacion/components/create-proyect/create-proyect.component';
import { DetallesGeneralesComponent } from '../formulacion/components/detalles-generales/detalles-generales.component';
import { InformacionGeneralComponent } from '../formulacion/components/informacion-general/informacion-general.component';
import { AdminModule } from '../admin/admin.module';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { GruposComponent } from '../formulacion/components/cientifico-tecnologico/components/grupos/grupos.component';
import { EquipoInvestigacionComponent } from '../formulacion/components/cientifico-tecnologico/components/equipo-investigacion/equipo-investigacion.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { ComplementosComponent } from '../formulacion/components/detalles-generales/components/complementos/complementos.component';
import { AddComplementsComponent } from '../formulacion/components/detalles-generales/components/complementos/add-complements/add-complements.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [NecesidadesHomeComponent],
    imports: [
        CommonModule,
        NecesidadesRoutingModule,
        MatFormFieldModule,
        MatTableModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        FormulacionRoutingModule,
        MatDialogModule,
        FormsModule,
        CommonModule,
        MatSlideToggleModule,
        MatIconModule,
        MatInputModule,
        MatStepperModule,
        ReactiveFormsModule,
        AdminModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatTooltipModule,
        MatSelectModule,
        MatTabsModule,
        MatToolbarModule,
        CKEditorModule,
        ScrollingModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        SharedModule,
    ]
})
export class NecesidadesModule { }

//a
 