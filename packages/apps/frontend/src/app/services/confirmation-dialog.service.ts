import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

interface DialogState {
  message: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  readonly state = signal<DialogState>({ message: '', visible: false });
  private readonly choice$ = new Subject<boolean>();

  /**
   * Opens the confirmation dialog with a specific message.
   * @param message The confirmation message to display to the user.
   * @returns A promise that resolves with `true` if the user confirms, and `false` otherwise.
   */
  open(message: string): Promise<boolean> {
    this.state.set({ message, visible: true });
    return new Promise((resolve) => {
      const sub = this.choice$.subscribe((confirmed) => {
        this.state.set({ message: '', visible: false });
        sub.unsubscribe();
        resolve(confirmed);
      });
    });
  }

  /**
   * Called when the user clicks the "Confirm" button.
   */
  confirm(): void {
    this.choice$.next(true);
  }

  /**
   * Called when the user clicks the "Cancel" button.
   */
  cancel(): void {
    this.choice$.next(false);
  }
}
