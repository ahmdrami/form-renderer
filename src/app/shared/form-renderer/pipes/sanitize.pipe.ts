import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {

  }
  transform(value: any, args?: any): any {
    /**
     * Could be extended to rely on arg to sanitize based on types defined below
     * 1 = HTML
     * 2 = Style
     * 3 = Script
     * 4 = Url
     * 5 = Resource URL
     */
    return value ? this.sanitizer.sanitize(1, value) :  '';
  }

}
