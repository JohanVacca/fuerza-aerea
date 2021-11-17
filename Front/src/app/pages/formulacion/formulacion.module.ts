import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ThemeModule } from '../../@theme/theme.module';
import { FormulacionRoutingModule, routedComponents } from './formulacion-routing.module';
// import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';


// import { CKEditorModule } from 'ng2-ckeditor';
// import { SelectModule } from 'ng2-select';
// import { ToasterModule } from 'angular2-toaster';
// import { CreateProyectComponent } from './create-formulation/create-proyect/create-proyect.component';

// import { ModalAlertComponent } from '../components/modal/modal.component';
// import { ConceptualFrameworkComponent } from './create-formulation/detalles-generales/conceptual-framework/conceptual-framework.component';
// import { StateArtComponent } from './create-formulation/detalles-generales/state-art/state-art.component';
// import { ExpectedResultsComponent } from './create-formulation/detalles-generales/expected-results/expected-results.component';
// import { MethodologyComponent } from './create-formulation/detalles-generales/methodology/methodology.component';
// import { ObjetivesComponent } from './create-formulation/detalles-generales/objetives/objetives.component';
// import { ResumeComponent } from './create-formulation/detalles-generales/resume/resume.component';
// import { PreviousResultsComponent } from './create-formulation/detalles-generales/previous-results/previous-results.component';
// import { BibliographyComponent } from './create-formulation/detalles-generales/bibliography/bibliography.component';
// import { InfoInvestigationComponent } from './create-formulation/detalles-generales/info-investigation/info-investigation.component';
// import { DataTablesModule } from 'angular-datatables';
// import { CKEditorResumeComponent } from './create-formulation/detalles-generales/ckeditor-resume/ckeditor-resume.component';
// import { CKEditorExpectedResultsComponent } from './create-formulation/detalles-generales/ckeditor-expected-results/ckeditor-expected-results.component';
// import { CKEditorMethodologyComponent } from './create-formulation/detalles-generales/ckeditor-methodology/ckeditor-methodology.component';
// import { CKEditorStateArtComponent } from './create-formulation/detalles-generales/ckeditor-state-art/ckeditor-state-art.component';
// import { CKEditorConceptualFrameworkComponent } from './create-formulation/detalles-generales/ckeditor-conceptual-framework/ckeditor-conceptual-framework.component';
// import { CKEditorPreviousResultsComponent } from './create-formulation/detalles-generales/ckeditor-previous-results/ckeditor-previous-results.component';
/**
 * import { UpdateFormulationComponent } from './update-formulation/update-formulation.component';
import { InformacionGeneralUpdateComponent } from './update-formulation/informacion-general/informacion-general.component';
import { PresupuestoUpdateComponent } from './update-formulation/presupuesto/presupuesto.component';
import { ProductUpdateComponent } from './update-formulation/tabla-producto/table-product.component';
import { CientificoTecnologicoUpdateComponent } from './update-formulation/cientifico-tecnologico/cientifico-tecnologico.component';
import { ObjetivesUpdateComponent } from './update-formulation/detalles-generales/objetives/objetives.component';
import { ResumeUpdateComponent } from './update-formulation/detalles-generales/resume/resume.component';
import { PreviousResultsUpdateComponent } from './update-formulation/detalles-generales/previous-results/previous-results.component';
import { BibliographyUpdateComponent } from './update-formulation/detalles-generales/bibliography/bibliography.component';
import { CKEditorConceptualFrameworkComponentUpdate } from './update-formulation/detalles-generales/ckeditor-conceptual-framework/ckeditor-conceptual-framework.component';
import { CKEditorExpectedResultsUpdateComponent } from './update-formulation/detalles-generales/ckeditor-expected-results/ckeditor-expected-results.component';
import { CKEditorMethodologyUpdateComponent } from './update-formulation/detalles-generales/ckeditor-methodology/ckeditor-methodology.component';
import { CKEditorPreviousResultsUpdateComponent } from './update-formulation/detalles-generales/ckeditor-previous-results/ckeditor-previous-results.component';
import { CKEditorResumeUpdateComponent } from './update-formulation/detalles-generales/ckeditor-resume/ckeditor-resume.component';
import { CKEditorStateArtUpdateComponent } from './update-formulation/detalles-generales/ckeditor-state-art/ckeditor-state-art.component';
import { MethodologyUpdateComponent } from './update-formulation/detalles-generales/methodology/methodology.component';
import { ExpectedResultsUpdateComponent } from './update-formulation/detalles-generales/expected-results/expected-results.component';
import { StateArtUpdateComponent } from './update-formulation/detalles-generales/state-art/state-art.component';
import { ConceptualFrameworkUpdateComponent } from './update-formulation/detalles-generales/conceptual-framework/conceptual-framework.component';
import { AnexoUpdateComponent } from './update-formulation/anexo/anexo.component';
 */
