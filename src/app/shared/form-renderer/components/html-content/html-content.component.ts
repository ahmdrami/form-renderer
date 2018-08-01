import { Component } from '@angular/core';
import { ComponentConfig, FieldModel } from '../../form-renderer/form-schema';
import { FormGroup } from '@angular/forms';

@Component({
   selector: 'z-html-content',
   template: `
    <label> {{ config.label }} </label>
    <div [innerHTML]="config.html | sanitize"></div>`
})
export class HtmlContentComponent implements ComponentConfig {
   group: FormGroup;
   config: FieldModel;
}
