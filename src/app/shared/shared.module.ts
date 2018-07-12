import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormRendererModule } from './form-renderer/form-renderer.module';

@NgModule({
  imports: [
    CommonModule,
    FormRendererModule
  ],
  declarations: [],
  exports: [FormRendererModule]
})
export class SharedModule { }