// import { AnexoComponent } from './create-formulation/anexo/anexo.component';
// import { NgxPaginationModule } from 'ngx-pagination';
// import { ModalShowProyectComponent } from '../modal-components/modal-show-proyect/modal-show-proyect.component';

// import { ModalCreateIntegrantComponent } from '../modal-components/modal-create-integrant/modal-create-integrant.component';
// import { ModalCreateProductComponent } from '../modal-components/modal-create-product/modal-create-product.component';
// import { HtmltopdfComponent } from './htmltopdf/htmltopdf.component';
// import { HtmltoimageComponent } from './htmltoimage/htmltoimage.component';
// import { ModalUpdateComponent } from '../modal-components/modal-name-description/modal-update.component';
// import { UpdateFormulationComponent } from './update-formulation/update-formulation.component';
// import { AnexoUpdateComponent } from './update-formulation/anexo/anexo.component';
// import { BibliographyUpdateComponent } from './update-formulation/detalles-generales/bibliography/bibliography.component';
// import { CKEditorConceptualFrameworkComponentUpdate } from './update-formulation/detalles-generales/ckeditor-conceptual-framework/ckeditor-conceptual-framework.component';
// import { CientificoTecnologicoUpdateComponent } from './update-formulation/cientifico-tecnologico/cientifico-tecnologico.component';
// import { PresupuestoUpdateComponent } from './update-formulation/presupuesto/presupuesto.component';
// import { ProductUpdateComponent } from './update-formulation/tabla-producto/table-product.component';
// import { InformacionGeneralUpdateComponent } from './update-formulation/informacion-general/informacion-general.component';
// import { ObjetivesUpdateComponent } from './update-formulation/detalles-generales/objetives/objetives.component';
// import { PreviousResultsUpdateComponent } from './update-formulation/detalles-generales/previous-results/previous-results.component';
// import { ResumeUpdateComponent } from './update-formulation/detalles-generales/resume/resume.component';
// import { MethodologyUpdateComponent } from './update-formulation/detalles-generales/methodology/methodology.component';
// import { ExpectedResultsUpdateComponent } from './update-formulation/detalles-generales/expected-results/expected-results.component';
// import { StateArtUpdateComponent } from './update-formulation/detalles-generales/state-art/state-art.component';
// import { ConceptualFrameworkUpdateComponent } from './update-formulation/detalles-generales/conceptual-framework/conceptual-framework.component';
// import { CKEditorExpectedResultsUpdateComponent } from './update-formulation/detalles-generales/ckeditor-expected-results/ckeditor-expected-results.component';
// import { CKEditorMethodologyUpdateComponent } from './update-formulation/detalles-generales/ckeditor-methodology/ckeditor-methodology.component';
// import { CKEditorStateArtUpdateComponent } from './update-formulation/detalles-generales/ckeditor-state-art/ckeditor-state-art.component';
// import { CKEditorPreviousResultsUpdateComponent } from './update-formulation/detalles-generales/ckeditor-previous-results/ckeditor-previous-results.component';
// import { CKEditorResumeUpdateComponent } from './update-formulation/detalles-generales/ckeditor-resume/ckeditor-resume.component';
// import { InfoInvestigationUpdateComponent } from './update-formulation/detalles-generales/info-investigation/info-investigation.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { AnexoComponent } from './components/anexo/anexo.component';
import { CientificoTecnologicoComponent } from './components/cientifico-tecnologico/cientifico-tecnologico.component';
import { CreateProyectComponent } from './components/create-proyect/create-proyect.component';
import { DetallesGeneralesComponent } from './components/detalles-generales/detalles-generales.component';
import { InformacionGeneralComponent } from './components/informacion-general/informacion-general.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { FormularProyectoComponent } from './components/formular-proyecto/formular-proyecto.component';
import { AdminModule } from '../admin/admin.module'
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { GruposComponent } from './components/cientifico-tecnologico/components/grupos/grupos.component';
import { EquipoInvestigacionComponent } from './components/cientifico-tecnologico/components/equipo-investigacion/equipo-investigacion.component';
import { ProductosEsperadosComponent } from './components/presupuesto/components/productos-esperados/productos-esperados.component';
import { ComponentePresupuestalComponent } from './components/presupuesto/components/componente-presupuestal/componente-presupuestal.component';
import { ObjetivosComponent } from './components/detalles-generales/components/objetivos/objetivos.component';
import { InformacionComponent } from './components/detalles-generales/components/informacion/informacion.component';
import { ResumenComponent } from './components/detalles-generales/components/resumen/resumen.component';
import { MarcoConceptualComponent } from './components/detalles-generales/components/marco-conceptual/marco-conceptual.component';
import { EstadoArteComponent } from './components/detalles-generales/components/estado-arte/estado-arte.component';
import { ResultadosEsperadosComponent } from './components/detalles-generales/components/resultados-esperados/resultados-esperados.component';
import { ResultadosPreviosComponent } from './components/detalles-generales/components/resultados-previos/resultados-previos.component';
import { BibliografiaComponent } from './components/detalles-generales/components/bibliografia/bibliografia.component';
import { MetodologiaComponent } from './components/detalles-generales/components/metodologia/metodologia.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DialogAgregarComponent } from './components/presupuesto/components/componente-presupuestal/dialog-agregar/dialog-agregar.component';
import { AddDetalleRubroComponent } from './components/presupuesto/components/componente-presupuestal/add-detalle-rubro/add-detalle-rubro.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TablaHonorariosComponent } from './components/presupuesto/components/componente-presupuestal/tabla-honorarios/tabla-honorarios.component';
import { RegistrarGrupoComponent } from './components/cientifico-tecnologico/components/grupos/registrar-grupo/registrar-grupo.component';
import { RegistrarPersonaComponent } from './components/cientifico-tecnologico/components/equipo-investigacion/registrar-persona/registrar-persona.component';
import { AgregarProductoComponent } from './components/presupuesto/components/productos-esperados/agregar-producto/agregar-producto.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CronogramaComponent } from './components/presupuesto/components/cronograma/cronograma.component';
import { VistaFormulacionComponent } from './components/vista-formulacion/vista-formulacion.component';
import { DetalleRubroComponent } from './components/presupuesto/components/componente-presupuestal/detalle-rubro/detalle-rubro.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ComplementosComponent } from './components/detalles-generales/components/complementos/complementos.component';
import { AddComplementsComponent } from './components/detalles-generales/components/complementos/add-complements/add-complements.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AgregarActividadComponent } from './components/presupuesto/components/cronograma/agregar-actividad/agregar-actividad.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
    imports: [
        // ThemeModule,
        FormulacionRoutingModule,
        MatDialogModule,
        // Ng2SmartTableModule,
        CommonModule,
        MatSlideToggleModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        MatStepperModule,
        ReactiveFormsModule,
        AdminModule,
        MatTableModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
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
        // CKEditorModule,
        // SelectModule,
        // ToasterModule.forRoot(),
        // DataTablesModule,
        // NgxPaginationModule
    ],
  declarations: [
    ...routedComponents,
    AnexoComponent,
    CientificoTecnologicoComponent,
    CreateProyectComponent,
    DetallesGeneralesComponent,
    InformacionGeneralComponent,
    PresupuestoComponent,
    FormularProyectoComponent,
    GruposComponent,
    EquipoInvestigacionComponent,
    ProductosEsperadosComponent,
    ComponentePresupuestalComponent,
    ObjetivosComponent,
    InformacionComponent,
    ResumenComponent,
    MarcoConceptualComponent,
    EstadoArteComponent,
    ResultadosEsperadosComponent,
    ResultadosPreviosComponent,
    BibliografiaComponent,
    MetodologiaComponent,
    DialogAgregarComponent,
    AddDetalleRubroComponent,
    TablaHonorariosComponent,
    RegistrarGrupoComponent,
    RegistrarPersonaComponent,
    AgregarProductoComponent,
    CronogramaComponent,
    VistaFormulacionComponent,
    DetalleRubroComponent,
    ComplementosComponent,
    AddComplementsComponent,
    AgregarActividadComponent


    //MODULO DE CREACION DE FOMRULACIONES
    // AnexoComponent,
    // CreateProyectComponent,
    // ModalAlertComponent,
    // ConceptualFrameworkComponent,
    // StateArtComponent,
    // ExpectedResultsComponent,
    // MethodologyComponent,
    // ObjetivesComponent,
    // ResumeComponent,
    // PreviousResultsComponent,
    // BibliographyComponent,
    // InfoInvestigationComponent,
    // UpdateFormulationComponent,
    // AnexoUpdateComponent,
    // CientificoTecnologicoUpdateComponent,
    // BibliographyUpdateComponent,
    // CKEditorConceptualFrameworkComponentUpdate,
    // PresupuestoUpdateComponent,
    // ProductUpdateComponent,
    // InformacionGeneralUpdateComponent,
    // UpdateFormulationComponent,
    // InformacionGeneralUpdateComponent,
    // PresupuestoUpdateComponent,
    // ProductUpdateComponent,
    // CientificoTecnologicoUpdateComponent,
    // ObjetivesUpdateComponent,
    // ResumeUpdateComponent,
    // PreviousResultsUpdateComponent,
    // BibliographyUpdateComponent,
    // InformacionGeneralUpdateComponent,
    // MethodologyUpdateComponent,
    // ExpectedResultsUpdateComponent,
    // StateArtUpdateComponent,
    // ConceptualFrameworkUpdateComponent,
    // AnexoUpdateComponent,
    // InfoInvestigationUpdateComponent,

    // EDITORES
    // CKEditorConceptualFrameworkComponent,
    // CKEditorExpectedResultsComponent,
    // CKEditorMethodologyComponent,
    // CKEditorPreviousResultsComponent,
    // CKEditorResumeComponent,
    // CKEditorStateArtComponent,

    // MODALES
    // ModalCreateProductComponent,
    // ModalShowProyectComponent,
    // ModalUpdateComponent,
    // ModalCreateIntegrantComponent,

    // MODULO DE ACTUALIZACION DE FOMRULACIONES

    // EDITORES
    // CKEditorConceptualFrameworkComponentUpdate,
    // CKEditorExpectedResultsUpdateComponent,
    // CKEditorMethodologyUpdateComponent,
    // CKEditorPreviousResultsUpdateComponent,
    // CKEditorResumeUpdateComponent,
    // CKEditorStateArtUpdateComponent,

    // HTML A PDF
    // HtmltopdfComponent,
    // HtmltoimageComponent


  ],
  entryComponents: [
    // ModalAlertComponent,
    // ModalCreateProductComponent,
    // ModalShowProyectComponent,
    // ModalUpdateComponent,
    // ModalCreateIntegrantComponent

  ],
  providers: []
})
export class FormulacionModule { }
