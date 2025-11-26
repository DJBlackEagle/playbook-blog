import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br',
  standalone: true,
})
export class Nl2brPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }

    return value.replace(/\n\n/g, '<br /><br />').replace(/\n/g, '<br />');
  }
}
