import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  readonly dialogService = inject(ConfirmationDialogService);

  @ViewChild('cancelButton') cancelButton?: ElementRef<HTMLButtonElement>;

  constructor() {
    effect(() => {
      if (this.dialogService.state().visible) {
        setTimeout(() => {
          this.cancelButton?.nativeElement.focus();
        }, 0);
      }
    });
  }
}
