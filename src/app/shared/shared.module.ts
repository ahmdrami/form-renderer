import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRendererModule } from './form-renderer/form-renderer.module';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { FormService } from './form.service';
import { ChevronComponent } from './components/chevron/chevron.component';

@NgModule({
  imports: [
    CommonModule,
    FormRendererModule
  ],
  declarations: [JumbotronComponent],
  exports: [FormRendererModule, JumbotronComponent],
  providers: [FormService]
})
export class SharedModule { }
