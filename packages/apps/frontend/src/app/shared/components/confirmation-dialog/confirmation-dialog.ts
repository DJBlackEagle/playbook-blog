import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { ConfirmationDialogService } from '../../../services/confirmation-dialog.service';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  readonly dialogService = inject(ConfirmationDialogService);
  private readonly cancelButton = viewChild<ElementRef<HTMLButtonElement>>('cancelButton');

  constructor() {
    effect(() => {
      if (this.dialogService.state().visible) {
        requestAnimationFrame(() => {
          this.cancelButton()?.nativeElement.focus();
        });
      }
    });
  }
}
