import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string | null | undefined): string {
    if (!html) return '';

    const result = this.sanitizer.sanitize(SecurityContext.HTML, html);

    return result ? result : 'Content could not be sanitized for security reasons.';
  }
}
