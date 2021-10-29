import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ProjectSetupRoutingModule } from './project-setup-routing.module';
import { ProjectSetupComponent } from './project-setup.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ProjectSetupRoutingModule} from './project-setup.routing.module';

// import { ThemeModule } from '../../../@theme/theme.module';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
// import { CommonTabComponent } from './components/common-tab/common-tab.component';
// import { CommonTabFormComponent } from './components/common-tab/components/common-tab-form/common-tab-form.component';
// import { CommonTabListComponent } from './components/common-tab/components/common-tab-list/common-tab-list.component';
// import { ProductTypesComponent } from './components/product-types/product-types.component';
// import { ProjectEntriesComponent } from './components/project-entries/project-entries.component';
// import { InvestigationLinesComponent } from './components/investigation-lines/investigation-lines.component';
// import { InvestigationProgramsComponent } from './components/investigation-programs/investigation-programs.component';
// import { InvestigationSubProgramsComponent } from './components/investigation-sub-programs/investigation-sub-programs.component';
// import { InvestigationEndorsersComponent } from './components/investigation-endorsers/investigation-endorsers.component';
// import { InvestigationTypesComponent } from './components/investigation-types/investigation-types.component';
// import { GroupCategoriesComponent } from './components/group-categories/group-categories.component';
// import { InvTeamPersonPositionsComponent } from './components/inv-team-person-positions/inv-team-person-positions.component';
import { MatCardModule } from '@angular/material/card';
import { ProductTypesComponent } from './components/product-types/product-types.component';
import { ProjectEntriesComponent } from './components/project-entries/project-entries.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { InvestigationLinesComponent } from './components/investigation-lines/investigation-lines.component';
import { InvestigationProgramsComponent } from './components/investigation-programs/investigation-programs.component';
import { InvestigationSubProgramsComponent } from './components/investigation-sub-programs/investigation-sub-programs.component';
import { InvestigationEndorsersComponent } from './components/investigation-endorsers/investigation-endorsers.component';
import { InvestigationTypesComponent } from './components/investigation-types/investigation-types.component';
import { GroupCategoriesComponent } from './components/group-categories/group-categories.component';
import { InvTeamPersonPositionsComponent } from './components/inv-team-person-positions/inv-team-person-positions.component';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectSetupRoutingModule,
    // ThemeModule,
    // NgxDatatableModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatInputModule,
    MatTooltipModule

  ],
  declarations: [
    ProjectSetupComponent,
    ProductTypesComponent,
    ProjectEntriesComponent,
    InvestigationLinesComponent,
    InvestigationProgramsComponent,
    InvestigationSubProgramsComponent,
    InvestigationEndorsersComponent,
    InvestigationTypesComponent,
    GroupCategoriesComponent,
    InvTeamPersonPositionsComponent,
    // CommonTabComponent,
    // CommonTabFormComponent,
    // CommonTabListComponent,
    // ProductTypesComponent,
    // ProjectEntriesComponent,
    // InvestigationLinesComponent,
    // InvestigationProgramsComponent,
    // InvestigationSubProgramsComponent,
    // InvestigationEndorsersComponent,
    // InvestigationTypesComponent,
    // GroupCategoriesComponent,
    // InvTeamPersonPositionsComponent
  ]
})
export class ProjectSetupModule { }
