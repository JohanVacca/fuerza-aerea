import { NgModule } from '@angular/core';
// import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule, routedComponents } from './pages-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { InstructionalComponent } from './instructional/instructional.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavPerfilComponent } from './nav-perfil/nav-perfil.component';
import { FormulacionComponent } from './formulacion/formulacion.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateIntructionalComponent } from './instructional/create-intructional/create-intructional.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InstructivosService } from '../@core/services/instructivos/instructivos.service';
import { VerIntructiveComponent } from './instructional/ver-intructive/ver-intructive.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { VistaProyectosComponent } from './evaluacion/components/vista-proyectos/vista-proyectos.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VerFormulariosComponent } from './evaluacion/components/vista-proyectos/ver-formularios/ver-formularios.component';
import { ListaSeguimientoComponent } from './Lista_Seguimiento/lista-seguimiento/lista-seguimiento.component';
import { ProyectosComponent } from './Lista_Seguimiento/components/proyectos/proyectos.component';
import { SeguimientoComponent } from './Lista_Seguimiento/components/seguimiento/seguimiento.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CronogramaNewComponent } from './Lista_Seguimiento/components/cronograma-new/cronograma-new.component';
import { SeguimientoRubroComponent } from './Lista_Seguimiento/components/seguimiento-rubro/seguimiento-rubro.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReportesComponent } from './Lista_Seguimiento/components/reportes/reportes.component';



const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    PagesRoutingModule,
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    RouterModule,
    MatMenuModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    InstructivosService
  ],
  declarations: [
    ...routedComponents,
    ...PAGES_COMPONENTS,
    InstructionalComponent,
    NavPerfilComponent,
    CreateIntructionalComponent,
    VerIntructiveComponent,
    EvaluacionComponent,
    VistaProyectosComponent,
    VerFormulariosComponent,
    ListaSeguimientoComponent,
    ProyectosComponent,
    SeguimientoComponent,
    CronogramaNewComponent,
    SeguimientoRubroComponent,
    ReportesComponent,

  ], exports:[CronogramaNewComponent]
})
export class PagesModule {
}
