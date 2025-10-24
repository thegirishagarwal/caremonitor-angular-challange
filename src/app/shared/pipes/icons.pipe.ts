import { inject, Pipe } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Icons } from '@core/config';

@Pipe({
  name: 'icons'
})
export class IconsPipe {
  private readonly domSanitizer = inject(DomSanitizer);
  transform(value: Partial<keyof typeof Icons>): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(Icons[value]);
  }
}
