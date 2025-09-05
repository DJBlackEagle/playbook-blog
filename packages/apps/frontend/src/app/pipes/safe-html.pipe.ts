import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string): string {
    const result = this.sanitizer.sanitize(SecurityContext.HTML, html);

    return result ? result : 'SECURITY BREACH';
  }
}
