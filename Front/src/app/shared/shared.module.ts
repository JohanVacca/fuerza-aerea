import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NbAlertModule } from '@nebular/theme';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AllowedRolePipe } from '../shared/pipes/allowed-role/allowed-role.pipe';
// import { EpocToDaysPipe } from 'app/pages/following/shared/pipes/epoc-to-days/epoc-to-days.pipe';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    // NbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ],
  declarations: [
    UploadFileComponent,
    AllowedRolePipe,
    LoaderComponent
  ],
    exports: [
        UploadFileComponent,
        AllowedRolePipe,
        LoaderComponent
    ]
})
export class SharedModule { }
